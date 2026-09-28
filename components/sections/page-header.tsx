import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Rule } from "@/components/ui/rule";
import type { ReactNode } from "react";

export type PageHeaderProps = {
  eyebrow: string;
  index?: string;
  /** Rendered as display type. Break it with the `titleBreak` prop rather
   *  than by injecting markup, so the line breaks stay an authored
   *  composition decision instead of an accident of wrapping. */
  title: string;
  titleBreak?: string;
  lead?: string;
  /** Mono metadata, set opposite the title. */
  meta?: ReactNode;
};

/** The masthead for an interior page.
 *
 * Every inner page opens with the same three movements — label, statement,
 * rule — at the same scale. That repetition is the point: after two pages a
 * visitor knows where they are before they have read a word, and the only
 * thing that changes between pages is the statement itself.
 */
export function PageHeader({
  eyebrow,
  index,
  title,
  titleBreak,
  lead,
  meta,
}: PageHeaderProps) {
  return (
    <header className="border-b border-line">
      <Container className="pb-block pt-16 lg:pb-20 lg:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          {meta ? <div className="micro-label text-muted-ink">{meta}</div> : null}
        </div>

        <h1 className="text-display display-type mt-10 text-ink lg:mt-14">
          <Reveal as="span" className="block">
            {title}
          </Reveal>
          {titleBreak ? (
            <Reveal
              as="span"
              delay={90}
              className="block pl-[8vw] italic lg:pl-[10vw]"
            >
              {titleBreak}
            </Reveal>
          ) : null}
        </h1>

        {lead ? (
          <Reveal delay={160}>
            <p className="measure text-lead mt-10 text-muted-ink lg:mt-14">{lead}</p>
          </Reveal>
        ) : null}

        <Rule weight="thick" className="mt-12 lg:mt-16" />
      </Container>
    </header>
  );
}
