import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";
import TeamMemberSection from "./TeamMemberSection";

export default function AboutUs() {
    const cards = [
        {
            title: "Innovation",
            description: "Empowering students to create impactful solutions and explore new technologies."
        },
        {
            title: "Collaboration",
            description: "Connecting brilliant minds from diverse backgrounds to work on exciting projects."
        },
        {
            title: "Learning",
            description: "Providing a platform to grow skills, gain experience, and turn ideas into reality."
        },
    ];

    return (
        <section id="about-us" className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 py-20">
            <SectionTitle>About Us</SectionTitle>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                {/* Left Column: Cards */}
                <div className="space-y-6">
                    {cards.map((card, index) => (
                        <PromoCard
                            key={index}
                            title={card.title}
                            body={card.description}
                        />
                    ))}
                </div>

                {/* Right Column: Team Members */}
                <div className="">
                    <TeamMemberSection />
                </div>
            </div>
        </section>
    );
}
