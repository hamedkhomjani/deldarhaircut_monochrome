"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type RevealProps = {
  /** Renders as any element, so a heading or list item can be revealed
   *  without wrapping it in a meaningless `<div>`. */
  as?: ElementType;
  /** Stagger, in milliseconds. Use to cascade a grid of items. */
  delay?: number;
  children: ReactNode;
  className?: string;
};

/** Reveal-on-scroll, with nothing to apologise for.
 *
 * The hidden state lives in CSS behind an `html[data-js]` guard rather than
 * in React state. That ordering matters: without JavaScript — or before it
 * hydrates — the guard is absent, the element renders plainly, and the
 * content is already on screen. No flash, no invisible copy, no
 * accessibility regression. JS turns the effect *on*; it never has to
 * rescue the page.
 *
 * `prefers-reduced-motion` is honoured in CSS, so the observer still fires
 * and the element still becomes visible — it simply arrives instantly.
 */
export function Reveal({
  as,
  delay = 0,
  children,
  className,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer to wait for, so reveal immediately by writing the class
      // to the node. Doing it here rather than through state keeps this to a
      // single render, and the class is the whole mechanism anyway.
      element.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          // One-way: once something has been seen it should never
          // re-animate on scroll-up.
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn("reveal", shown && "reveal-in", className)}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
