"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is HackDécouverte?",
    answer:
      "HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec. Participants form teams and build innovative hardware or software prototypes to solve real-world problems.",
  },
  {
    question: "Who can participate?",
    answer:
      "Pre-university students (CEGEP and equivalent) from across Québec. No prior hackathon experience is required!",
  },
  {
    question: "Is there a registration fee?",
    answer: "No, participation is completely free!",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "Not at all! HackDécouverte is designed for beginners. We’ll have workshops and mentors to guide you through the process.",
  },
  {
    question: "What is the team size?",
    answer:
      "Teams can have up to 5 members. Don’t worry if you don’t have a team—we’ll help you find one during the event.",
  },
  {
    question: "What is the event format?",
    answer:
      "The hackathon is in-person at Concordia University. It includes workshops, a campus tour, coding sessions, career talks, fairs, and a final project showcase with prizes.",
  },
  {
    question: "Are meals provided?",
    answer: "Yes! Breakfast, lunch, and dinner are included during the hackathon.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, student ID, and lots of enthusiasm! We’ll provide food, workspace, and WiFi.",
  },
  {
    question: "What can I win?",
    answer:
      "Winning teams will be rewarded with prizes, and all participants will gain valuable experience, mentorship, and networking opportunities.",
  },
  {
    question: "Will there be support during the hackathon?",
    answer:
      "Yes! Mentors and volunteers will be available to help you with coding, design, and brainstorming throughout the event.",
  },
  {
    question: "How do I register?",
    answer:
      "Registration will be available on the HackConcordia website. Keep an eye on our social media for updates.",
  },
  {
    question: "What is HackConcordia?",
    answer:
      "HackConcordia is a student-run organization at Concordia University that organizes events like HackDécouverte and ConUHacks, Montréal’s largest student-run hackathon. We aim to foster innovation, collaboration, and learning in the tech community.",
  },
  {
    question: "What other events does HackConcordia run?",
    answer:
      "Besides HackDécouverte, HackConcordia hosts ConUHacks (our flagship hackathon), coding workshops, industry panels, and networking events to help students learn and connect with professionals.",
  },
  {
    question: "Can I join HackConcordia?",
    answer:
      "Yes! HackConcordia is always looking for passionate students to join as volunteers, organizers, or team members. It's a great way to gain experience, meet people, and contribute to the tech community at Concordia.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-6 shadow hover:shadow-lg transition h-fit"
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => toggleFAQ(idx)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <p className="text-gray-700 mt-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
