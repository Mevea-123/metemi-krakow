"use client";

import { useEffect, useState } from "react";
import EmailSubscribe from "./EmailSubscribe";

export default function BottomBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateBanner = () => {
      if (isDismissed) return;

      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      // Show banner when scrolling up and not at the very top
      if (scrollingUp && currentScrollY > 300) {
        setIsVisible(true);
      }

      // Hide banner when scrolling down
      if (scrollingDown) {
        setIsVisible(false);
      }

      // Hide banner when at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateBanner);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[1000] backdrop-blur-[10px] px-8 py-7 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-r from-[rgba(32,48,79,0.98)] via-[rgba(226,55,62,0.98)] to-[rgba(244,134,30,0.98)] ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        className="absolute top-10 right-10 bg-transparent border-none text-white/80 cursor-pointer p-2 flex items-center justify-center transition-all duration-200 rounded hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 z-10"
        aria-label="Close banner"
        onClick={handleDismiss}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-18 flex-col md:flex-row text-center md:text-left">
        <div className="banner-text">
          <h4 className="text-white font-bold text-description-big">
            Ready to meet people around you?
          </h4>
          <p className="m-0 text-white/90 text-base">
            Start connecting in real life today
          </p>
        </div>
        <EmailSubscribe variant="secondary" />
      </div>
    </div>
  );
}
