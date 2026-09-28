import { cn } from "@/lib/cn";
import { ruleWeights } from "@/components/ui/rule";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** The four patterns from the spec, as a closed set.
 *
 *  lines     PRIMARY. Horizontal, 4px period. The paper grain.
 *  grid      SECONDARY. 40px × 40px. Structure you notice on purpose.
 *  diagonal  45°, half the primary's weight. For a divider band.
 *  noise     SVG fractal turbulence at 2%. Kills the banding that a 1.5%
 *            line pattern produces across large flat areas.
 *  none      Explicit opt-out, so a call site can state its intent rather
 *            than simply omitting the prop.
 *
 * Typed as a union rather than a string so that a new pattern cannot be
 * invented at a call site: adding one means changing the token layer first. */
export type SectionTexture = "none" | "lines" | "grid" | "diagonal" | "noise";

const textures: Record<SectionTexture, string | null> = {
  none: null,
  lines: "texture-lines",
  grid: "texture-grid",
  diagonal: "texture-diagonal",
  noise: "texture-noise",
};

export type SectionProps = {
  /**
   * Flips the ground to black and the type to white.
   *
   * This is the system's one dramatic device — "inversion for emphasis"
   * in the brief — so it is a first-class prop rather than a stack of
   * dark: classes. Because the semantic colour tokens are indirections,
   * everything inside this section (text, hairlines, rules, buttons, form
   * fields) re-themes itself. No descendant needs to know.
   */
  invert?: boolean;
  /**
   * Applies one or more of the spec's patterns across the whole section.
   *
   * Every pattern is a `background-image` and every one of them is
   * ink-coloured with baked-in alpha, so the texture follows the ground
   * automatically: 1.5% black on white, 3% white on black. A texture is
   * therefore one prop here rather than a colour decision at every layer.
   *
   * Accepts an array because the brief asks for *layered* textures, and
   * layers are the point: a single 1.5% rule field reads as a flat tint,
   * whereas a rule field with fractal noise on top reads as paper. Stacking
   * `["lines", "noise"]` is what produces the second result, and the two
   * patterns are individually too subtle to do it alone.
   *
   * An inverted section defaults to `lines` on the *vertical* axis, because
   * the spec asks for vertical lines on dark grounds — and the change of axis
   * is what stops an inverted band from reading as a slightly greyer copy of
   * the light section above it. Pass `texture` explicitly to override.
   */
  texture?: SectionTexture | readonly SectionTexture[];
  /**
   * Draws a rule across the top of the section, from the shared five-step
   * line scale.
   *
   * The spec pairs the section rhythm with black rules at `thick` or `ultra`
   * only, so those are the two offered: a 4px or an 8px black line. The
   * lighter steps belong to `Rule` and are not section boundaries — a 1px
   * hairline between two sections is a texture, not a division.
   *
   * Drawn as a real border on the section itself rather than as a `Rule`
   * child, so it spans the full viewport width rather than the content
   * column. A divider that stops at the text measure is a line inside a
   * layout; one that crosses the whole page is a statement.
   */
  divider?: "none" | "thick" | "ultra";
  /**
   * Removes the default vertical rhythm when the section is managing its
   * own spacing against a full-bleed edge.
   */
  flush?: boolean;
  /** Announced by assistive tech when the section has an `ariaLabel`. */
  ariaLabel?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"section">;

const dividers = {
  none: null,
  thick: ruleWeights.thick,
  ultra: ruleWeights.ultra,
} as const;

export function Section({
  invert = false,
  texture,
  divider = "none",
  flush = false,
  ariaLabel,
  className,
  children,
  ...rest
}: SectionProps) {
  const requested = texture ?? (invert ? (["lines"] as const) : ([] as const));
  const layers = (Array.isArray(requested) ? requested : [requested]) as readonly SectionTexture[];

  /* An inverted ground always takes vertical lines, whatever else is layered
     on top of it, so the pattern order is normalised here rather than left to
     each call site. */
  const patterns = invert
    ? ["texture-lines-vertical" as const, ...layers.map((name) => textures[name])]
    : layers.map((name) => textures[name]);

  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "relative isolate bg-paper text-ink",
        invert && "data-invert",
        !flush && "py-24 md:py-32 lg:py-40",
        dividers[divider],
        className,
      )}
      {...rest}
    >
      {/* The textures are their own elements rather than a background-image on
          the section, for two reasons.
          `isolate` creates a stacking context, so `-z-10` pins them behind
          this section's content at any nesting depth without any child
          needing its own `z-*`. And an absolutely-positioned layer cannot
          affect layout or intercept a pointer, which a pseudo-element would
          have to be told twice over.
          A pseudo-element is not in the accessibility tree in any browser,
          so no aria-hidden is needed. */}
      {patterns.map((pattern, index) =>
        pattern ? (
          <span
            key={pattern}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 select-none",
              pattern,
              /* Each layer sits fractionally above the one beneath it, so the
                 stack composites in the order given. Without this they would
                 all share one stacking position and the browser would resolve
                 the overlap by paint order alone. */
              index > 0 && "z-[-9]",
            )}
          />
        ) : null,
      )}

      {children}
    </section>
  );
}
