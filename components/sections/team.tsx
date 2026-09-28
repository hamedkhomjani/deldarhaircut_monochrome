import { Scissors } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { team } from "@/lib/site";

export function Team() {
  return (
    <Section divider="thick" ariaLabel="The barbers">
      <Container>
        <SectionHeading
          eyebrow="The Chair"
          index="IV"
          title="Who holds the scissors."
          lead="Three barbers, fifteen years of collective time on this street, and no rotating cast of names on the door."
        />

        {/* `gap-px` over a `bg-line` ground draws the dividers between cards
            with the background showing through the gaps, so the rules land
            exactly on the grid lines instead of doubling up on card edges.
            That is why these cards are `borderless`: a border here would put
            a second line 1px away from the first. */}
        <ul className="mt-16 grid grid-cols-1 gap-px bg-line lg:mt-24 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal as="li" key={member.name} delay={index * 40}>
              <Card
                variant="borderless"
                interactive
                className="flex h-full flex-col gap-5 bg-paper p-8 lg:p-10"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="micro-label text-muted-ink tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon icon={Scissors} size={20} />
                </div>

                <h3 className="heading-type text-h3 text-ink">{member.name}</h3>

                <p className="micro-label text-muted-ink">{member.role}</p>

                <p className="measure-tight text-body text-muted-ink">
                  {member.line}
                </p>

                <p className="micro-label mt-auto pt-4 text-muted-ink tabular-nums">
                  Est. {member.since}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
