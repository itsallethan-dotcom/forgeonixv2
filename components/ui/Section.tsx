import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { FlowJoint } from "@/components/visuals/FlowJoint";

type SectionProps = {
  /** Anchor id — also used to derive the aria-labelledby heading id. */
  id: string;
  children: ReactNode;
  /** When provided, the section is labelled by a heading with id `${id}-title`. */
  labelledBy?: boolean;
  /** Faint static blueprint grid backdrop. Off by default. */
  grid?: boolean;
  /** Constrain and pad content to page width. On by default. */
  contained?: boolean;
  /** Render a workflow joint straddling the top border (the connective motif). */
  connector?: boolean;
  /** Add the occasional data pulse to the joint. Requires `connector`. */
  pulse?: boolean;
  className?: string;
};

/**
 * Semantic section primitive: owns vertical rhythm (`fx-section`), the anchor
 * id used by nav/scroll-spy, and optional accessible labelling. Content is
 * page-width by default via <Container>.
 */
export function Section({
  id,
  children,
  labelledBy = true,
  grid = false,
  contained = true,
  connector = false,
  pulse = false,
  className = "",
}: SectionProps) {
  const inner = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy ? `${id}-title` : undefined}
      className={`fx-section ${grid ? "fx-grid-bg" : ""} ${className}`.trim()}
    >
      {connector ? <FlowJoint pulse={pulse} /> : null}
      {inner}
    </section>
  );
}
