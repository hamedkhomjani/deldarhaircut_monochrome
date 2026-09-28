import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/** The horizontal rhythm of the entire site.
 *
 * One width, one set of insets, stated literally:
 *
 *   max-w-6xl   72rem
 *   px-6        24px   — phone
 *   md:px-8     32px   — tablet
 *   lg:px-12    48px   — desktop
 *
 * These are the spec's values verbatim rather than a fluid `clamp()`,
 * because a container that widens with the viewport stops being a measure
 * and starts being a coincidence: the content column would be a different
 * width on every screen, so nothing could be designed against it. Three
 * discrete steps hold the column still while the margins absorb the change.
 *
 * The values are also Tailwind's own scale rather than a custom spacing
 * token, so there is no parallel set of numbers to keep in sync.
 *
 * `className` is merged last, so a caller can opt a specific instance out of
 * the inset — a full-bleed rule, say. Do that with the matching negative
 * margin, e.g. `-mx-6 md:-mx-8 lg:-mx-12`, which is what `PriceList` does.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<T>, "as" | "children"> & {
  as?: T;
  children: ReactNode;
}) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-12",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
