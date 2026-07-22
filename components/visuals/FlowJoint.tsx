/**
 * Workflow motif — a section joint.
 *
 * The recurring Forgeonix metaphor: the page is one system, and each section
 * is a stage connected to the next. This renders a thin connective path with a
 * precision node straddling a section's top border, turning every boundary into
 * a workflow joint. Purely decorative-of-structure and aria-hidden.
 *
 * `pulse` adds a single, slow, low-opacity data dot travelling into the node —
 * information moving through the system. It is disabled entirely under
 * prefers-reduced-motion. Kept occasional so the motif connects, never competes.
 */
export function FlowJoint({ pulse = false }: { pulse?: boolean }) {
  return (
    <span aria-hidden className="fx-joint">
      <span className="fx-joint__line" />
      {pulse ? <span className="fx-joint__pulse" /> : null}
      <span className="fx-joint__node" />
    </span>
  );
}
