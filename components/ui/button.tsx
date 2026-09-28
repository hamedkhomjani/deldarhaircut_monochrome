import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* Three variants, and the relationships between them are the point.
 *
 *   primary   — the loudest. A black plate that inverts to white on hover.
 *   secondary — a 2px drawn box that fills black on hover.
 *   ghost     — no box at all. An underline appears on hover.
 *
 * Every one of the three is a monochrome inversion of the others, so the set
 * is derived from a single idea rather than designed three times: the
 * difference between the variants is only *how much* ink is committed before
 * the pointer arrives.
 *
 * Inversion is done with explicit `border` colour rather than a transparent
 * border, because a 2px border has to exist in both states — if the border
 * only appeared on hover the control would change size, and a layout that
 * shifts under the cursor is not a sharp state change, it is a jump. */
const variants = {
  primary: cn(
    "border-2 border-ink bg-ink text-paper",
    "hover:bg-paper hover:text-ink",
  ),
  secondary: cn(
    "border-2 border-ink bg-transparent text-ink",
    "hover:bg-ink hover:text-paper",
  ),
  ghost: cn(
    "border-0 bg-transparent text-ink",
    "hover:underline hover:underline-offset-4",
  ),
} as const;

/* `px-8 py-4` is the spec's generous default and is the `md` step. `sm` and
 * `lg` are proportional rather than arbitrary: the vertical padding tracks
 * the type size, and the horizontal padding stays wide enough that an
 * uppercase mono label never crowds its own border. */
const sizes = {
  sm: "px-6 py-3",
  md: "px-8 py-4",
  lg: "px-10 py-5",
} as const;

export type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Renders a `next/link` instead of a `<button>`. */
  href?: string;
  /** Appends an arrow that nudges on hover. */
  withArrow?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  withArrow = false,
  className,
  children,
  type,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "micro-label inline-flex items-center justify-center gap-3 text-center",
    "transition-colors duration-instant ease-sharp",
    "motion-reduce:transition-none",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-instant ease-sharp group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, withArrow && "group")}
        {...(rest as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
      >
        {content}
      </Link>
    );
  }

  return (
    /* A button inside a form defaults to `type="submit"`, which is almost
       never what a navigational or cancel control wants. Defaulting to
       "button" means a caller has to opt into submitting, which is the
       safer direction for the error to be in. */
    <button type={type ?? "button"} className={classes} {...rest}>
      {content}
    </button>
  );
}
