import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Plates } from "@/components/sections/plates";
import { PriceList } from "@/components/sections/price-list";
import { Stats } from "@/components/sections/stats";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      {/* Four of six services on the home page; the rest on /services, so
          the page shows a shape without exhausting it. */}
      <PriceList
        limit={4}
        action={
          <Button href="/services" variant="secondary" size="md" withArrow>
            All six services
          </Button>
        }
      />
      <Plates />
      <Team />
      <Stats />
      <Testimonials />
      <Cta />
    </>
  );
}
