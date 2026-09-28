"use client";

/* =========================================================================
   FAQ
   Street sign that swings in, and brush-stroke questions that open like
   paper notes. The questions and answers live in lib/i18n.tsx (FAQ_TEXT).
   ========================================================================= */

import { useState } from "react";
import { Splats, SplatSpec, useInView } from "../lib/graffiti";
import { useLanguage } from "../lib/i18n";

const FAQ_SPLATS: SplatSpec[] = [
  ["purple", 38, 10, 100],
  ["pink", 95, 4, 90],
  ["yellow", 70, 50, 260],
];

export default function FAQ() {
  const { faq } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();
  const half = Math.ceil(faq.length / 2);

  // Which questions are open (the first one starts open).
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section ref={ref} id="faq" className={`faq brick ${inView ? "in" : ""}`}>
      <Splats splats={FAQ_SPLATS} />

      {/* Street sign */}
      <div className="sign" role="img" aria-label="FAQ">
        <div className="sign-in">
          <div>
            <svg viewBox="0 0 460 90" aria-hidden="true">
              <path d="M0 26 H360 V0 L460 45 L360 90 V64 H0 Z" fill="#d9d9d9" />
            </svg>
            <b>FAQ</b>
          </div>
        </div>
      </div>

      {/* Two independent columns (first half left, second half right) so
          opening a question only pushes down its own column. */}
      <div className="qa-grid">
        {[faq.slice(0, half), faq.slice(half)].map((items, column) => (
          <div key={column} className="qa-col">
            {items.map(([question, answer], i) => {
              const index = column * half + i;
              const isOpen = openItems.has(index);

              return (
                <div key={index} className={`qa ${isOpen ? "open" : ""}`}>
                  <button className="q" aria-expanded={isOpen} onClick={() => toggle(index)}>
                    <span>{question}</span>
                    <i className="plus" aria-hidden="true" />
                  </button>
                  <div className="a">
                    <div>
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
