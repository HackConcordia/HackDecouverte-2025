import React from "react";

type PromoCardProps = {
  title: React.ReactNode;
  body?: React.ReactNode;
  cta?: React.ReactNode;
};

export default function PromoCard({ title, body, cta, ...props }: PromoCardProps) {
  return (
    <section
      {...props}
      style={{
        border: "5px solid #9cccae",
        backgroundColor: "#ffec97dc",
      }}
      className="max-w-3xl rounded-sm shadow-lg pb-4"
    >
      <section
        className="text-left"
        style={{
          backgroundColor: "#412721",
          padding: "10px 0",
          borderBottom: "5px solid #b4ebc9",
        }}
      >
        <h2
          className="text-lg lg:text-xl text-[#f9c22f] mx-auto"
          style={{ fontWeight: 800, padding: "0 20px" }}
        >
          {title}
        </h2>
      </section>

      {body && (
        <section
          className="text-left"
        >
          <p
            className={`mx-auto text-sm text-gray-700 ${cta ? "mb-2 lg:mb-6" : ""}`}
            style={{
              padding: "20px",
            }}
          >
            {body}
          </p>
          {cta}
        </section>
      )}
    </section>
  );
}
