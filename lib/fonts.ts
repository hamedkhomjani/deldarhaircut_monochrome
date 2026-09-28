import { JetBrains_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";

/* Three faces, three strictly separated jobs.
 *
 * DISPLAY — Playfair Display. A high-contrast transitional serif with a
 *   Didone skeleton. Carries every headline and the italic accent words.
 *   This is the voice of the brand.
 *
 * BODY — Source Serif 4. A workhorse text serif designed for continuous
 *   reading on screen. Chosen over a grotesque deliberately: the brief asks
 *   for an editorial, book-like register, and a serif body beside a serif
 *   display is what produces it — the hierarchy comes from contrast and
 *   scale rather than from a change of category.
 *
 * MONO — JetBrains Mono. Not decorative: it carries the museum-label
 *   metadata (nav, indices, prices, eyebrow labels, form labels) so that
 *   structural information is typographically distinct from prose. Because
 *   it is monospaced, tabular figures in the price list align down the
 *   column, which is the reason this face is in the system at all.
 *
 * Every face is self-hosted by next/font — no request ever reaches Google.
 */
export const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--face-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/* Source Serif 4 is a variable font with an optical-size axis. Requesting
 * the range lets the browser interpolate weight, and the `opsz` axis is
 * left at its default so the face matches its own optical sizing. */
export const body = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--face-body",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/* JetBrains Mono has no italic and no variable width axis, so weights are
 * declared explicitly. 400 and 500 are all the system asks for: 400 for
 * labels, 500 where a label must hold against a heavy ground. */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--face-mono",
  fallback: ["SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
