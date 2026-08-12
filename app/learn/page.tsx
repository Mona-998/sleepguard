import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import OrderNowButton from "../components/OrderNowButton";

export default function LearnPage() {
  return (
    <div>
      <Breadcrumb />
      <Hero />
      <WhatToKnow />
      <Steps />
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link href="/" aria-label="Home" className="hover:text-gray-800 transition">
          <Home size={14} />
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-700">Learn</span>
        <ChevronRight size={12} />
        <span>Sleep Guard Basics</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-yellow to-brand-yellow/10 py-16 max-w-7xl mx-auto rounded-3xl my-6 px-2">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Sleep Guard basics</h1>
          <p className="text-black/80 leading-relaxed max-w-md mb-6">
            Getting started is about to be easy. Here, you&apos;ll discover just how
            simple Sleep Guard is to set up, pair, and start using tonight.
          </p>
          <OrderNowButton />
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/phone-reading.png"
            alt="Sleep Guard app showing a breathing-rate reading"
            width={462}
            height={978}
            className="w-40 md:w-48 h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

function WhatToKnow() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3">What you need to know.</h2>
      <div className="w-14 h-1 bg-brand-yellow mx-auto mb-6" />
      <p className="text-gray-700 leading-relaxed">
        Pairing your new device is a lot easier than you might think — and it takes
        less than five minutes. So why wait another moment? Let&apos;s get started.
      </p>
    </section>
  );
}

const steps = [
  {
    image: "/images/pair-step-1.png",
    title: "Step 1",
    text: "Scan the QR code printed on your device box.",
  },
  {
    image: "/images/pair-step-2.png",
    title: "Step 2",
    text: "Enter the serial number on your device — it starts with SPG-XXX.",
  },
  {
    image: "/images/pair-step-3.png",
    title: "Step 3",
    text: "Confirm your Wi-Fi connection — your device is now paired.",
  },
];

function Steps() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">
        Ready to pair? Just follow these three steps:
      </h2>
      <div className="w-14 h-1 bg-brand-yellow mx-auto my-6" />

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="rounded-lg overflow-hidden mb-4 h-40 flex items-center justify-center bg-brand-yellow/10">
              <Image
                src={step.image}
                alt={step.title}
                width={402}
                height={451}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="border-t-2 border-black/80 pt-3">
              <h3 className="font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-gray-700">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
