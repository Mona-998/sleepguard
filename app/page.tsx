import Image from "next/image";
import TypingHeadline from "./components/TypingHeadline";
import OrderNowButton from "./components/OrderNowButton";

export default function Home() {
  return (
    <div>
      <Hero />
      <EasyToUse />
      <HowItWorks />
      <SeePattern />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative w-full h-[500px] md:h-[560px]">
        <Image
          src="/images/hero-bedroom.png"
          alt="Patient sleeping safely with Sleep Guard device"
          fill
          priority
          className="object-cover object-[65%_center] md:object-center"
        />
        {/* Gradient scrim only at the bottom, so the patient + device stay visible
            instead of a full-image dark overlay hiding them on narrow screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-lg text-white">
            <TypingHeadline
              text="Small device. Full night's peace of mind."
              className="text-2xl md:text-4xl font-extrabold leading-tight mb-3 min-h-[3em] md:min-h-[2.6em]"
            />
            <p className="text-sm md:text-base leading-relaxed mb-5 text-white/90">
              Our sleep apnea monitor brings hospital-level insight into your own bedroom
              — helping you catch dangerous pauses in breathing before they become
              emergencies, without ever needing an overnight stay in a sleep lab.
            </p>
            <OrderNowButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function EasyToUse() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center slide-in-left">
        <Image
          src="/images/logo.png"
          alt="Sleep Guard logo"
          width={320}
          height={200}
          className="w-64 md:w-80 h-auto"
        />
      </div>
      <div className="slide-in-right">
        <h2 className="text-2xl font-extrabold mb-3">An easy-to-use device</h2>
        <div className="w-14 h-1 bg-brand-yellow mb-5" />
        <p className="text-gray-700 leading-relaxed">
          Some people stop breathing in their sleep, and their brain doesn&apos;t send the
          signal to wake them up. Our device listens through the night, and if it
          detects an irregular breathing pattern, it sounds an alarm to wake you
          immediately.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-brand-yellow py-20 max-w-7xl mx-auto rounded-3xl my-10 px-2">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          New to Sleep Guard monitoring?
        </h2>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Here&apos;s how it works.</h2>
        <div className="w-14 h-1 bg-black mx-auto mb-6" />
        <p className="text-black/80 leading-relaxed max-w-2xl mx-auto">
          Sleep Guard continuously tracks your breathing patterns throughout the night
          and sends automatic alerts the moment something irregular is detected. It
          sounds an alarm to wake you immediately. If the alarm goes off and there&apos;s
          no response, the device automatically sends an alert with your location to
          emergency services. You can also view your data on our website.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-14 flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg bg-white">
          <Image
            src="/images/device-circle.png"
            alt="Sleep Guard device"
            fill
            className="object-contain p-4"
          />
        </div>

        <span className="text-3xl font-bold hidden md:block">&rarr;</span>
        <span className="text-3xl font-bold md:hidden">&darr;</span>

        <div className="relative w-40 md:w-44">
          <Image
            src="/images/phone-reading.png"
            alt="Sleep Guard app showing breathing rate reading"
            width={462}
            height={978}
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

function SeePattern() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-2xl font-extrabold mb-3">See a pattern here?</h2>
        <div className="w-14 h-1 bg-brand-yellow mb-5" />
        <p className="text-gray-700 leading-relaxed">
          Every night&apos;s breathing patterns are tracked and organized into a simple,
          clear dashboard your doctor can access anytime — turning one night of data
          into a real picture of your health over time.
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/phone-splash.png"
          alt="Sleep Guard app splash screen"
          width={462}
          height={978}
          className="w-44 md:w-52 h-auto drop-shadow-xl"
        />
      </div>
    </section>
  );
}
