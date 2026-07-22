import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** Render as a different element (e.g. "div", "header"). Defaults to div. */
  as?: ElementType;
  className?: string;
};

/**
 * Page-width primitive. Centers content and applies the shared responsive
 * horizontal padding. Every full-width band should wrap its content in one.
 */
export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return <Tag className={`fx-shell ${className}`.trim()}>{children}</Tag>;
}
