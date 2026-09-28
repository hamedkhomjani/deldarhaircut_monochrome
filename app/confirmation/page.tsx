import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ReadOnlyRow } from "@/components/ui/field";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import { Section } from "@/components/ui/section";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Booking Received",
  description: "Your appointment request has been received.",
  robots: { index: false, follow: false },
};

/** Deterministic reference derived from the booking itself.
 *
 * A random number would change on every render, which makes the value
 * meaningless as a reference — you cannot quote "DL-7F2K91" twice and mean
 * the same booking. Deriving it from the details means the same request
 * always produces the same reference, and two different requests never
 * collide. */
function referenceFor(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return `DL-${hash.toString(36).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}

/** A bare `YYYY-MM-DD` is parsed as UTC midnight, which renders as the
 *  previous day for anyone west of Greenwich. Formatting in UTC keeps the
 *  date the visitor actually chose. */
function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function readOne(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ConfirmationPage({
  searchParams,
}: PageProps<"/confirmation">) {
  const params = await searchParams;

  const name = readOne(params.name)?.trim();
  const email = readOne(params.email)?.trim();
  const serviceId = readOne(params.service);
  const barber = readOne(params.barber);
  const date = readOne(params.date);
  const time = readOne(params.time);

  /* Reached directly, without a request behind it. Say so plainly rather
     than rendering an empty confirmation. */
  const hasBooking = Boolean(name && date && time);

  const service = services.find((item) => item.id === serviceId);
  const seed = [name, email, serviceId, date, time].filter(Boolean).join("|");
  const reference = referenceFor(seed);

  return (
    <>
      <header className="border-b border-line">
        <Container className="pb-block pt-16 lg:pb-20 lg:pt-24">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <Eyebrow index="I">
              {hasBooking ? "Request Received" : "No Booking Found"}
            </Eyebrow>
            {hasBooking ? (
              <div className="micro-label text-muted-ink">Ref. {reference}</div>
            ) : null}
          </div>

          <h1 className="text-display display-type mt-10 text-ink lg:mt-14">
            <Reveal as="span" className="block">
              {hasBooking ? "Held," : "Nothing"}
            </Reveal>
            <Reveal
              as="span"
              delay={90}
              className="block pl-[8vw] italic lg:pl-[10vw]"
            >
              {hasBooking ? "pending." : "to confirm."}
            </Reveal>
          </h1>

          <p className="measure text-lead mt-10 text-muted-ink lg:mt-14">
            {hasBooking
              ? "One of the three of us will reply within a working day to confirm, or to offer you the nearest alternative."
              : "There is no booking attached to this page. If you have just submitted a request, it may still be on its way — otherwise start again."}
          </p>

          <Rule weight="thick" className="mt-12 lg:mt-16" />
        </Container>
      </header>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {hasBooking ? (
              <Reveal className="lg:col-span-7">
                <Eyebrow>Your Request</Eyebrow>
                <dl className="mt-8 flex flex-col">
                  <ReadOnlyRow term="Reference">{reference}</ReadOnlyRow>
                  <ReadOnlyRow term="Name">{name}</ReadOnlyRow>
                  {email ? <ReadOnlyRow term="Email">{email}</ReadOnlyRow> : null}
                  <ReadOnlyRow term="Service">
                    {service ? (
                      <span className="flex flex-wrap items-baseline gap-3">
                        {service.name}
                        <span className="micro-label text-muted-ink">
                          {service.duration}
                        </span>
                      </span>
                    ) : (
                      "To be confirmed"
                    )}
                  </ReadOnlyRow>
                  <ReadOnlyRow term="Barber">
                    {!barber || barber === "any" ? "First available" : barber}
                  </ReadOnlyRow>
                  <ReadOnlyRow term="Date">
                    {date ? formatDate(date) : "—"}
                  </ReadOnlyRow>
                  <ReadOnlyRow term="Time">{time}</ReadOnlyRow>
                </dl>

                <p className="micro-label mt-8 text-muted-ink">
                  Not a confirmed booking until we reply
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
              <Eyebrow>What Happens Next</Eyebrow>
              <Rule className="mt-6" />

              <ol className="mt-8 flex flex-col">
                {[
                  "We read the request — all three of us, every morning.",
                  "You get a reply within one working day, from a person.",
                  "If the time works, it is confirmed and written in the book.",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-6 border-b border-line py-5"
                  >
                    <span className="micro-label shrink-0 text-muted-ink tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="measure-tight text-body text-muted-ink">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-col items-start gap-4">
                {hasBooking ? (
                  <Button href="/services" variant="secondary" size="md" withArrow>
                    Back to the price list
                  </Button>
                ) : (
                  <Button href="/appointment" variant="primary" size="md" withArrow>
                    Request an appointment
                  </Button>
                )}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="micro-label text-muted-ink underline-rule w-fit transition-colors duration-instant ease-sharp hover:text-ink"
                >
                  Or ring {site.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
