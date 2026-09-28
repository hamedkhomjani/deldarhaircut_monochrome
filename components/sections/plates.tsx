import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { plates } from "@/lib/site";

export type PlateImage = {
  src: string;
  /** Required whenever there is a real photograph. The plate is content,
   *  not decoration — a screen reader user deserves the same description. */
  alt: string;
};

/** The work, presented as an exhibition catalogue.
 *
 * With no photography supplied, each plate is drawn from the system itself:
 * the primary texture — horizontal lines on a 4px period — inside a hairline
 * frame, with the secondary 40px grid fading in on hover. That is not a
 * placeholder dressed up as a design. A line-based visual system has to
 * represent an empty plate somehow, and drawing it with its own two
 * registered patterns is more honest than tinting a rectangle.
 *
 * Drop `images` in and the same component renders real photographs with
 * identical captions and identical hover behaviour.
 */
export function Plates({ images }: { images?: readonly PlateImage[] }) {
  return (
    <Section divider="thick" texture={["lines", "noise"]} ariaLabel="Selected work">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          index="III"
          title="The plates."
          lead="Six pieces from the last season. Each was photographed on the day, in the room, under the light we actually use."
        />

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-24 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {plates.map((plate, index) => {
            const image = images?.[index];

            return (
              <Reveal
                as="li"
                key={plate.index}
                delay={(index % 3) * 90}
                className="group"
              >
                <figure>
                  {/* The frame is 2px at rest and 4px on hover, per the spec.
                      Because the frame is sized by `aspect-3/4` and `w-full`
                      with `box-sizing: border-box`, the thicker border eats
                      into the content box rather than pushing the frame
                      outward — so the caption below never moves. The image
                      then scales to 105% inside the clipped frame. */}
                  <div                   className="group/plate relative aspect-3/4 w-full overflow-hidden border-2 border-ink transition-colors duration-instant ease-sharp group-hover/plate:border-4 motion-reduce:transition-none">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-instant ease-sharp group-hover/plate:scale-105 motion-reduce:transition-none"
                      />
                    ) : (
                      /* Purely presentational — the caption below carries the
                         meaning, so both layers are hidden from the tree. */
                      <>
                        <span
                          aria-hidden="true"
                          className="texture-lines absolute inset-0"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "texture-grid absolute inset-0 opacity-0",
                            "transition-opacity duration-instant ease-sharp",
                            "motion-reduce:transition-none",
                            "group-hover/plate:opacity-100",
                          )}
                        />
                      </>
                    )}
                  </div>

                  <figcaption className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-4">
                    <span className="heading-type text-body-lg text-ink">
                      {plate.title}
                    </span>
                    <span className="micro-label shrink-0 text-muted-ink tabular-nums">
                      {plate.index} / {plate.meta}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
