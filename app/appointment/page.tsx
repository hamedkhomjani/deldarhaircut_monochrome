import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { BookingForm } from "@/components/sections/booking-form";
import { PageHeader } from "@/components/sections/page-header";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import { Section } from "@/components/ui/section";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Appointments",
  description:
    "Request an appointment at Deldar Haircut on Ashcombe Lane. We reply within one working day.",
};

/* Setting expectations before the form rather than after submission. A
 * booking page that promises nothing until it has already taken someone's
 * details is a small betrayal. */
const expectations = [
  {
    index: "01",
    title: "You choose a time, we confirm one",
    body: "Every request is a preference, not a booking. One of the three of us replies within a working day to confirm or to offer the nearest alternative.",
  },
  {
    index: "02",
    title: "Fourteen days ahead",
    body: "The book opens two weeks in advance. Same-day requests are occasionally possible by telephone, never online.",
  },
  {
    index: "03",
    title: "Fifteen minutes of grace",
    body: "We hold a chair until fifteen minutes past the hour. After that it belongs to whoever is next, and we will have tried to ring you.",
  },
  {
    index: "04",
    title: "Cancel freely",
    body: "No deposit, no card on file, no penalty. Change or cancel up to two hours beforehand and nothing is owed.",
  },
] as const;

export default function AppointmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        index="I"
        title="Request"
        titleBreak="a chair."
        lead="Tell us the service, the time, and the barber you want — or ask for whoever is free. We will reply within one working day."
        meta={`${site.address.street}, ${site.address.city}`}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <BookingForm />
            </Reveal>

            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>How This Works</Eyebrow>
                <Rule className="mt-6" />

                <ol className="mt-8 flex flex-col">
                  {expectations.map((item) => (
                    <li
                      key={item.index}
                      className="flex flex-col gap-3 border-b border-line py-6"
                    >
                      <span className="micro-label text-muted-ink tabular-nums">
                        {item.index}
                      </span>
                      <h2 className="heading-type text-body-lg text-ink">
                        {item.title}
                      </h2>
                      <p className="measure-tight text-caption text-muted-ink">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ol>

                <Card className="mt-8 flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <Icon icon={Phone} size={20} className="text-muted-ink" />
                    <p className="micro-label text-muted-ink">Prefer to ring?</p>
                  </div>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="heading-type w-fit text-h3 text-ink underline-rule"
                  >
                    {site.phoneDisplay}
                  </a>
                  <p className="text-caption text-muted-ink">
                    Answered {site.hoursSummary}
                  </p>
                </Card>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section texture="grid" ariaLabel="What you can book">
        <Container>
          <Eyebrow index="II">What You Can Book</Eyebrow>
          <Rule weight="thick" className="mt-8" />

          <ul className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex flex-col gap-3 bg-paper p-8 transition-colors duration-instant ease-sharp hover:bg-ink hover:text-paper"
              >
                <span className="micro-label text-muted-ink tabular-nums">
                  {service.duration}
                </span>
                <span className="heading-type text-body-lg text-ink">
                  {service.name}
                </span>
                {service.note ? (
                  <span className="micro-label text-muted-ink">{service.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
