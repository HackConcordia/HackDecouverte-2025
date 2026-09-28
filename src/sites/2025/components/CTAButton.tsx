import React from "react";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <a
      href={href}
      className="block py-3 bg-[#b4ebc9] text-[#107475] rounded-sm lg:rounded-full shadow hover:bg-[#f9c22f] mx-auto border-3 border-[#107475] text-xs sm:text-xl w-full max-w-sm lg:max-w-md mb-2 lg:mb-4"
      style={{
        fontWeight: 800,
        textAlign: "center",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}
