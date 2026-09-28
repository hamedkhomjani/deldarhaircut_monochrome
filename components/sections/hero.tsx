import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/* Facts about the studio, rendered as a specification sheet. A barbershop
 * that lists its credentials as data rather than adjectives is doing the
 * same thing this design system does with its layout. */
const facts = [
  { term: "Established", value: "2011" },
  { term: "Chairs", value: "04" },
  { term: "Barbers", value: "03" },
  { term: "City", value: "London" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b-4 border-ink">
      {/* Layered, per the brief. The 4px rule field is the grain and the SVG
          turbulence sits on top of it: at 1.5% the rules alone read as a flat
          tint, and it is the noise breaking up their banding that makes the
          surface look like paper rather than like a very light background
          colour. Neither layer is legible on its own. */}
      <span
        aria-hidden="true"
        className="texture-lines pointer-events-none absolute inset-0 -z-10 select-none"
      />
      <span
        aria-hidden="true"
        className="texture-noise pointer-events-none absolute inset-0 -z-[9] select-none"
      />

      <Container className="py-16 md:py-24 lg:py-32">
        <div className="flex gap-10 lg:gap-16">
          {/* A vertical caption pinned to the left edge. The editorial
              equivalent of a plate number printed in the margin. */}
          <div
            aria-hidden="true"
            className="hidden shrink-0 flex-col items-center gap-6 lg:flex"
          >
            <span className="h-24 w-px bg-line" />
            <span className="micro-label rotate-180 text-muted-ink [writing-mode:vertical-rl]">
              Est. MMXI — Ashcombe Lane
            </span>
            <span className="h-full min-h-12 w-px flex-1 bg-line" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <Eyebrow>Barbers &amp; Hair Stylists</Eyebrow>
              <Eyebrow className="text-muted-ink">Booking now</Eyebrow>
            </div>

            {/* The line breaks are authored, not automatic. A display
                setting this size has to be composed, not wrapped. */}
            <h1 className="mt-10 text-display display-type text-ink lg:mt-14">
              <Reveal as="span" className="block">
                Precision
              </Reveal>
              <Reveal as="span" delay={80} className="block pl-[8vw] italic lg:pl-[10vw]">
                over
              </Reveal>
              <Reveal as="span" delay={160} className="block">
                noise.
              </Reveal>
            </h1>

            {/* The spec's hero device: a heavy rule and a small bordered
                square. The square is 20px — the smallest size the icon system
                permits — and sits hard against the rule's end rather than
                floating in the gap, so the two read as one drawn object
                instead of two decorations that happen to share a row.
                `overflow-hidden` on the square keeps the rule from showing
                through its middle if the two ever overlap. */}
            <div
              aria-hidden="true"
              className="mt-12 flex items-center gap-6 lg:mt-16"
            >
              <span className="size-5 shrink-0 overflow-hidden border-2 border-ink bg-paper" />
              <Rule weight="thick" className="flex-1" />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <p className="measure text-lead text-muted-ink">
                  An austere barbershop on Ashcombe Lane. Four chairs, three
                  barbers, and a room quiet enough that you can hear the
                  scissors.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href="/appointment" variant="primary" size="lg" withArrow>
                    Book an appointment
                  </Button>
                  <Button href="/services" variant="secondary" size="lg">
                    See the price list
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
                <dl className="flex flex-col">
                  {facts.map((fact) => (
                    <div
                      key={fact.term}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-3 first:border-t"
                    >
                      <dt className="micro-label text-muted-ink">{fact.term}</dt>
                      <dd className="micro-label text-ink tabular-nums">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p
                  className={cn(
                    "micro-label mt-6 text-muted-ink",
                    "before:mr-2 before:inline-block before:h-1 before:w-1",
                    "before:bg-ink before:content-['']",
                  )}
                >
                  {site.address.postcode} — {site.address.city}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
