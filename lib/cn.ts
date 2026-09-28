/** Join class names, dropping anything falsy.
 *
 * Deliberately minimal — no `clsx`, no `tailwind-merge`.
 *
 * Why no conflict-resolution library: merging would let a consumer
 * override a primitive's *visual* decisions by passing `className`, which
 * is how design systems decay into one-off styles. Instead, every visual
 * decision in this system is an explicit typed prop (`variant`, `tone`,
 * `invert`), and `className` is reserved for layout and spacing only.
 * Primitive styles therefore stay authoritative, and the argument order
 * below never has to be defended.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
