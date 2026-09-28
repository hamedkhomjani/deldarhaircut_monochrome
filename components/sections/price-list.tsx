import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { type Service, services } from "@/lib/site";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

function formatPrice(value: number) {
  return currency.format(value);
}

/** The contents of one row. The `<li>` itself is the `Reveal`, so that
 *  there is no element between the list and its items. */
function PriceRow({ service, index }: { service: Service; index: number }) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 md:grid-cols-12">
      <span className="micro-label text-muted-ink tabular-nums md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-3 md:col-span-6">
        <h3 className="heading-type text-h3 text-ink">{service.name}</h3>

        {service.featured ? (
          /* The elevated tier needs a label, or the extra height reads as a
             layout accident. Set as a bordered micro-label rather than a
             filled badge: a black chip would be the only solid black object
             inside a list of ruled rows, and it would carry more weight than
             the price it is annotating. */
          <span className="micro-label w-fit border-2 border-ink px-3 py-2 text-ink">
            The Signature
          </span>
        ) : null}

        <p className="measure-tight text-body text-muted-ink">
          {service.description}
        </p>
        {service.note ? (
          <span className="micro-label w-fit border border-line px-3 py-2 text-muted-ink">
            {service.note}
          </span>
        ) : null}
      </div>

      <span className="micro-label text-muted-ink tabular-nums md:col-span-2">
        {service.duration}
      </span>

      <div className="flex items-baseline gap-3 md:col-span-3 md:justify-end">
        {service.wasPrice ? (
          <s className="font-mono text-body text-muted-ink tabular-nums">
            {formatPrice(service.wasPrice)}
          </s>
        ) : null}
        <span className="font-mono text-body-lg text-ink tabular-nums">
          {formatPrice(service.price)}
        </span>
      </div>
    </div>
  );
}

export type PriceListProps = {
  /** Show only the first N services — used on the home page. */
  limit?: number;
  eyebrow?: string;
  index?: string;
  title?: string;
  lead?: string;
  action?: ReactNode;
  /** Suppress the section's own heading when the page supplies one. */
  bare?: boolean;
};

/** The price list.
 *
 * Prices are set in tabular mono, like an invoice, which keeps the decimal
 * edges aligned down the column — the reason that face is in the system at
 * all. A struck-through former price uses the line-based device from the
 * brief instead of a coloured sale badge, because there is no colour left
 * to make a badge out of.
 */
export function PriceList({
  limit,
  eyebrow = "The Price List",
  index = "II",
  title = "Everything, priced plainly.",
  lead = "No packages, no membership, no card machine upsell at the basin. The price on this page is the price at the chair.",
  action,
  bare = false,
}: PriceListProps) {
  const list = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <Section divider="thick" ariaLabel="Services and prices">
      <Container>
        {bare ? null : (
          <SectionHeading
            eyebrow={eyebrow}
            index={index}
            title={title}
            lead={lead}
            action={action}
          />
        )}

        <ul
          className={cn("border-b border-line", !bare && "mt-16 lg:mt-24")}
        >
          {list.map((service, position) => (
            <Reveal
              /* The negative gutter lets the inversion bleed to the
               * container edge, so hovering reads as the row lifting off
               * the page rather than as a rectangle floating inside it.
               *
               * `invert-on-hover` rather than `hover:bg-ink hover:text-paper`:
               * these rows set `text-muted-ink` on their own children, and a
               * colour class on the parent would leave those children at
               * #525252 on a black ground. The class flips the tokens, so the
               * whole row inverts and the hover is guaranteed to be the exact
               * inverse of the resting state.
               *
               * The featured tier extends past the list at both ends on
               * desktop only. Raising it alone would collide with the heading;
               * extending it symmetrically is what makes it read as taller
               * rather than as nudged, and the `py` grows to absorb the extra
               * height so no row below it moves. */
              as="li"
              key={service.id}
              delay={position * 40}
              className={cn(
                "-mx-6 border-t border-line px-6 py-8 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 lg:py-10",
                "transition-colors duration-instant ease-sharp motion-reduce:transition-none",
                "invert-on-hover",
                service.featured &&
                  "border-t-2 border-t-ink lg:-my-8 lg:border-t-4 lg:py-14",
              )}
            >
              <PriceRow service={service} index={position} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
