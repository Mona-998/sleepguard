"use client";

import { useEffect, useState } from "react";

export default function TypingHeadline({
  text,
  className = "",
  speedMs = 45,
}: {
  text: string;
  className?: string;
  speedMs?: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speedMs);
    return () => clearInterval(interval);
  }, [text, speedMs]);

  return (
    <h1 className={className}>
      {displayed}
      <span className="inline-block w-[3px] h-[0.9em] bg-white align-middle ml-1 animate-pulse" />
    </h1>
  );
}
