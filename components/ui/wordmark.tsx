import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
} as const;

export type WordmarkProps = {
  size?: keyof typeof sizes;
  /** `sub` reads as a caption under the name; `stacked` puts it on its own
   *  line. Both are pure layout — the type system is identical. */
  layout?: "inline" | "stacked";
  className?: string;
};

/** The brand lockup.
 *
 * The name is set in the display serif, in caps, and the qualifier in mono
 * as a catalogue subtitle. Because the qualifier uses a semantic token
 * (`text-muted-ink`) it re-themes itself when the mark sits inside an inverted
 * section, so the same component serves the header and the black footer
 * without a variant.
 */
export function Wordmark({
  size = "md",
  layout = "inline",
  className,
}: WordmarkProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} ${site.suffix} — home`}
      className={cn(
        "group inline-flex items-baseline gap-3 text-ink",
        layout === "stacked" ? "flex-col items-start gap-2" : "flex-row",
        className,
      )}
    >
      <span
        className={cn(
          "display-type uppercase leading-none",
          sizes[size],
          "tracking-[0.02em]",
        )}
      >
        {site.name}
      </span>
      <span className="micro-label text-muted-ink">{site.suffix}</span>
    </Link>
  );
}
