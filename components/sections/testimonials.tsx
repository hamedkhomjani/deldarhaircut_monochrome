import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { testimonials } from "@/lib/site";

/** A single pull quote, sized as display type.
 *
 * An italic serif at this scale is the one place the system permits a
 * flourish — the equivalent of a blank page in a printed book. Used once
 * per spread, and never twice in a row.
 */
export function Testimonials() {
  return (
    <Section divider="thick" invert texture={["lines", "noise"]} ariaLabel="What clients say">
      <Container>
        <Eyebrow index="V">In Their Words</Eyebrow>

        <ul className="mt-12 flex flex-col lg:mt-16">
          {testimonials.map((item, index) => (
            <Reveal
              as="li"
              key={item.attribution}
              delay={index * 80}
              className="grid grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 lg:py-14"
            >
              <blockquote className="relative md:col-span-9">
                {/* The brief asks for oversized quote marks, and they are set
                    as type rather than as glyphs from an icon font. A real
                    `“` in Playfair at `7xl` has the high-contrast stroke and
                    the correct optical weight against the italic below it; a
                    drawn or icon-font quote mark sits at a different weight
                    and reads as a sticker pasted onto the quote.

                    Absolutely positioned and `aria-hidden`, so it hangs in the
                    margin to the left of the measure instead of displacing
                    the first line. The `blockquote` already carries the
                    quotation semantics for assistive technology, so the mark
                    itself is decoration twice over — visually and for the
                    tree. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "display-type pointer-events-none absolute select-none",
                    "-left-2 -top-8 text-7xl leading-none text-muted-ink md:-left-16 md:-top-12 md:text-8xl",
                  )}
                >
                  “
                </span>

                <p className="display-italic text-h2 text-ink md:pl-8">
                  {item.quote}
                </p>
              </blockquote>
              <footer className="md:col-span-3 md:text-right">
                <cite className="micro-label text-muted-ink not-italic">
                  {item.attribution}
                </cite>
              </footer>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
