import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  /** Sets the heading id (used by Section's aria-labelledby). */
  titleId?: string;
  lede?: ReactNode;
  align?: "left" | "center";
};

export function SectionHead({ index, label, title, titleId, lede, align = "left" }: Props) {
  const centered = align === "center";

  return (
    <header className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal className="flex items-center gap-3" as="div">
        <span
          className={`flex items-center gap-3 ${centered ? "mx-auto" : ""}`}
        >
          <span className="fx-mono text-signal">{index}</span>
          <span aria-hidden className="h-px w-8 bg-[var(--fx-line-strong)]" />
          <span className="fx-mono text-ink-muted">{label}</span>
        </span>
      </Reveal>

      <Reveal delay={70}>
        <h2 id={titleId} className="fx-h2 mt-5 text-ink">
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={130}>
          <p className={`fx-lede mt-4 ${centered ? "mx-auto max-w-xl" : ""}`}>
            {lede}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
