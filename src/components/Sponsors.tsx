export default function Sponsors() {
  return (
    <section id="sponsors" className="py-20 bg-white text-center">
      <h2
        className="text-3xl mb-6 text-[#491000] sm:text-6xl"
        style={{
          borderTop: "3px solid #d00000",
          borderBottom: "3px solid #d00000",
          margin: "0 auto",
          width: "70%",
          padding: "20px 0",
          justifyContent: "center",
          textTransform: "uppercase",
          fontWeight: 800,
        }}
      >
        Sponsors
      </h2>
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
            SUPPORT THE NEXT GENERATION OF BUILDERS
          </h2>
        </section>

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
            We're launching our first edition &#8212; and we want to do it with
            the support of industry leaders. Be part of a high-impact event
            empowering young talent.
          </p>
        </section>
        <a
          href="#"
          className="block py-3 bg-[#b4ebc9] text-[#107475] rounded-full shadow hover:bg-[#f9c22f] w-fit mx-auto mb-4 border-3 border-[#107475] text-xs sm:text-xl"
          style={{
            fontWeight: 800,
            width: "60%",
          }}
        >
          BECOME A SPONSOR!
        </a>
      </section>
    </section>
  );
}
