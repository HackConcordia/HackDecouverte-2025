'use client';

import { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaGlobe } from "react-icons/fa";
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const teamsSectionText = {
    title: "Hive keepers",
    description: "Meet the dedicated team behind Conuhacks, working tirelessly to bring you the best hackathon experience.",
    legacyTeams: "Legacy Teams",

}

export type TeamMember = {
    id: number;
    name: string;
    positionKey: string;
    introKey: string;
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
        positionKey: "coPresident",
        introKey: "1.intro",
        imageSrc: "/images/team/Bertin.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/sanobertin/",
            github: "https://github.com/sanobertin",
        }
    },
    {
        id: 2,
        name: "Elizabeth Wong",
        positionKey: "coPresident",
        introKey: "2.intro",
        imageSrc: "/images/team/liz.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/e-lizabethwong/",
            github: "https://github.com/e-lizabethwong",
        }
    },
    {
        id: 3,
        name: "Mohammed Huzaifa",
        positionKey: "3.position",
        introKey: "3.intro",
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
        positionKey: "techDirector",
        introKey: "4.intro",
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
        positionKey: "sponsorDirector",
        introKey: "5.intro",
        imageSrc: "/images/team/sabine_hleiss.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/sabinehleiss/"
        }
    },
    {
        id: 6,
        name: "Matthew Lucas Santiago",
        positionKey: "marketingDirector",
        introKey: "6.intro",
        imageSrc: "/images/team/matthew_lucas_santiago.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/matthew-lucas-santiago"
        }
    },
    {
        id: 7,
        name: "Elba Lucia Jimenez",
        positionKey: "7.position",
        introKey: "7.intro",
        imageSrc: "/images/team/elba_lucia_jimenez.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/elba-lucia-jimenez-296b0b152/"
        }
    },
    {
        id: 8,
        name: "Johnny Dang",
        positionKey: "techDirector",
        introKey: "8.intro",
        imageSrc: "/images/team/johnny_dang.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/johnnydang22/"
        }
    },
    {
        id: 9,
        name: "Christina Alexandrakis",
        positionKey: "marketingDirector",
        introKey: "9.intro",
        imageSrc: "/images/team/christina_alexandrakis.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/christina-alexandrakis-2590b2338"
        }
    },
    {
        id: 10,
        name: "Louay Helou",
        positionKey: "techDirector",
        introKey: "10.intro",
        imageSrc: "/images/team/Louay.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/christina-alexandrakis-2590b2338"
        }
    },
    {
        id: 11,
        name: "Valeria Rosca",
        positionKey: "sponsorDirector",
        introKey: "11.intro",
        imageSrc: "/images/team/valeria_rosca.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/valeria-rosca"
        }
    },
    {
        id: 12,
        name: "Mohamad Addasi",
        positionKey: "techDirector",
        introKey: "12.intro",
        imageSrc: "/images/team/mohamad_addasi.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/mohamad-addasi",
            github: "https://github.com/Moe1177"
        }
    },
    {
        id: 13,
        name: "Tiffany Andriamiharimanana",
        positionKey: "techDirector",
        introKey: "13.intro",
        imageSrc: "/images/team/tiffany_andriamiharimanana.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/tiffany-soa-andriamiharimanana/"
        }
    },
    {
        id: 14,
        name: "Mridani Kashyap (Dani)",
        positionKey: "marketingDirector",
        introKey: "14.intro",
        imageSrc: "/images/team/mridani_kashyap.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/mridani-kashyap"
        }
    },
    {
        id: 15,
        name: "Alisa Ignatina",
        positionKey: "eventsDirector",
        introKey: "15.intro",
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
        positionKey: "logisticsDirector",
        introKey: "16.intro",
        imageSrc: "/images/team/huseyin_pilavci.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/huseyin-pilavci"
        }
    },
    {
        id: 17,
        name: "Janani Thiyagarajah",
        positionKey: "marketingDirector",
        introKey: "17.intro",
        imageSrc: "/images/team/janani_thiyagarajah.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/janani-thiyagarajah"
        }
    },
    {
        id: 18,
        name: "Mijan Ullah",
        positionKey: "techDirector",
        introKey: "18.intro",
        imageSrc: "/images/team/mijan.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/mijan-ullah-4b99b3298/",
            github: "https://github.com/mijanullah12",
        }
    },
    {
        id: 19,
        name: "Subaanky Krishnapillai",
        positionKey: "sponsorDirector",
        introKey: "19.intro",
        imageSrc: "/images/team/subaanky_krishnapillai.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/subaankykrishnapillai",
            github: "http://github.com/Subaanky"
        }
    },
    {
        id: 20,
        name: "Steven Lam",
        positionKey: "sponsorDirector",
        introKey: "20.intro",
        imageSrc: "/images/team/Steven.jpeg",
        socials: {
            linkedin: "https://www.linkedin.com/in/steven-lam12/"
        }
    }, 
    {
        id: 21,
        name: "Marilyne Nguyen",
        positionKey: "techDirector",
        introKey: "21.intro",
        imageSrc: "/images/team/Marilyne.jpeg",
        socials: {
            linkedin: "https://www.linkedin.com/in/marilyne-nguyen1515/",
            github: "https://github.com/marilynenguyen"
        }
    }, 
    {
        id: 22,
        name: "Hajar Blahmam",
        positionKey: "eventsDirector",
        introKey: "22.intro",
        imageSrc: "/images/team/Hajar.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/hblahmam721/"
        }
    }, 
    {
        id: 23,
        name: "Toby Fischer",
        positionKey: "logisticsDirector",
        introKey: "23.intro",
        imageSrc: "/images/team/Toby.jpg",
        socials: {
            linkedin: ""
        }
    }
];

export default function TeamMemberSection() {
    const [selected, setSelected] = useState<TeamMember>(teamMembers[0]);
    const [hovered, setHovered] = useState<TeamMember | null>(null);
    const t = useTranslations("TeamMemberSection");

    // Show hovered member if it's not the selected one
    const displayMember = hovered && hovered.id !== selected.id ? hovered : selected;
    // Get translated position and intro using keys
    const translatedPosition = t(displayMember.positionKey);
    const translatedIntro = t(displayMember.introKey);
    return (
        <>
            <section className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto">
                <div className="flex flex-col-reverse items-start text-white">
                    {/* Left Panel: Displayed Member Details */}
                    <div className="flex flex-col items-start p-4 border-[#9cccae] border-4 bg-[#ffec97dc] rounded-sm shadow-lg w-full mb-4 h-[157px]">
                        <h3 className="text-lg md:text-xl text-[#491000] font-bold">{displayMember.name}</h3>
                        <p className="text-sm md:text-base text-gray-800 mb-1">{translatedPosition}</p>

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


                        <p className="text-gray-500 text-left text-xs md:text-sm">{translatedIntro}</p>
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