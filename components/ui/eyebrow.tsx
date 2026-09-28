import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type EyebrowProps = {
  /**
   * Catalogue-style numeral ("01", "II"). Rendered in a fixed-width slot so
   * that a column of headings aligns on the label, not on the number.
   */
  index?: string;
  children: ReactNode;
  className?: string;
};

/** The museum wall label.
 *
 * Mono, uppercase, wide-tracked, and set small. Everything structural in
 * this system that is not prose goes through here — nav, section indices,
 * prices, form labels — so that a visitor can tell at a glance whether
 * they are reading *content* or *metadata*.
 */
export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p className={cn("flex items-baseline gap-5", className)}>
      {index ? (
        <span className="micro-label w-7 shrink-0 text-muted-ink tabular-nums">
          {index}
        </span>
      ) : null}
      <span className="micro-label text-muted-ink">{children}</span>
    </p>
  );
}
