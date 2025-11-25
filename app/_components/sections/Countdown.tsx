"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { LetterMIcon } from "../shared/icons";
import ShimmerWrapper from "../shared/ui/ShimmerWrapper";

const MAX_VALUES = {
  days: 30,
  hours: 24,
  minutes: 60,
};

const FINAL_VALUES = {
  days: 20,
  hours: 13,
  minutes: 26,
};

export default function Countdown() {
  const [daysLeft, setDaysLeft] = useState(MAX_VALUES.days);
  const [hoursLeft, setHoursLeft] = useState(MAX_VALUES.hours);
  const [minutesLeft, setMinutesLeft] = useState(MAX_VALUES.minutes);

  const countdownRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = countdownRef.current?.querySelectorAll(".text-display-xl");
      elements?.forEach((element) => {
        gsap.fromTo(
          element,
          {
            letterSpacing: "0.4em",
          },
          {
            letterSpacing: "0em",
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 100%",
              end: "bottom 70%",
              scrub: true,
              markers: false,
            },
          }
        );
      });
    }, countdownRef);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            // Animate days
            gsap.to(
              { value: MAX_VALUES.days },
              {
                value: FINAL_VALUES.days,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  setDaysLeft(Math.floor(this.targets()[0].value));
                },
              }
            );

            // Animate hours with slight delay
            gsap.to(
              { value: MAX_VALUES.hours },
              {
                value: FINAL_VALUES.hours,
                duration: 2,
                delay: 0.2,
                ease: "power2.out",
                onUpdate: function () {
                  setHoursLeft(Math.floor(this.targets()[0].value));
                },
              }
            );

            // Animate minutes with slight delay
            gsap.to(
              { value: MAX_VALUES.minutes },
              {
                value: FINAL_VALUES.minutes,
                duration: 2,
                delay: 0.4,
                ease: "power2.out",
                onUpdate: function () {
                  setMinutesLeft(Math.floor(this.targets()[0].value));
                },
              }
            );
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: "0px 0px -100px 0px", // Start animation 100px before element is fully visible
      }
    );

    const node = countdownRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      ctx.revert();
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <div
      ref={countdownRef}
      className="flex relative justify-center w-[85vw] gap-[5vw] md:w-[80vw] lg:w-[70vw] mx-auto mt-150 md:mt-0"
    >
      <div className="text-display-xl font-bold text-outline-black whitespace-nowrap">
        {daysLeft}{" "}
        <span className="text-35small transform -ml-[clamp(1.25rem,calc(0.592rem+2.632vw),3.75rem)]">
          d
        </span>
      </div>
      <div className="text-display-xl font-bold text-outline-black whitespace-nowrap">
        {hoursLeft}{" "}
        <span className="text-35small transform -ml-[clamp(1.25rem,calc(0.592rem+2.632vw),3.75rem)]">
          h
        </span>
      </div>
      <div className="text-display-xl font-bold text-outline-black whitespace-nowrap">
        {minutesLeft}{" "}
        <span className="text-35small transform -ml-[clamp(1.25rem,calc(0.592rem+2.632vw),3.75rem)]">
          m
        </span>
      </div>
      <div className="absolute left-[10%] bottom-[-45%] md:bottom-[-15%] flex gap-16">
        <ShimmerWrapper className=" anim-pop-in relative z-[2]">
          <div className=" size-[clamp(3.75rem,calc(2.27rem+5.921vw),9.375rem)] rounded-custom-big relative overflow-hidden flex items-center justify-center">
            <Image
              src="/images/rectangle-bg.jpg"
              alt="Logo"
              width={150}
              height={150}
              className="size-full absolute"
            />
            <LetterMIcon className="size-[clamp(1.75rem,calc(0.977rem+3.092vw),4.688rem)] relative z-[2]" />
          </div>
        </ShimmerWrapper>
        <p className="text-3xl anim-text-lines-gradient font-bold leading-[95%]">
          We are <br /> Coming Soon.
        </p>
      </div>
    </div>
  );
}
