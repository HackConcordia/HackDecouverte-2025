/* =========================================================================
   CTAButton
   variant="sticky" → yellow sticky note with tape (hero "Register now")
   variant="pill"   → black rounded button with an arrow (footer poster)
   disabled         → renders a non-interactive <span> instead of a link
   ========================================================================= */

import { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "sticky" | "pill";
  className?: string;
  disabled?: boolean;
};

export default function CTAButton({ href, children, variant = "sticky", className = "", disabled = false }: CTAButtonProps) {
  const Tag = disabled ? "span" : "a";
  const linkProps = disabled ? { "aria-disabled": true } : { href };
  const classes = `${variant === "pill" ? "btn" : "sticky"} ${disabled ? "is-disabled" : ""} ${className}`;

  if (variant === "pill") {
    return (
      <Tag {...linkProps} className={classes}>
        <span>{children}</span>
        <i aria-hidden="true">›</i>
      </Tag>
    );
  }

  return (
    <Tag {...linkProps} className={classes}>
      {children}
    </Tag>
  );
}
