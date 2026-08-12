import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#222731" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Sleep Guard" width={32} height={32} className="h-8 w-auto" />
          <span className="font-bold text-lg">Sleep Guard</span>
        </div>
        <p className="text-sm text-white/60 leading-relaxed max-w-sm">
          A small device that watches over your breathing every night, so you and the
          people who care about you can rest easy too.
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-white/40 text-center">
          <p>
            &copy; {new Date().getFullYear()} Sleep Guard. Built as a student project — images
            and readings shown are simulated, not real patient data.
          </p>
        </div>
      </div>
    </footer>
  );
}
