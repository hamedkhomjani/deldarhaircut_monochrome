import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** A boxed initial.
 *
 * The brief asks for a boxed drop cap on the opening paragraph of a detail
 * view. Two decisions are worth stating, because both were the alternative.
 *
 * It is a real element in the flow, not a `::first-letter`. A pseudo-element
 * cannot be given a border, a background, or padding — every one of those is
 * exactly what "boxed" means here — and a cap that hangs outside the measure
 * pushes the first line of the paragraph out of alignment with every line
 * below it. As a grid cell the cap occupies the first two lines, the text
 * flows beside it, and the paragraph's left edge stays true.
 *
 * The box is `border-2`, not filled. A black square with a white letter is a
 * sticker; a ruled square with a black letter is a plate mark, and it keeps
 * the opening paragraph of a product readable rather than decorative.
 *
 * `aria-hidden` is not appropriate here and is deliberately absent: the
 * initial is real text that a screen reader should read as part of the
 * sentence. Splitting the first letter into its own element does not hide it
 * from assistive technology, and the browser's own text flow still produces
 * "The" rather than "T he", because the split is a `<span>` and not a
 * `display: inline-block` boundary.
 */
export function DropCap({
  children,
  className,
}: {
  /** The opening paragraph. Its first character is lifted into the box. */
  children: ReactNode;
  className?: string;
}) {
  const text = typeof children === "string" ? children : null;

  /* A non-string child — a fragment of nodes, or a paragraph passed as
     elements — cannot be split reliably, so the cap is skipped rather than
     guessed at. Rendering the paragraph unadorned is the safe failure: the
     text is all still there. */
  if (text === null || text.length === 0) {
    return <p className={cn("measure", className)}>{children}</p>;
  }

  const initial = text.slice(0, 1);
  const rest = text.slice(1);

  return (
    <p
      className={cn(
        "grid grid-cols-[auto_1fr] items-baseline gap-x-4",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "heading-type row-span-2 flex size-16 items-center justify-center",
          "border-2 border-ink text-5xl text-ink",
          "sm:size-20 sm:text-6xl",
        )}
      >
        {initial}
      </span>
      <span>{rest}</span>
    </p>
  );
}
