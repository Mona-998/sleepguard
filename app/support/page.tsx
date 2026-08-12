import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import FAQAccordion from "../components/FAQAccordion";

const faqs = [
  {
    question: "How do I set up my Sleep Guard device?",
    answer:
      "Scan the QR code printed on the box with your phone's camera. It opens a setup page where you'll enter your details and the device's serial number, then confirm your Wi-Fi connection to finish pairing.",
  },
  {
    question: "Do I need to wear anything to use Sleep Guard?",
    answer:
      "No. The sensor sits near your bed rather than attaching to your body, so there's nothing uncomfortable to wear overnight.",
  },
  {
    question: "What happens if the device detects a breathing pause?",
    answer:
      "It sounds an alarm to wake you immediately. If there's no response within a short window, it automatically sends an alert with your location to emergency services.",
  },
  {
    question: "Can my doctor or family see my data?",
    answer:
      "Yes — from your dashboard you can invite your physician and family members to view your nightly readings and event history.",
  },
  {
    question: "Where is Sleep Guard currently available?",
    answer: "Sleep Guard currently ships to addresses within the United Arab Emirates.",
  },
];

export default function SupportPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" aria-label="Home" className="hover:text-gray-800 transition">
            <Home size={14} />
          </Link>
          <ChevronRight size={12} />
          <span>Support</span>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Frequently asked questions
        </h1>
        <div className="w-14 h-1 bg-brand-yellow mx-auto mb-4" />
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        <FAQAccordion faqs={faqs} />
      </section>
    </div>
  );
}
