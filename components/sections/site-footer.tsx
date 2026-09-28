import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { Rule } from "@/components/ui/rule";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/cn";
import { hours, nav, site } from "@/lib/site";

/** A labelled row of contact details.
 *
 * The icon, the label and the value are one grid cell apart, so a column of
 * these aligns on the icon edge however long the values are. `MapPin` sits
 * over the address as a block rather than per-line, because a pin repeated on
 * every street line is noise. */
function Detail({
  icon,
  children,
}: {
  icon: Parameters<typeof Icon>[0]["icon"];
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1.5rem_1fr] items-start gap-x-4">
      <Icon icon={icon} size={20} className="mt-1 text-muted-ink" />
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

/** Studio details. Presented as a colophon, not as contact cards. */
function StudioColumn() {
  return (
    <div className="flex flex-col gap-6">
      <Eyebrow>The Studio</Eyebrow>

      <Detail icon={MapPin}>
        <address className="flex flex-col gap-1 text-body text-muted-ink not-italic">
          <span>{site.address.street}</span>
          <span>
            {site.address.city} {site.address.postcode}
          </span>
        </address>
      </Detail>

      <Detail icon={Phone}>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="text-body text-muted-ink underline-rule w-fit transition-colors duration-instant ease-sharp hover:text-ink"
        >
          {site.phoneDisplay}
        </a>
      </Detail>

      <Detail icon={Mail}>
        <a
          href={`mailto:${site.email}`}
          className="text-body text-muted-ink underline-rule w-fit transition-colors duration-instant ease-sharp hover:text-ink"
        >
          {site.email}
        </a>
      </Detail>
    </div>
  );
}

function HoursColumn() {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>Hours</Eyebrow>
      <dl className="flex flex-col">
        {hours.map((row) => (
          <div
            key={row.days}
            className="flex items-baseline justify-between gap-6 border-b border-line py-3"
          >
            <dt className="text-caption text-muted-ink">{row.days}</dt>
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
    </div>
  );
}

function NavigateColumn() {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>Navigate</Eyebrow>
      <ul className="flex flex-col">
        {nav.map((item) => (
          <li key={item.href} className="border-b border-line">
            <a
              href={item.href}
              className="touch-target flex w-full items-baseline justify-between gap-6 py-3 text-body text-muted-ink transition-colors duration-instant ease-sharp hover:text-ink"
            >
              <span>{item.label}</span>
              <span aria-hidden="true" className="micro-label text-muted-ink">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The page closes on an inverted ground.
 *
 * The footer is the design system's one unapologetic black rectangle, and
 * it earns its place by arriving once, at the end, after a page of white.
 * Everything inside re-themes via the `data-invert` scope — no dark: variants,
 * no duplicated colour values.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate data-invert bg-paper text-ink">
      {/* Layered, per the brief: noise over a vertical rule field.
          Previously the footer carried noise alone to differentiate it from
          the ruled inverted sections above — but once those are layered too,
          noise-only is no longer a distinction, and three identical black
          bands would flatten into one. The footer is now the densest
          texture on the site, which is what a colophon should be. */}
      <span
        aria-hidden="true"
        className="texture-lines-vertical pointer-events-none absolute inset-0 -z-10 select-none"
      />
      <span
        aria-hidden="true"
        className="texture-noise pointer-events-none absolute inset-0 -z-[9] select-none"
      />

      <Container className="py-24 md:py-32 lg:py-40">
        <Rule weight="thick" />

        <div className="pt-16">
          <Wordmark size="lg" layout="stacked" />
        </div>

        <Rule className="mt-16" />

        <div className="grid grid-cols-1 gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <NavigateColumn />
          <StudioColumn />
          <HoursColumn />

          <div className="flex flex-col gap-3">
            <Eyebrow>Hours &amp; Bookings</Eyebrow>
            <p className="measure-tight text-body text-muted-ink">
              By appointment only. Walk-ins are seated when a chair frees up,
              which is not a promise.
            </p>
            <a
              href="/appointment"
              className="micro-label text-ink underline-rule w-fit transition-opacity duration-instant ease-sharp hover:opacity-60"
            >
              Request a time
            </a>
          </div>
        </div>

        <Rule className="mt-16" />

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro-label text-muted-ink">
            © {new Date().getFullYear()} {site.name} {site.suffix}
          </p>
          <p className="micro-label text-muted-ink">
            {site.address.city} — {site.address.postcode}
          </p>
        </div>
      </Container>
    </footer>
  );
}
