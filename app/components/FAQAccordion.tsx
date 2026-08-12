"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = { question: string; answer: string };

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold pr-6">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 text-gray-700 leading-relaxed pr-8">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
