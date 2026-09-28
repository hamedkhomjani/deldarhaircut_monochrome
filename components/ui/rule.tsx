import { cn } from "@/lib/cn";

/** The spec's five-step line scale, verbatim:
 *  hairline  1px  #E5E5E5   structure without emphasis
 *  thin      1px  #000000   a drawn line
 *  medium    2px  #000000   division between major movements
 *  thick     4px  #000000   the heavy gesture
 *  ultra     8px  #000000   the heaviest gesture in the system
 *
 *  Exported so that `Section` can draw its dividers from the same scale
 *  rather than restating widths — a second list of border widths is exactly
 *  how a five-step scale decays into an arbitrary one.
 *
 *  Every weight is a *top* rule, because every use of a rule in this system
 *  is a divider between stacked content. A `Rule` with two or more weights
 *  stacked would need children, and no such composition exists — the type
 *  scale provides the rhythm instead. */
export const ruleWeights = {
  hairline: "border-line border-t",
  thin: "border-ink border-t",
  medium: "border-ink border-t-2",
  thick: "border-ink border-t-4",
  ultra: "border-ink border-t-8",
} as const;

export type RuleWeight = keyof typeof ruleWeights;

export type RuleProps = {
  weight?: RuleWeight;
  className?: string;
};

/** A drawn line.
 *
 * In a system with no shadows and no fills, the rule *is* the structural
 * vocabulary. Centralising the five weights here is what stops `border-t-2`
 * and `border-t-4` from being sprinkled around the codebase as one-offs, and
 * it keeps the count of black lines on a page a deliberate decision rather
 * than an accident of whoever wrote the section.
 *
 * Renders a decorative `<div>`; it is omitted from the accessibility tree
 * because a purely visual divider carries no information.
 */
export function Rule({ weight = "hairline", className }: RuleProps) {
  return (
    <div aria-hidden="true" className={cn("w-full", ruleWeights[weight], className)} />
  );
}
