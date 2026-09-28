import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { stats } from "@/lib/site";

/** The studio as a specification sheet.
 *
 * The brief asks for an inverted stats section, so this is a third black band
 * on the home page — which the system's own restraint argument used to argue
 * against. The reconciliation is texture: the manifesto and the testimonials
 * are ruled and quiet, and this one is a *ledger*. The vertical line texture
 * is what makes a 4×2 grid of numbers legible as a table rather than as a
 * paragraph, and the noise layered over it is what stops a large black
 * rectangle from reading as a flat fill. Three black bands only flatten into
 * one if they look the same, and these deliberately do not.
 *
 * The numbers are set in tabular mono at `5xl`, which is the only place in the
 * system where a figure is allowed to be display type — a statistic is a piece
 * of typography before it is a piece of data.
 */
export function Stats() {
  return (
    <Section
      invert
      /* Layered, per the brief: the vertical rule field carries the grid, and
         fractal noise on top gives the band a paper surface. Neither is
         visible alone. */
      texture={["lines", "noise"]}
      ariaLabel="The studio in numbers"
    >
      <Container>
        <Eyebrow index="VI">By the Numbers</Eyebrow>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 40}
              className="flex flex-col gap-3 border-t border-line pt-5"
            >
              <dt className="micro-label text-muted-ink">{stat.label}</dt>

              <dd className="font-mono text-5xl leading-none text-ink tabular-nums">
                {stat.value}
              </dd>

              <dd className="measure-tight text-caption text-muted-ink">
                {stat.note}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
