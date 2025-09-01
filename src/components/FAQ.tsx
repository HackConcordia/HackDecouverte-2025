"use client";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { useTranslation } from "@/i18n/TranslationContext";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqKeys = Array.from({ length: 14 }, (_, i) => `q${i + 1}`);
  
  
  const faqs = faqKeys.map((key) => ({
    // @ts-expect-error: We're using dynamic keys that aren't part of the type system
    question: t(`faq.queries.${key}.question`),
    // @ts-expect-error: We're using dynamic keys that aren't part of the type system
    answer: t(`faq.queries.${key}.answer`),
  }));

  return (
    <section id="faq" className="py-20 max-w-7xl mx-auto px-4">
      <SectionTitle>{t("faq.heading")}</SectionTitle>
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
              <h3 className="text-base lg:text-lg font-semibold">
                {faq.question}
              </h3>
              <span className="text-xl">{openIndex === idx ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
