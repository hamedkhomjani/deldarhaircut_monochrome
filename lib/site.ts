/** Brand and content constants.
 *
 * Every string a visitor can read lives here, not inside a component.
 * Pages compose from this data; components stay presentational. Changing
 * a price or a phone number is a one-line edit, and there is exactly one
 * place where the studio's details can be wrong.
 */

export const site = {
  name: "Deldar",
  suffix: "Haircut",
  /** Used for <title> and structured data. */
  title: "Deldar Haircut — Barbers & Hair Stylists",
  description:
    "An austere editorial barbershop. Precision cuts, hot towels, and a room built for quiet. Appointments by reservation.",
  url: "https://deldarhaircut.example",
  locale: "en_GB",
  address: {
    street: "14 Ashcombe Lane",
    city: "London",
    postcode: "W1D 3QF",
    country: "GB",
  },
  phone: "+44 20 7946 0142",
  phoneDisplay: "+44 20 7946 0142",
  /** One-line summary of when the phone is actually picked up. Stated here
   *  rather than inline so the promise is visible to anyone editing hours. */
  hoursSummary: "Tue–Sat, 09:00–18:00",
  email: "chair@deldarhaircut.com",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "The Studio" },
  { href: "/appointment", label: "Appointments" },
] as const;

export type Service = {
  id: string;
  name: string;
  /** Set in the display serif. */
  description: string;
  duration: string;
  price: number;
  /** Previous price, rendered struck through. Present only where a
   *  service has genuinely been repriced. */
  wasPrice?: number;
  note?: string;
  /** The tier the price list elevates on desktop. At most one service should
   *  carry it; the component asserts nothing, so a second flag would simply
   *  produce two elevated tiers and an unreadable comparison. */
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "signature-cut",
    name: "The Signature Cut",
    description:
      "A consultation, a wash, and a cut shaped to the head rather than the trend. Finished with a hot towel and a dry finish.",
    duration: "60 min",
    price: 68,
    wasPrice: 80,
    featured: true,
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    description:
      "Clipped to the skin with a bare razor finish. The sharpest line we draw and the one that shows the most patience.",
    duration: "45 min",
    price: 45,
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt",
    description:
      "Line-up, shape, and hot-towel finish. Complements any cut, or stands alone.",
    duration: "30 min",
    price: 32,
  },
  {
    id: "cut-and-shave",
    name: "Cut & Shave",
    description:
      "The full ritual. Cut, straight-razor shave, and an aftershave balm pressed into the skin.",
    duration: "90 min",
    price: 95,
  },
  {
    id: "grey-blend",
    name: "Grey Blend",
    description:
      "Quiet colour work that softens silver without erasing it. No visible regrowth line.",
    duration: "75 min",
    price: 72,
    note: "Consultation required",
  },
  {
    id: "restoration",
    name: "Scalp Restoration",
    description:
      "Exfoliating cleanse, mask, and low-level therapy. For a head that has had a hard year.",
    duration: "60 min",
    price: 58,
  },
];

/** The studio's numbers, stated as a specification rather than as adjectives.
 *
 * The `featured` entry is the one the studio is judged on, and it is the tier
 * the price list elevates. Keeping the flag in the data rather than in the
 * component means the elevation follows the service if the services are
 * reordered, and cannot end up pointing at the wrong row. */
export const stats = [
  { label: "Established", value: "2011", note: "Fifteen years on the same lane" },
  { label: "Barbers", value: "03", note: "No rotating cast of names" },
  { label: "Chairs", value: "04", note: "One is always free by Thursday" },
  { label: "In the book", value: "12k", note: "Appointments, not walk-ins" },
] as const;

export const team = [
  {
    name: "Deldar Ahmadi",
    role: "Founder & Master Barber",
    since: "2011",
    line: "Fifteen years behind the chair and still convinced the best work is the kind nobody notices was done.",
  },
  {
    name: "Ines Corbin",
    role: "Senior Stylist",
    since: "2016",
    line: "Trained in London and Tehran. Specialises in grey blending and cuts that grow out honestly.",
  },
  {
    name: "Marek Oyelaran",
    role: "Barber",
    since: "2019",
    line: "Fades, tapers, and a stubborn refusal to use a guard I have not earned.",
  },
] as const;

export const hours = [
  { days: "Monday — Thursday", time: "09:00 — 19:00" },
  { days: "Friday", time: "09:00 — 20:00" },
  { days: "Saturday", time: "08:00 — 18:00" },
  { days: "Sunday", time: "Closed" },
] as const;

export const testimonials = [
  {
    quote:
      "I have been coming here for six years and I have never once been asked how I would like it cut. That is the point.",
    attribution: "Regular since 2019",
  },
  {
    quote:
      "The only barber in London who will tell you a shape will not suit you and then decline to do it anyway.",
    attribution: "Verified client",
  },
  {
    quote:
      "It is a room, not a queue. You sit, you drink something, and then the work happens.",
    attribution: "Verified client",
  },
] as const;

/** Framed as an exhibition catalogue would frame it. */
export const plates = [
  { index: "01", title: "Skin Fade", meta: "45 min" },
  { index: "02", title: "The Signature Cut", meta: "60 min" },
  { index: "03", title: "Beard Sculpt", meta: "30 min" },
  { index: "04", title: "Cut & Shave", meta: "90 min" },
  { index: "05", title: "Grey Blend", meta: "75 min" },
  { index: "06", title: "Scalp Work", meta: "60 min" },
] as const;
