"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-3">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Sleep Guard"
            width={140}
            height={84}
            className="h-9 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav — sits right beside the logo, small gap, not spread across the bar */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-800 ml-8">
          <Link href="/product" className="flex items-center gap-1 hover:text-black/70 transition">
            Products <ChevronDown size={14} />
          </Link>
          <Link href="/learn" className="flex items-center gap-1 hover:text-black/70 transition">
            Learn <ChevronDown size={14} />
          </Link>
          <Link href="/support" className="flex items-center gap-1 hover:text-black/70 transition">
            Support <ChevronDown size={14} />
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-800 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-semibold text-gray-800">
            <Link
              href="/product"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-gray-100 pb-3"
            >
              Products <ChevronDown size={14} />
            </Link>
            <Link
              href="/learn"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-gray-100 pb-3"
            >
              Learn <ChevronDown size={14} />
            </Link>
            <Link
              href="/support"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between pb-1"
            >
              Support <ChevronDown size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
