"use client";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("FAQSection");
  // Use t.raw to get the questions object, then convert to array
  const faqsObj = t.raw("questions") as Record<string, { question: string; answer: string }>;
  const faqs: Array<{ question: string; answer: string }> = Object.values(faqsObj);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 max-w-7xl mx-auto px-4">
      <SectionTitle>{t("title")}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border-4 border-[#412721] rounded-xs shadow hover:shadow-lg transition h-fit bg-[#FFEC9799]"
          >
            <button
              className="w-full flex justify-between items-center text-left bg-[#412721] text-white p-4"
              onClick={() => toggleFAQ(idx)}
            >
              <h3 className="text-base lg:text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
            </button>

            {/* Smooth transition wrapper */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-gray-700 px-4 pb-4 pt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
