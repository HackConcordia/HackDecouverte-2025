/* =========================================================================
   CTAButton
   variant="sticky" → yellow sticky note with tape (hero "Register now")
   variant="pill"   → black rounded button with an arrow (footer poster)
   ========================================================================= */

import { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "sticky" | "pill";
  className?: string;
};

export default function CTAButton({ href, children, variant = "sticky", className = "" }: CTAButtonProps) {
  if (variant === "pill") {
    return (
      <a href={href} className={`btn ${className}`}>
        <span>{children}</span>
        <i aria-hidden="true">›</i>
      </a>
    );
  }

  return (
    <a href={href} className={`sticky ${className}`}>
      {children}
    </a>
  );
}
