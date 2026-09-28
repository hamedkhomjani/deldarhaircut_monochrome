"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/cn";
import { nav } from "@/lib/site";

/* The header inverts once the page moves.
 *
 * In a system with no colour, elevation and shadow are unavailable as
 * signals, so the only way to say "this surface is now above the page" is
 * to reverse it. `invert` flips the shared colour tokens, so the wordmark,
 * the nav, the button and every hairline in the bar re-theme from one
 * class. */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes the panel; without this, returning to a page via
  // the back button would find the overlay still covering it. Adjusting
  // state during render (rather than in an effect) means the panel is never
  // briefly painted open on the way to closing.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock the page behind the full-screen panel so the page underneath
  // cannot be scrolled by touch while the overlay is up.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line bg-paper",
        "transition-colors duration-instant ease-sharp",
        (scrolled || open) && "data-invert",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-8 lg:h-24">
        <Wordmark size="sm" />

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {nav.map((item) => {
            const current = isCurrent(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "micro-label transition-opacity duration-instant ease-sharp",
                  current
                    ? "text-ink underline-rule"
                    : "text-muted-ink hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            href="/appointment"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Book
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="micro-label -mr-2 flex items-center gap-3 px-2 py-3 text-ink md:hidden"
            touch-target
          >
            {open ? "Close" : "Menu"}
            {/* The two rules collapse into a cross. Pure type, no icon set. */}
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform duration-instant ease-sharp",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-current transition-transform duration-instant ease-sharp",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-menu"
          className="data-invert border-t border-line bg-paper text-ink md:hidden"
        >
          <Container className="flex flex-col py-10">
            <nav aria-label="Primary, mobile" className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="heading-type border-b border-line py-6 text-h2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button
              href="/appointment"
              variant="primary"
              size="lg"
              className="mt-10 w-full"
            >
              Book an appointment
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
