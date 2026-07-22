import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = AsLink | AsButton;

/**
 * Button primitive. Renders a real <a> when given an href, otherwise a
 * <button> — so links stay links and controls stay controls. Visual style is
 * owned by the `.fx-btn` classes in globals.css.
 */
export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const cls = `fx-btn fx-btn--${variant} ${className}`.trim();

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { type, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type ?? "button"} className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
