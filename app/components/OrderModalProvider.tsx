"use client";

import { createContext, useContext, useState } from "react";
import OrderModal from "./OrderModal";

type OrderModalContextType = {
  open: () => void;
  close: () => void;
};

const OrderModalContext = createContext<OrderModalContextType | null>(null);

export function useOrderModal() {
  const ctx = useContext(OrderModalContext);
  if (!ctx) {
    throw new Error("useOrderModal must be used within OrderModalProvider");
  }
  return ctx;
}

export default function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OrderModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      {isOpen && <OrderModal onClose={() => setIsOpen(false)} />}
    </OrderModalContext.Provider>
  );
}
