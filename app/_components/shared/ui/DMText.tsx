"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Props = {
  rounded: "left" | "right";
  colorVariant: "primary" | "secondary";
  text: string;
  time: string;
  className?: string;
  animateTyping?: boolean;
};

export const DMText = ({
  rounded,
  colorVariant,
  text,
  time,
  className,
  animateTyping = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  const roundedClass =
    rounded === "left" ? "rounded-tl-none" : "rounded-tr-none";
  const colorClass =
    colorVariant === "primary" ? "bg-dm-primary/60" : "bg-dm-secondary/60";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const textElement = textRef.current;
    const dotsElement = dotsRef.current;

    if (!container) return;

    // --- Initial Setup ---
    // Pop-in state
    gsap.set(container, {
      scale: 0,
      opacity: 0,
      "--blur-amount": "0px",
    } as any);

    // Typing state (if enabled)
    if (animateTyping && textElement && dotsElement) {
      // Initial: Dots visible, Text hidden (absolute/hidden to mimic vanilla behavior)
      gsap.set(dotsElement, { display: "flex", opacity: 1, scale: 1 });
      gsap.set(textElement, {
        visibility: "hidden",
        position: "absolute",
        opacity: 0,
      });
      textElement.textContent = text;
    }

    let dotGsapTween: gsap.core.Tween | null = null;
    let typingTimeout: NodeJS.Timeout | null = null;
    let sequenceTimeline: gsap.core.Timeline | null = null;

    // --- Animation Logic ---

    const startTypingAnimation = () => {
      if (!animateTyping || !textElement || !dotsElement) return;

      // Kill any existing sequences
      if (sequenceTimeline) sequenceTimeline.kill();
      if (dotGsapTween) dotGsapTween.kill();
      if (typingTimeout) clearTimeout(typingTimeout);

      // Ensure correct starting state for animation
      gsap.set(dotsElement, { display: "flex", opacity: 1, scale: 1 });
      gsap.set(textElement, {
        visibility: "hidden",
        position: "absolute",
        opacity: 0,
      });
      textElement.textContent = text; // Reset text

      // 1. Animate dots (GSAP opacity) - CSS bounce handles the movement
      const dots = dotsElement.querySelectorAll(".dot");
      gsap.set(dots, { opacity: 1 });
      dotGsapTween = gsap.to(dots, {
        opacity: 0.3,
        duration: 0.4,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 2. Sequence
      sequenceTimeline = gsap.timeline();

      // Wait 1.0s (vanilla logic)
      sequenceTimeline.to({}, { duration: 1.0 });

      // Animate dots out
      sequenceTimeline.to(dotsElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (dotGsapTween) dotGsapTween.kill();
          gsap.set(dotsElement, { display: "none" });

          // Show text element
          gsap.set(textElement, {
            visibility: "visible",
            position: "relative",
            opacity: 0,
          });
          textElement.textContent = ""; // Clear for typing
        },
      });

      // Fade in text container
      sequenceTimeline.to(textElement, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          // Start typewriter
          let index = 0;
          const typeChar = () => {
            if (index < text.length) {
              textElement.textContent += text.charAt(index);
              index++;
              typingTimeout = setTimeout(typeChar, 20);
            }
          };
          typeChar();
        },
      });
    };

    const resetToTypingIndicator = () => {
      if (!animateTyping || !textElement || !dotsElement) return;

      // Kill active animations
      if (sequenceTimeline) sequenceTimeline.kill();
      if (dotGsapTween) dotGsapTween.kill();
      if (typingTimeout) clearTimeout(typingTimeout);

      // If text is currently visible (or partially visible), fade it out then reset
      if (textElement.style.visibility === "visible") {
        gsap.to(textElement, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            // Reset state
            gsap.set(textElement, {
              visibility: "hidden",
              position: "absolute",
            });
            textElement.textContent = text; // Restore full text

            gsap.set(dotsElement, { display: "flex", opacity: 1, scale: 1 });
            
            // Restart dot animation for visual consistency
            const dots = dotsElement.querySelectorAll(".dot");
            gsap.set(dots, { opacity: 1 });
            dotGsapTween = gsap.to(dots, {
                opacity: 0.3,
                duration: 0.4,
                stagger: 0.15,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
          },
        });
      } else {
        // Immediate reset
        gsap.set(textElement, {
          visibility: "hidden",
          position: "absolute",
          opacity: 0,
        });
        textElement.textContent = text;
        gsap.set(dotsElement, { display: "flex", opacity: 1, scale: 1 });
        
        // Restart dot animation
        const dots = dotsElement.querySelectorAll(".dot");
        gsap.set(dots, { opacity: 1 });
        dotGsapTween = gsap.to(dots, {
            opacity: 0.3,
            duration: 0.4,
            stagger: 0.15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
      }
    };

    // --- ScrollTriggers ---

    // 1. Pop-in Trigger
    const popInTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      end: "top 40%",
      toggleActions: "play none none none", // Changed to manual reverse handling
      onEnter: () => {
        // Reset blur
        gsap.set(container, { "--blur-amount": "0px" } as any);
        // Animate Pop-in
        gsap.fromTo(container, 
          { scale: 0, opacity: 0 },
          {
            duration: 1.5,
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1.3,0.4)",
            onComplete: () => {
              // Blur in
              gsap.to(container, {
                "--blur-amount": "13px",
                duration: 0.6,
                ease: "power2.inOut",
              } as any);
            },
          }
        );
      },
      onLeaveBack: () => {
        // Custom Fade Out (Not reverse elastic)
        gsap.set(container, { "--blur-amount": "0px" } as any);
        gsap.to(container, {
          duration: 0.5,
          opacity: 0,
          scale: 0.5, // Simple scale down
          ease: "power2.in",
          overwrite: true,
        });
      },
    });

    // 2. Typing Trigger (Separate, as in vanilla)
    let typingTrigger: ScrollTrigger | null = null;

    if (animateTyping) {
      typingTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        end: "top 40%",
        onEnter: () => {
          startTypingAnimation();
        },
        onLeaveBack: () => {
          resetToTypingIndicator();
        },
      });
    }

    return () => {
      if (popInTrigger) popInTrigger.kill();
      if (typingTrigger) typingTrigger.kill();
      if (sequenceTimeline) sequenceTimeline.kill();
      if (dotGsapTween) dotGsapTween.kill();
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [animateTyping, text]);

  return (
    <>
      <style jsx global>{`
        @keyframes typingBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-8px);
          }
        }
        .dot {
          animation: typingBounce 1.4s infinite ease-in-out;
        }
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
      <div
        ref={containerRef}
        style={
          {
            backdropFilter: "blur(var(--blur-amount))",
            WebkitBackdropFilter: "blur(var(--blur-amount))",
          } as any
        }
        className={`relative text-sm pb-[clamp(1.5rem,calc(1.237rem+1.053vw),2.5rem)] leading-[130%] text-white ${roundedClass} ${colorClass} ${className} rounded-xl p-[clamp(0.5rem,calc(0.336rem+0.658vw),1.125rem)] flex flex-col w-[clamp(13.438rem,calc(8.75rem+18.75vw),31.25rem)]`}
      >
        {animateTyping && (
          <div
            ref={dotsRef}
            className="typing-indicator flex items-center gap-1 min-h-[1.5rem]"
          >
            <span className="dot size-5 rounded-full bg-white"></span>
            <span className="dot size-5 rounded-full bg-white"></span>
            <span className="dot size-5 rounded-full bg-white"></span>
          </div>
        )}

        <p ref={textRef} className={`${animateTyping ? "invisible absolute" : ""} min-h-[1.5rem]`}>
          {text}
        </p>

        <span className="absolute bottom-12 right-12 opacity-60">{time}</span>
      </div>
    </>
  );
};