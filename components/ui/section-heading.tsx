import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

const headingSizes = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

export type SectionHeadingProps = {
  /** Drives both the real heading level and its type size, so the two can
   *  never drift apart. */
  as?: keyof typeof headingSizes;
  /** Overrides the size when a page needs a heading larger than its level. */
  size?: keyof typeof headingSizes | "display";
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  /** Standfirst paragraph. Set in the display serif's larger cousin, muted. */
  lead?: ReactNode;
  /** A button or link set opposite the lead. */
  action?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

/** The repeated shape of every section on the site: label, statement,
 *  elaboration, optional action.
 *
 * Composing this once means the vertical rhythm, the measure of the
 * standfirst, and the muted tone of supporting copy are decided in exactly
 * one place. A page that needs a section to feel different overrides the
 * `size` prop rather than rewriting twenty lines of markup.
 */
export function SectionHeading({
  as: Heading = "h2",
  size,
  eyebrow,
  index,
  title,
  lead,
  action,
  align = "start",
  className,
}: SectionHeadingProps) {
  const isCentred = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCentred ? "items-center text-center" : "items-start",
        // The action sits on the same optical line as the standfirst on
        // wide screens, and drops below it when there is no room.
        "gap-8 md:flex-row md:items-end md:justify-between md:gap-16",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          isCentred ? "items-center" : "items-start",
        )}
      >
        {eyebrow || index ? (
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        ) : null}

        <Heading
          className={cn(
            "heading-type text-ink",
            size === "display" ? "text-display" : headingSizes[size ?? Heading],
          )}
        >
          {title}
        </Heading>

        {lead ? (
          <p className={cn("measure text-lead text-muted-ink")}>{lead}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
