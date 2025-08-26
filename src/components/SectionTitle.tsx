import React from "react";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  textColor?: string;
  width?: string;
  paddingY?: string;
  uppercase?: boolean;
}

export default function SectionTitle({
  children,
  className,
  borderColor = "#d00000",
  textColor = "#491000",
  width = "70%",
  paddingY = "20px",
  uppercase = true,
  style,
  ...rest
}: SectionTitleProps) {
  const mergedStyle: React.CSSProperties = {
    borderTop: `3px solid ${borderColor}`,
    borderBottom: `3px solid ${borderColor}`,
    margin: "0 auto",
    width,
    padding: `${paddingY} 0`,
    textTransform: uppercase ? "uppercase" : undefined,
    fontWeight: 800,
    color: textColor,
    ...style,
  };

  const baseClassName = "text-3xl mb-6 sm:text-6xl";

  return (
    <h2
      className={[baseClassName, className].filter(Boolean).join(" ")}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </h2>
  );
}
