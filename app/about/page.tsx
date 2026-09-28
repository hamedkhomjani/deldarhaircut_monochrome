import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { Team } from "@/components/sections/team";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { hours, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Studio",
  description:
    "Deldar Haircut — an austere barbershop on Ashcombe Lane, open since 2011. Four chairs, three barbers, no playback music.",
};

/* Set as a standfirst rather than dropped into the prose: the paragraph
 * below opens mid-thought, the way a monograph does. */
const paragraphs = [
  "The studio opened in 2011 in a narrow lease on Ashcombe Lane that had previously held a locksmith, a printer, and then nothing for two years. There were three chairs, a single basin, and a radio. The radio went within a month.",
  "That is roughly the whole origin story, and it is worth being honest about it: nothing about this place was designed. The room is quiet because the neighbours are a solicitor and a bookbinder. The light is good because the windows are tall and nobody thought to put blinds up. The work is good because the three people working here have between them forty years of it and no particular interest in doing it quickly.",
  "What we have done since is remove things. No playback music. No product wall to sell from. No membership, no package, no loyalty card, and no photographs of anyone else's hair on the wall. The retail is a small shelf of what we actually use, priced honestly, and if you want it you can take it; if you would rather not, nothing about the appointment changes.",
  "The one concession to modernity is the booking form online, which is faster than the telephone and, we are told, less likely to put someone on hold. Everything else has stayed the same shape for a very long time.",
] as const;

const milestones = [
  { year: "2011", event: "Three chairs, one basin, no music." },
  { year: "2016", event: "Fourth chair. Ines joins from Carnaby." },
  { year: "2019", event: "The bookbinder next door leaves. We keep the quiet." },
  { year: "2023", event: "Marek joins. First grey-blend specialist on the street." },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Studio"
        index="I"
        title="A room,"
        titleBreak="not a queue."
        lead="Ashcombe Lane, London. Open since 2011, and barely changed since 2016."
        meta={`Four chairs — three barbers`}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Eyebrow index="I">The Account</Eyebrow>
                <Rule className="mt-6" />
                <p className="micro-label mt-6 text-muted-ink">
                  {site.address.street}
                  <br />
                  {site.address.city} {site.address.postcode}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-8 lg:col-span-7 lg:col-start-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={cn(
                    "measure text-body-lg text-ink",
                    index === 0 && "text-lead text-muted-ink",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section ariaLabel="A short history">
        <Container>
          <Eyebrow index="II">A Short History</Eyebrow>

          <Rule weight="thick" className="mt-8" />

          <ol className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {milestones.map((milestone, index) => (
              <Reveal
                as="li"
                key={milestone.year}
                delay={index * 80}
                className="flex flex-col gap-4 bg-paper p-8 transition-colors duration-instant ease-sharp hover:bg-ink hover:text-paper lg:p-10"
              >
                <span className="micro-label text-muted-ink tabular-nums">
                  {milestone.year}
                </span>
                <p className="measure-tight text-body text-muted-ink">
                  {milestone.event}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section ariaLabel="Opening hours">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow index="III">Hours</Eyebrow>
              <h2 className="heading-type text-h2 mt-8 text-ink">
                When the door is open.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="flex flex-col">
                {hours.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-baseline justify-between gap-8 border-b border-line py-5 first:border-t"
                  >
                    <dt className="text-body text-muted-ink">{row.days}</dt>
                    <dd
                      className={cn(
                        "micro-label tabular-nums",
                        row.time === "Closed" ? "text-muted-ink" : "text-ink",
                      )}
                    >
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-12 flex flex-col gap-2">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="heading-type w-fit text-h3 text-ink underline-rule"
                >
                  {site.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="text-body text-muted-ink underline-rule w-fit"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Team />
      <Cta
        eyebrow="Appointments"
        title="Take a chair."
        lead="Four chairs and one working day at a time. Book ahead, or ring and ask whether anyone is free."
      />
    </>
  );
}
