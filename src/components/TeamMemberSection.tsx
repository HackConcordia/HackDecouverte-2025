'use client';

import { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaGlobe } from "react-icons/fa";
import Image from 'next/image';
import { useTranslation } from '@/i18n/TranslationContext';

type TeamMember = {
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

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Elizabeth Wong",
        position: "team.members.1.position",
        intro: "team.members.1.intro",
        imageSrc: "/images/team/liz.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/e-lizabethwong/",
            github: "https://github.com/e-lizabethwong",
        },
    },
    {
        id: 2,
        name: "Bertin Mihigo Sano",
        position: "team.members.2.position",
        intro: "team.members.2.intro",
        imageSrc: "/images/team/Bertin.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/sanobertin/",
            github: "https://github.com/sanobertin",
        },
    },
    {
        id: 3,
        name: "Mohammed Huzaifa",
        position: "team.members.3.position",
        intro: "team.members.3.intro",
        imageSrc: "/images/team/mohammed_huzaifa.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/huzaifa-anjum/",
            github: "https://github.com/mhuzaifa",
            instagram: "https://www.instagram.com/_huzaifaanjum_/",
            website: "https://huzaifaanjumportfolio.web.app/",
        },
    },
    {
        id: 4,
        name: "Masoumeh Farokhpour (Maryam)",
        position: "team.members.4.position",
        intro: "team.members.4.intro",
        imageSrc: "/images/team/masoumeh_farokhpour.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/masoumeh-farokhpour",
            github: "https://github.com/MasoumehF",
            instagram: "https://www.instagram.com/themaryaam",
        },
    },
    {
        id: 5,
        name: "Sabine Hleiss",
        position: "team.members.5.position",
        intro: "team.members.5.intro",
        imageSrc: "/images/team/sabine_hleiss.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/sabinehleiss/",
        },
    },
    {
        id: 6,
        name: "Matthew Lucas Santiago",
        position: "team.members.6.position",
        intro: "team.members.6.intro",
        imageSrc: "/images/team/matthew_lucas_santiago.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/matthew-lucas-santiago",
        },
    },
    {
        id: 7,
        name: "Elba Lucia Jimenez",
        position: "team.members.7.position",
        intro: "team.members.7.intro",
        imageSrc: "/images/team/elba_lucia_jimenez.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/elba-lucia-jimenez-296b0b152/",
        },
    },
    {
        id: 8,
        name: "Johnny Dang",
        position: "team.members.8.position",
        intro: "team.members.8.intro",
        imageSrc: "/images/team/johnny_dang.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/johnnydang22/",
        },
    },
    {
        id: 9,
        name: "Christina Alexandrakis",
        position: "team.members.9.position",
        intro: "team.members.9.intro",
        imageSrc: "/images/team/christina_alexandrakis.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/christina-alexandrakis-2590b2338",
        },
    },
    {
        id: 10,
        name: "Louay Helou",
        position: "team.members.10.position",
        intro: "team.members.10.intro",
        imageSrc: "/images/team/Louay.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/christina-alexandrakis-2590b2338",
        },
    },
    {
        id: 11,
        name: "Valeria Rosca",
        position: "team.members.11.position",
        intro: "team.members.11.intro",
        imageSrc: "/images/team/valeria_rosca.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/valeria-rosca",
        },
    },
    {
        id: 12,
        name: "Mohamad Addasi",
        position: "team.members.12.position",
        intro: "team.members.12.intro",
        imageSrc: "/images/team/mohamad_addasi.jpg",
        socials: {
            linkedin: "https://linkedin.com/in/mohamad-addasi",
            github: "https://github.com/Moe1177",
        },
    },
    {
        id: 13,
        name: "Tiffany Andriamiharimanana",
        position: "team.members.13.position",
        intro: "team.members.13.intro",
        imageSrc: "/images/team/tiffany_andriamiharimanana.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/tiffany-soa-andriamiharimanana/",
        },
    },
    {
        id: 14,
        name: "Mridani Kashyap (Dani)",
        position: "team.members.14.position",
        intro: "team.members.14.intro",
        imageSrc: "/images/team/mridani_kashyap.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/mridani-kashyap",
        },
    },
    {
        id: 15,
        name: "Alisa Ignatina",
        position: "team.members.15.position",
        intro: "team.members.15.intro",
        imageSrc: "/images/team/alisa_ignatina.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/alisa-ignatina",
            github: "https://github.com/alisaign",
            instagram: "https://www.instagram.com/alisaa_ign?igsh=dDRpcW0ydmI0d2Fp",
        },
    },
    {
        id: 16,
        name: "Huseyin Pilavci",
        position: "team.members.16.position",
        intro: "team.members.16.intro",
        imageSrc: "/images/team/huseyin_pilavci.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/huseyin-pilavci",
        },
    },
    {
        id: 17,
        name: "Janani Thiyagarajah",
        position: "team.members.17.position",
        intro: "team.members.17.intro",
        imageSrc: "/images/team/janani_thiyagarajah.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/janani-thiyagarajah",
        },
    },
    {
        id: 18,
        name: "Mijan Ullah",
        position: "team.members.18.position",
        intro: "team.members.18.intro",
        imageSrc: "/images/team/mijan.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/mijan-ullah-4b99b3298/",
            github: "https://github.com/mijanullah12",
        },
    },
    {
        id: 19,
        name: "Subaanky Krishnapillai",
        position: "team.members.19.position",
        intro: "team.members.19.intro",
        imageSrc: "/images/team/subaanky_krishnapillai.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/subaankykrishnapillai",
            github: "http://github.com/Subaanky",
        },
    },
    {
        id: 20,
        name: "Steven Lam",
        position: "team.members.20.position",
        intro: "team.members.20.intro",
        imageSrc: "/images/team/Steven.jpeg",
        socials: {
            linkedin: "https://www.linkedin.com/in/steven-lam12/"
        },
    },
    {
        id: 21,
        name: "Marilyne Nguyen",
        position: "team.members.21.position",
        intro: "team.members.21.intro",
        imageSrc: "/images/team/Marilyne.jpeg",
        socials: {
             linkedin: "https://www.linkedin.com/in/marilyne-nguyen1515/",
            github: "https://github.com/marilynenguyen"
        },
    },
    {
        id: 22,
        name: "Hajar Blahmam",
        position: "team.members.22.position",
        intro: "team.members.22.intro",
        imageSrc: "/images/team/Hajar.jpg",
        socials: {
            linkedin: "https://www.linkedin.com/in/hblahmam721/"
        },
    },
    {
        id: 23,
        name: "Toby Fischer",
        position: "team.members.23.position",
        intro: "team.members.23.intro",
        imageSrc: "/images/team/Toby.jpg",
        socials: {
            linkedin: ""
        },
    }
];


export default function TeamMemberSection() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<TeamMember>(teamMembers[0]);
    const [hovered, setHovered] = useState<TeamMember | null>(null);

    // Show hovered member if it's not the selected one
    const displayMember = hovered && hovered.id !== selected.id ? hovered : selected;

    return (
        <>
            <section className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto">
                <div className="flex flex-col-reverse items-start text-white"  data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                    {/* Left Panel: Displayed Member Details */}
                    <div className="flex flex-col items-start p-4 border-[#9cccae] border-4 bg-[#ffec97dc] rounded-sm shadow-lg w-full mb-4 h-[157px]">
                        <h3 className="text-lg md:text-lg text-[#491000] font-bold">{displayMember.name}</h3>
                        <p className="text-sm text-gray-800 mb-1">{t(displayMember.position)}</p>

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


                        <p className="text-gray-500 text-left text-xs">{t(displayMember.intro)}</p>
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
                                            height: '350px',
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