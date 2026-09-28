import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { PriceList } from "@/components/sections/price-list";
import { DropCap } from "@/components/ui/drop-cap";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Prices",
  description:
    "The full price list for Deldar Haircut. Every service, its duration, and what it costs. No packages, no membership.",
};

/* What is included with every appointment. Answers the question the price
 * list raises but cannot answer in a price column. */
const included = [
  {
    index: "01",
    title: "The consultation",
    body: "Ten minutes before the scissors come out. We look at the growth pattern, the cowlick situation, and how much time you actually spend on it.",
  },
  {
    index: "02",
    title: "Wash & finish",
    body: "A proper wash with a treatment matched to your scalp, then a dry finish styled for the shape rather than for the trend of the month.",
  },
  {
    index: "03",
    title: "The close",
    body: "Hot towel, straight razor at the neckline, and a balm. Every appointment ends the same way, because that is what makes the last hour feel finished.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & Prices"
        index="I"
        title="Everything,"
        titleBreak="priced plainly."
        lead="Six services, one price each, and no hourly surprises. If something you need is not on this list, ask — the list is a convenience, not a limit."
        meta={`Updated ${new Date().getFullYear()}`}
      />

      <PriceList
        bare
        action={
          <p className="micro-label max-w-48 text-muted-ink">
            Prices include consultation, wash and finish
          </p>
        }
      />

      <Section ariaLabel="What every appointment includes">
        <Container>
          <Eyebrow index="II">Included, Always</Eyebrow>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
            {included.map((item, index) => (
              <Reveal
                key={item.index}
                delay={index * 90}
                className="flex flex-col gap-5"
              >
                <span className="micro-label text-muted-ink tabular-nums">
                  {item.index}
                </span>
                <h2 className="heading-type text-h3 text-ink">{item.title}</h2>
                <p className="measure-tight text-body text-muted-ink">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <Rule weight="thick" className="mt-16 lg:mt-24" />

          <Reveal className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <h2 className="heading-type text-h2 text-ink lg:col-span-6">
              Walking in without an appointment.
            </h2>
            <div className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8">
              {/* The brief's boxed drop cap, on the opening paragraph of this
                  detail view. It is the only drop cap on the site: used once
                  per page, it reads as an editorial decision rather than as a
                  style that got applied everywhere. */}
              <DropCap className="text-body-lg text-muted-ink">
                We keep two chairs back for walk-ins. There is no guarantee —
                on a Saturday there will be a wait — but you will never be
                turned away without being told how long it is.
              </DropCap>
              <p className="measure text-body text-muted-ink">
                Appointments are held for fifteen minutes past the hour. After
                that the chair belongs to whoever is next.
              </p>
              <p className="micro-label text-muted-ink">
                {site.address.street} — {site.address.city} {site.address.postcode}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Cta
        eyebrow="Next Step"
        title="Take a chair."
        lead="Pick a service, pick a time, and we will hold it. You can change it up to two hours beforehand."
      />
    </>
  );
}
