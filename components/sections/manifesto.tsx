import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import { Section } from "@/components/ui/section";

/* Written as commitments rather than adjectives. Each is a specific claim
 * the studio can be held to, which is what makes austere copy credible. */
const principles = [
  {
    index: "01",
    title: "The shape before the style",
    body: "We start from the head you actually have. A cut that fights the growth pattern will look deliberate for a fortnight and then tired for a year.",
  },
  {
    index: "02",
    title: "Silence is part of the service",
    body: "No playback music, no upsell at the basin, no commentary. The room is quiet so the only thing you have to listen to is the work.",
  },
  {
    index: "03",
    title: "Finished or nothing",
    body: "Every cut closes with a hot towel, a straight razor, and a dry finish. There is no version of this we send out half done.",
  },
] as const;

/** The inverted statement.
 *
 * One black rectangle per page, placed immediately after the hero, and
 * never again until the footer. Restraint is what makes an inversion
 * dramatic — a third black band on the same scroll would read as a
 * background colour rather than an event.
 */
export function Manifesto() {
  return (
    <Section invert texture={["lines", "noise"]} ariaLabel="The method">
      <Container>
        <Eyebrow index="I">The Method</Eyebrow>

        <Reveal>
          <p className="measure mt-10 text-h2 heading-type text-ink lg:mt-14">
            We do not chase the season. We cut the head in front of us, and
            we would rather be{" "}
            <span className="display-italic">right</span> than current.
          </p>
        </Reveal>

        <Rule weight="thick" className="mt-16 lg:mt-24" />

        <div className="grid grid-cols-1 gap-12 pt-12 md:grid-cols-3 md:gap-16 lg:pt-16">
          {principles.map((principle, index) => (
            <Reveal key={principle.index} delay={index * 90} className="flex flex-col gap-5">
              <span className="micro-label text-muted-ink tabular-nums">
                {principle.index}
              </span>
              <h3 className="heading-type text-h3 text-ink">{principle.title}</h3>
              <p className="measure-tight text-body text-muted-ink">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
