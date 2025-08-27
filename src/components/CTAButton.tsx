import React from "react";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <a
      href={href}
      className="block py-3 bg-[#b4ebc9] text-[#107475] rounded-full shadow hover:bg-[#f9c22f] w-fit mx-auto mb-4 border-3 border-[#107475] text-xs sm:text-xl"
      style={{
        fontWeight: 800,
        width: "60%",
        textAlign: "center",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}
