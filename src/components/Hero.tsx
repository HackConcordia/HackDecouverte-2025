import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative mt-10 sm:mt-0 min-h-screen flex flex-col items-center md:justify-center text-center max-w-7xl mx-auto px-4">

            {/* Title */}
            <h1 className="relative text-4xl sm:text-6xl md:text-8xl font-extrabold pt-4 lg:pt-6 pb-4
                            mb-6 tracking-tight drop-shadow-lg w-full
                            border-t-4 border-b-4 border-[#D00000] text-[#491000]
                            font-['Archivo Black']">
                HACK DÉCOUVERTE
            </h1>

            {/* Subtitle */}
            <p className="relative text-sm md:text-xl max-w-4xl mb-2 font-bold">
                A bilingual, beginner-friendly hackathon for pre-university students across Québec.
            </p>
            <p className="relative text-xs md:text-sm lg:text-base mb-4 font-bold px-20 lg:px-0 mt-1 lg:mt-0">
                November 15, 2025 • Concordia University, Montréal
            </p>

            <a
                href="#register"
                className="block py-3 px-5 text-center bg-[#491000] text-white font-bold rounded-sm shadow hover:bg-[#320b00] transition"
            >
                REGISTER NOW
            </a>

            {/* HackConcordia credit */}
            <p className="mt-6 lg:mt-4 text-sm sm:text-base text-gray-800">
                Brought to you by{" "}
                <a
                    href="https://www.hackconcordia.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#491000] hover:underline"
                >
                    HackConcordia
                </a>
            </p>

            {/* Spacer to push bottom */}
            <div className="mb-100 sm:mb-100 md:mb-100 lg:mb-70" />
            <Image
                src="/images/globe.png"
                alt="HackConcordia Logo"
                width={450}
                height={350}
                className="absolute hidden lg:block bottom-0 right-0 mb-4"
            />
            <Image
                src="/images/globe.png"
                alt="HackConcordia Logo"
                width={280}
                height={200}
                className="absolute lg:hidden block bottom-20 right-0 mb-4"
            />
            <Image
                src="/images/star.png"
                alt="HackConcordia Logo"
                width={130}
                height={90}
                className="absolute hidden lg:block bottom-20 left-0 lg:bottom-70 md:left-10 lg:left-45 mb-4"
            />
            <Image
                src="/images/star.png"
                alt="HackConcordia Logo"
                width={100}
                height={80}
                className="absolute block lg:hidden bottom-55 left-5 lg:bottom-70 md:left-10 lg:left-45 mb-4"
            />
            <Image
                src="/images/stars.png"
                alt="HackConcordia Logo"
                width={60}
                height={60}
                className="absolute hidden md:block bottom-40 lg:left-100 mb-4"
            />
            <Image
                src="/images/stars.png"
                alt="HackConcordia Logo"
                width={60}
                height={60}
                className="absolute hidden md:block bottom-70 lg:right-120 mb-4 ml-4"
            />
        </section>
    );
}
