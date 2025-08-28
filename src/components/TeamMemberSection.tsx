'use client';

import { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaGlobe } from "react-icons/fa";
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export const teamsSectionText = {
    title: "Hive keepers",
    description: "Meet the dedicated team behind Conuhacks, working tirelessly to bring you the best hackathon experience.",
    legacyTeams: "Legacy Teams",

}

export type TeamMember = {
    id: number;
    name: string;
    position: string;
    intro: string;
    imageSrc: string;
    socials?: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        website?: string;
    };
};

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Bertin Mihigo Sano",
        position: "Co-President",
        intro: "COEN student and co-president of HackConcordia.",
        imageSrc: "/images/team/Bertin.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/sanobertin/",
            github: "https://github.com/sanobertin",
        }
    },
    {
        id: 2,
        name: "Elizabeth Wong",
        position: "Co-President",
        intro: "Bachelor Computer Science Student with a Joint Major in Data Science student and co-president of HackConcordia.",
        imageSrc: "/images/team/liz.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/e-lizabethwong/",
            github: "https://github.com/e-lizabethwong",
        }
    },
    {
        id: 3,
        name: "Mohammed Huzaifa",
        position: "Vice President of Technology",
        intro: "Master of Applied Computer Science student passionate about full-stack development and building impactful tech solutions.",
        imageSrc: "/images/team/mohammed_huzaifa.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/huzaifa-anjum/",
            github: "https://github.com/mhuzaifa",
            instagram: "https://www.instagram.com/_huzaifaanjum_/",
            website: "https://huzaifaanjumportfolio.web.app/"
        }
    },
    {
        id: 4,
        name: "Masoumeh Farokhpour (Maryam)",
        position: "Director of Technology",
        intro: "MACS student with a strong interest in innovative software development and collaborative tech projects.",
        imageSrc: "/images/team/masoumeh_farokhpour.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/masoumeh-farokhpour",
            github: "https://github.com/MasoumehF",
            instagram: "https://www.instagram.com/themaryaam"
        }
    },
    {
        id: 5,
        name: "Sabine Hleiss",
        position: "Director of Sponsorship",
        intro: "COEN student committed to fostering strong partnerships and sponsor relationships for impactful events.",
        imageSrc: "/images/team/sabine_hleiss.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/sabinehleiss/"
        }
    },
    {
        id: 6,
        name: "Matthew Lucas Santiago",
        position: "Director of Marketing",
        intro: "SOEN student with a drive for impactful communication and outreach.",
        imageSrc: "/images/team/matthew_lucas_santiago.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/matthew-lucas-santiago"
        }
    },
    {
        id: 7,
        name: "Elba Lucia Jimenez",
        position: "Vice President of Marketing",
        intro: "CompSci student dedicated to promoting events and creating vibrant community connections.",
        imageSrc: "/images/team/elba_lucia_jimenez.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/elba-lucia-jimenez-296b0b152/"
        }
    },
    {
        id: 8,
        name: "Johnny Dang",
        position: "Director of Technology",
        intro: "SOEN student with an interest in cutting-edge technologies and efficient problem-solving.",
        imageSrc: "/images/team/johnny_dang.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/johnnydang22/"
        }
    },
    {
        id: 9,
        name: "Christina Alexandrakis",
        position: "Director of Marketing",
        intro: "SOEN student passionate about creative marketing campaigns and community engagement.",
        imageSrc: "/images/team/christina_alexandrakis.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/christina-alexandrakis-2590b2338"
        }
    },
    {
        id: 10,
        name: "Louay Helou",
        position: "Director of Technology",
        intro: "BCompSc student passionate about Coding.",
        imageSrc: "/images/team/Louay.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/christina-alexandrakis-2590b2338"
        }
    },
    {
        id: 11,
        name: "Valeria Rosca",
        position: "Director of Sponsorship",
        intro: "SOEN student with a passion for connecting with partners and creating mutually beneficial collaborations.",
        imageSrc: "/images/team/valeria_rosca.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/valeria-rosca"
        }
    },
    {
        id: 12,
        name: "Mohamad Addasi",
        position: "Director of Technology",
        intro: "SOEN student focused on scalable, efficient software engineering and emerging technologies.",
        imageSrc: "/images/team/mohamad_addasi.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/mohamad-addasi",
            github: "https://github.com/Moe1177"
        }
    },
    {
        id: 13,
        name: "Tiffany Andriamiharimanana",
        position: "Director of Technology",
        intro: "SOEN student passionate about software development and inclusive tech communities.",
        imageSrc: "/images/team/tiffany_andriamiharimanana.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/tiffany-soa-andriamiharimanana/"
        }
    },
    {
        id: 14,
        name: "Mridani Kashyap (Dani)",
        position: "Director of Marketing",
        intro: "Marketing student passionate about creative storytelling and audience engagement.",
        imageSrc: "/images/team/mridani_kashyap.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/mridani-kashyap"
        }
    },
    {
        id: 15,
        name: "Alisa Ignatina",
        position: "Director of Events",
        intro: "Data Science student passionate about designing engaging, memorable experiences for participants.",
        imageSrc: "/images/team/alisa_ignatina.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/alisa-ignatina",
            github: "https://github.com/alisaign",
            instagram: "https://www.instagram.com/alisaa_ign?igsh=dDRpcW0ydmI0d2Fp"
        }
    },
    {
        id: 16,
        name: "Huseyin Pilavci",
        position: "Director of Logistics",
        intro: "BCompSc student dedicated to seamless event planning and operational efficiency.",
        imageSrc: "/images/team/huseyin_pilavci.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/huseyin-pilavci"
        }
    },
    {
        id: 17,
        name: "Janani Thiyagarajah",
        position: "Director of Marketing",
        intro: "Industrial Engineering student focused on impactful brand strategies and outreach.",
        imageSrc: "/images/team/janani_thiyagarajah.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/janani-thiyagarajah"
        }
    },
    {
        id: 18,
        name: "Mijan Ullah",
        position: "Director of Technology",
        intro: "SOEN student focused on backend development.",
        imageSrc: "/images/team/mijan.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/mijan-ullah-4b99b3298/",
            github: "https://github.com/mijanullah12",
        }
    },
    {
        id: 19,
        name: "Subaanky Krishnapillai",
        position: "Director of Sponsorship",
        intro: "SOEN student working to strengthen corporate relationships and ensure event success.",
        imageSrc: "/images/team/subaanky_krishnapillai.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/subaankykrishnapillai",
            github: "http://github.com/Subaanky"
        }
    }
];

export default function TeamMemberSection() {
    const [selected, setSelected] = useState<TeamMember>(teamMembers[0]);
    const [hovered, setHovered] = useState<TeamMember | null>(null);

    // Show hovered member if it's not the selected one
    const displayMember = hovered && hovered.id !== selected.id ? hovered : selected;

    return (
        <>
            <section className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto">
                <div className="flex flex-col-reverse items-start text-white">
                    {/* Left Panel: Displayed Member Details */}
                    <div className="flex flex-col items-start p-4 border-[#9cccae] border-4 bg-[#ffec97dc] rounded-sm shadow-lg w-full mb-4 h-[157px]">
                        <h3 className="text-xl text-[#491000] font-bold">{displayMember.name}</h3>
                        <p className="text-gray-800 mb-1">{displayMember.position}</p>

                        <div className="flex space-x-3 mb-2">
                            {displayMember.socials?.linkedin && (
                                <a href={displayMember.socials.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                                    <FaLinkedin className="w-5 h-5 text-[#491000]" />
                                </a>
                            )}
                            {displayMember.socials?.github && (
                                <a href={displayMember.socials.github} target="_blank" rel="noreferrer" title="Github">
                                    <FaGithub className="w-5 h-5 text-[#491000]" />
                                </a>
                            )}
                            {displayMember.socials?.instagram && (
                                <a href={displayMember.socials.instagram} target="_blank" rel="noreferrer" title="Instagram">
                                    <FaInstagram className="w-5 h-5 text-[#491000]" />
                                </a>
                            )}
                            {displayMember.socials?.website && (
                                <a href={displayMember.socials.website} target="_blank" rel="noreferrer" title="Portfolio">
                                    <FaGlobe className="w-5 h-5 text-[#491000]" />
                                </a>
                            )}
                        </div>


                        <p className="text-gray-500 text-left text-sm">{displayMember.intro}</p>
                    </div>

                    {/* Right Panel: Scrollable Team Avatars */}
                    <div className="w-full overflow-x-auto">
                        <div className="flex w-100 pb-4">
                            {teamMembers.map((member) => {
                                const isSelected = selected.id === member.id;

                                return (
                                    <div
                                        key={member.id}
                                        onClick={() => setSelected(member)}
                                        onMouseEnter={() => setHovered(member)}
                                        onMouseLeave={() => setHovered(null)}
                                        className={`relative transition-all duration-300 ease-in-out
                                        ${isSelected ? 'border-4 border-[#9cccae]' : 'border-transparent'}
                                    `}
                                        style={{
                                            minWidth: hovered?.id === member.id || isSelected ? '250px' : '150px',
                                            maxWidth: '',
                                            height: '400px',
                                        }}
                                    >
                                        <Image
                                            src={member.imageSrc}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}