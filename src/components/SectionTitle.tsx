import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2
      className="text-2xl lg:text-3xl mb-6 text-[#491000] sm:text-6xl w-full text-center"
      style={{
        borderTop: "3px solid #d00000",
        borderBottom: "3px solid #d00000",
        margin: "0 auto",
        padding: "20px 0",
        justifyContent: "center",
        textTransform: "uppercase",
        fontWeight: 800,
      }}
    >
      {children}
    </h2>
  );
}
