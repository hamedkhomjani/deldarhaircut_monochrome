import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export type CtaProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** The closing argument.
 *
 * Sits on white rather than black, immediately above an inverted footer.
 * Two black bands touching would collapse the contrast the footer depends
 * on — the alternation is doing the work, so the rhythm has to be
 * deliberate rather than "invert everything for emphasis".
 */
export function Cta({
  eyebrow = "Appointments",
  title = "Take a chair.",
  lead = "Appointments open fourteen days ahead. Tell us the shape you want and the barber you want, and we will tell you honestly if it is the right ask.",
  primary = { label: "Book an appointment", href: "/appointment" },
  secondary = { label: "Read the price list", href: "/services" },
}: CtaProps) {
  return (
    /* One rule, full-bleed, 4px black — drawn as the section's own top border
       rather than as a `Rule` inside the container. An earlier version had
       both a 1px border here and a 4px `Rule` twenty pixels lower, which read
       as two dividers rather than one, and stopped at the content measure
       instead of crossing the page. */
    <section className="border-t-4 border-ink">
      <Container className="py-24 md:py-32 lg:py-40">

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="micro-label text-muted-ink">{eyebrow}</p>
            <p className="text-display display-type mt-8 text-ink">{title}</p>
          </Reveal>

          <Reveal
            delay={120}
            className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9"
          >
            <p className="measure text-body-lg text-muted-ink">{lead}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href={primary.href} variant="primary" size="lg" withArrow>
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="ghost" size="md">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
