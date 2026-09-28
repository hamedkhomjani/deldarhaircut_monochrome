import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* Three surfaces, in ascending order of commitment.
 *
 *   standard    White ground, 1px black border. The default container for a
 *               discrete unit of content. A border rather than a fill,
 *               because a filled card on a white page is a rectangle of
 *               nothing — the border is what makes it an object.
 *   inverted    Black ground, white type, and NO border. A border here would
 *               be white on black and would read as a hairline crack in the
 *               surface rather than as an edge, so inversion deliberately
 *               drops it.
 *   borderless  No border, no fill. Separation comes from whitespace or from
 *               a `Rule` between siblings, which is the cheapest way to group
 *               content and the one that never boxes anything in.
 *
 * There is no shadow variant, at any weight. Depth is not a dimension this
 * system has. */
const variants = {
  standard: "border border-ink bg-paper",
  inverted: "data-invert border-0 bg-paper",
  borderless: "border-0 bg-transparent",
} as const;

export type CardProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof variants;
  /**
   * Inverts the whole card on hover.
   *
   * This adds the `invert-on-hover` scope rather than a set of `hover:bg-*`
   * and `hover:text-*` classes, because the spec asks for *full* inversion
   * and a partial one is a bug waiting to happen: any descendant that sets
   * its own `text-muted-ink` would not inherit the card's new colour and
   * would be left as #525252 on a black ground.
   *
   * The class is defined once in `globals.css` against the same declaration
   * block as `[data-invert]`, so a hover inversion is guaranteed to be the
   * exact inverse of the resting state — there is no second palette to keep
   * in step, and no descendant to remember.
   *
   * Only correct on a card that is itself the link or the control. On a
   * static card it advertises an interaction that does not exist.
   */
  interactive?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/** A boxed unit of content.
 *
 * Presentational only. This renders a `<div>` by default and owns no
 * semantics — when a card *is* a link, pass `as="a"` or wrap the card in the
 * link instead of nesting an interactive element inside it. Getting that
 * nesting wrong produces a control inside a control, which is invalid and
 * which screen readers handle badly.
 */
export function Card<T extends ElementType = "div">({
  as,
  variant = "standard",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={cn(
        "text-ink",
        "transition-colors duration-instant ease-sharp motion-reduce:transition-none",
        variants[variant],
        interactive && "invert-on-hover cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
