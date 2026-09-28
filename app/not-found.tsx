import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";

export default function NotFound() {
  return (
    <section className="border-b border-line">
      <Container className="pb-block pt-16 lg:pb-20 lg:pt-24">
        <Eyebrow index="404">Not Found</Eyebrow>

        <h1 className="text-display display-type mt-10 text-ink lg:mt-14">
          Wrong
          <span className="block pl-[8vw] italic lg:pl-[10vw]">chair.</span>
        </h1>

        <p className="measure text-lead mt-10 text-muted-ink lg:mt-14">
          There is nothing at this address. The studio has four chairs, and
          this is not one of them.
        </p>

        <Rule weight="thick" className="mt-12 lg:mt-16" />

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/" variant="primary" size="lg" withArrow>
            Return to the front
          </Button>
          <Button href="/appointment" variant="secondary" size="lg">
            Book an appointment
          </Button>
        </div>
      </Container>
    </section>
  );
}
