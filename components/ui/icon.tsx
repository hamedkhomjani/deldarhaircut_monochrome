import { cn } from "@/lib/cn";
import type { LucideIcon, LucideProps } from "lucide-react";

/** The two icon sizes in the system. Nothing else is permitted. */
export type IconSize = 20 | 24;

const sizes: Record<IconSize, string> = {
  20: "size-5", /* 20px — inline with body text and form labels */
  24: "size-6", /* 24px — standalone affordances and list markers */
};

/** The system's single entry point for iconography.
 *
 * Every icon in the project is rendered through here, for the same reason
 * every rule goes through `Rule` and every button through `Button`: the
 * constraints are the design, and a constraint that lives at the call site is
 * a constraint that will be violated at the call site.
 *
 * The wrapper owns three things that are otherwise trivially inconsistent:
 *
 *   size         20 or 24 only. Lucide's default is 24, so a bare
 *                `<Phone size={20} strokeWidth={1.5} />` at every call site is
 *                a class of typo waiting to happen.
 *   strokeWidth  1.5, always. Lucide's own default is 2, which is too heavy
 *                for a system whose entire visual weight budget is 1px
 *                hairlines. Pinning it here is the point.
 *   colour       `text-ink`, so an icon re-themes itself inside an inverted
 *                section exactly as type does. `className` can still override
 *                it for the cases that genuinely need a different weight.
 *
 * Icons are decorative by default. `aria-hidden` is set unless the caller
 * passes a `title`, because a lone icon in a monochrome layout is nearly
 * always an affordance whose meaning is already carried by adjacent text, and
 * announcing "phone" before every phone number is noise. Pass `title` when the
 * icon is the *only* label — a bare icon button — and the wrapper will expose
 * it as an accessible name.
 */
export type IconProps = Omit<LucideProps, "size" | "strokeWidth" | "color"> & {
  icon: LucideIcon;
  size?: IconSize;
  /**
   * Accessible name. Supply one only when the icon carries meaning that is
   * not already stated in adjacent text; omit it and the icon is hidden.
   */
  title?: string;
};

export function Icon({
  icon: Glyph,
  size = 20,
  title,
  className,
  ...rest
}: IconProps) {
  return (
    <Glyph
      width={size}
      height={size}
      strokeWidth={1.5}
      /* A hairline icon inherits the ink token rather than hard-coding a
         colour, so it inverts with everything else. `aria-hidden` when there
         is no name, so it stays out of the accessibility tree. */
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      className={cn("shrink-0 text-ink", sizes[size], className)}
      {...rest}
    />
  );
}
