import React from "react";

type PromoCardProps = {
  title: React.ReactNode;
  body?: React.ReactNode;
  cta?: React.ReactNode;
};

export default function PromoCard({ title, body, cta }: PromoCardProps) {
  return (
    <section
      style={{
        margin: "0 auto",
        marginTop: "40px",
        border: "3px solid #b4ebc9",
        width: "50%",
        paddingBottom: "20px",
      }}
    >
      <section
        className="text-left"
        style={{
          backgroundColor: "#412721",
          padding: "10px 0",
          borderBottom: "3px solid #b4ebc9",
        }}
      >
        <h2
          className="text-xl text-[#f9c22f] mx-auto"
          style={{ fontWeight: 800, padding: "0 20px" }}
        >
          {title}
        </h2>
      </section>

      {body && (
        <section
          className="text-left"
          style={{
            paddingBottom: "0px",
          }}
        >
          <p
            className=" mx-auto text-lg text-gray-700 mb-6"
            style={{
              padding: "20px",
              fontSize: "19px",
            }}
          >
            {body}
          </p>
        </section>
      )}

      {cta}
    </section>
  );
}
