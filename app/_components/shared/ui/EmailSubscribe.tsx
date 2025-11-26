"use client";

import { useState, useEffect } from "react";

type Props = {
  className?: string;
  variant: "primary" | "secondary";
};

export default function EmailSubscribe({ className, variant }: Props) {
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("Email");

  useEffect(() => {
    let isCancelled = false;

    const runAnimation = async () => {
      const text1 = "Email";
      const text2 = "chance@metemi.com";

      while (!isCancelled) {
        // Wait with "Email"
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (isCancelled) return;

        // Delete "Email"
        for (let i = text1.length; i >= 0; i--) {
          if (isCancelled) return;
          setPlaceholder(text1.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Type "chance@metemi.com"
        for (let i = 0; i <= text2.length; i++) {
          if (isCancelled) return;
          setPlaceholder(text2.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Wait with "chance@metemi.com"
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (isCancelled) return;

        // Delete "chance@metemi.com"
        for (let i = text2.length; i >= 0; i--) {
          if (isCancelled) return;
          setPlaceholder(text2.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Type "Email"
        for (let i = 0; i <= text1.length; i++) {
          if (isCancelled) return;
          setPlaceholder(text1.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    };

    runAnimation();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSubscribe = async () => {
    console.log("Subscribing with email:", email);
  };

  const mainClass =
    variant === "primary"
      ? "h-[clamp(2.688rem,calc(2.408rem+1.118vw),3.75rem)] w-full mt-16 2xl:mt-0 2xl:w-[clamp(28.125rem,calc(-2.875rem+32.292vw),35.875rem)]"
      : "h-[clamp(1.75rem,calc(1.421rem+1.316vw),3rem)] md:w-400";
  const buttonClass =
    variant === "primary"
      ? "bg-secondary text-xl px-24"
      : "bg-button-gradient text-xs px-16";

  return (
    <div className={`flex ${mainClass} ${className}`}>
      <input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 pl-12 md:pl-24 px-24 py-2 rounded-l-full text-xs border bg-white border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary"
      />
      <button
        onClick={handleSubscribe}
        className={`font-bold text-white rounded-r-full cursor-pointer hover:scale-105 transition-transform ${buttonClass}`}
      >
        Subscribe
      </button>
    </div>
  );
}
