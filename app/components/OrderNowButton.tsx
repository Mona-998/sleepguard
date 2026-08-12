"use client";

import { useOrderModal } from "./OrderModalProvider";

export default function OrderNowButton({ className = "" }: { className?: string }) {
  const { open } = useOrderModal();

  return (
    <button
      onClick={open}
      className={`bg-brand-yellow text-black font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:brightness-95 transition ${className}`}
    >
      Order Now
    </button>
  );
}
