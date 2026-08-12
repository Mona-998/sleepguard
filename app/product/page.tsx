import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import OrderNowButton from "../components/OrderNowButton";

export default function ProductPage() {
  return (
    <div>
      <Breadcrumb />
      <Hero />
      <RealTimeReadings />
      <HowItHelps />
      <SeeTheImpact />
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link href="/" aria-label="Home" className="hover:text-gray-800 transition">
          <Home size={14} />
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-700">Product</span>
        <ChevronRight size={12} />
        <span>What Is Sleep Guard</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-6">
      {/* Mobile: simple stacked layout — photo on top, text below in normal flow.
          No absolute positioning, so nothing can overflow or clip. */}
      <div className="md:hidden">
        <div className="relative w-full h-[280px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/hero-bedroom.png"
            alt="Patient sleeping safely with Sleep Guard device"
            fill
            priority
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-extrabold mb-3">What is Sleep Guard?</h1>
        <div className="w-14 h-1 bg-brand-yellow mb-5" />
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Sleep Guard is a compact, at-home device that continuously monitors your
          breathing through the night. If it detects a dangerous pause, it sounds an
          alarm to wake you — and if you don&apos;t respond, it automatically alerts
          emergency services with your location. All your data is organized into a
          simple dashboard your doctor can check anytime, giving you sleep-lab insight
          at a fraction of the cost.
        </p>
        <OrderNowButton className="w-fit" />
      </div>

      {/* Desktop/tablet: the overlapping blob-card layout, where there's enough
          height for the card to comfortably fit its text without overflowing. */}
      <div className="hidden md:block relative rounded-2xl overflow-hidden">
        <div className="relative w-full h-[460px]">
          <Image
            src="/images/hero-bedroom.png"
            alt="Patient sleeping safely with Sleep Guard device"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div
          className="absolute top-0 left-0 w-[60%] h-full bg-white p-12 flex flex-col justify-center"
          style={{ borderRadius: "0 0 120px 0" }}
        >
          <h1 className="text-3xl font-extrabold mb-3">What is Sleep Guard?</h1>
          <div className="w-14 h-1 bg-brand-yellow mb-5" />
          <p className="text-base text-gray-700 leading-relaxed mb-6 max-w-md">
            Sleep Guard is a compact, at-home device that continuously monitors your
            breathing through the night. If it detects a dangerous pause, it sounds an
            alarm to wake you — and if you don&apos;t respond, it automatically alerts
            emergency services with your location. All your data is organized into a
            simple dashboard your doctor can check anytime, giving you sleep-lab insight
            at a fraction of the cost.
          </p>
          <OrderNowButton className="w-fit" />
        </div>
      </div>
    </section>
  );
}

function RealTimeReadings() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center order-2 md:order-1">
        <Image
          src="/images/logo.png"
          alt="Sleep Guard logo"
          width={320}
          height={200}
          className="w-56 md:w-80 h-auto"
        />
      </div>
      <div className="order-1 md:order-2">
        <h2 className="text-2xl font-extrabold mb-3">Real-time readings</h2>
        <div className="w-14 h-1 bg-brand-yellow mb-5" />
        <p className="text-gray-700 leading-relaxed">
          Once your device arrives, you&apos;ll find a QR code right on the box. Scan it,
          pair your device in seconds, and start seeing your breathing rate come to life
          on your personal dashboard — no complicated setup, no waiting.
        </p>
      </div>
    </section>
  );
}

const steps = [
  {
    image: "/images/step-wear.png",
    title: "Wear comfortably",
    text: "Set up the sensor by your bed in seconds — nothing to attach to your body.",
  },
  {
    image: "/images/step-insights.png",
    title: "Gain insights",
    text: "See your breathing rate every night and understand your patterns over time.",
  },
  {
    image: "/images/step-action.png",
    title: "Take action",
    text: "Get woken immediately if a dangerous pause is detected, before it becomes serious.",
  },
  {
    image: "/images/step-support.png",
    title: "Get support",
    text: "Share your data with your doctor and family so you're never monitored alone.",
  },
];

function HowItHelps() {
  return (
    <section className="bg-brand-yellow py-20 max-w-7xl mx-auto rounded-3xl my-10 px-2">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-1">
          Here&apos;s how Sleep Guard can help you
        </h2>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">on your path to safer sleep.</h2>
        <div className="w-14 h-1 bg-black mx-auto mb-6" />
        <p className="text-black/80 leading-relaxed max-w-2xl mx-auto">
          Sleep Guard continuously tracks your breathing overnight and sends your data
          straight to your dashboard.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-full aspect-square rounded-full overflow-hidden mb-4 shadow-sm bg-brand-yellow">
              <Image
                src={step.image}
                alt={step.title}
                width={614}
                height={432}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold mb-2 border-b-2 border-black/70 pb-2 w-full">
              {step.title}
            </h3>
            <p className="text-sm text-black/80">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SeeTheImpact() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
          See the impact of every night, every alert, and every response.
        </h2>
        <div className="w-14 h-1 bg-brand-yellow mb-5" />
        <p className="text-gray-700 leading-relaxed">
          A single night's sleep only tells you so much. Sleep Guard continuously
          tracks your breathing for a complete picture of where it is, where it&apos;s
          been, and where it&apos;s going.{" "}
          <span className="font-bold">So you can sleep with more confidence.</span>
        </p>
      </div>
      <div className="flex justify-center">
        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden">
          <Image
            src="/images/product-person-phone.png"
            alt="Sleep Guard app showing a live breathing-rate reading next to the patient"
            width={624}
            height={564}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
