"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

function logoSplitAnimation() {
  const logo = document.querySelector(".anim-logo");

  gsap.to(logo, {
    duration: 0.75,
    y: "0%",
    ease: "power2.out",
    delay: 0.25,
    scrollTrigger: {
      trigger: logo,
      start: "top 90%",
    },
  });
}

function popInAnimation() {
  const elements = document.querySelectorAll(".anim-pop-in");

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        scale: 0,
        opacity: 0,
      },
      {
        duration: 1.5,
        scale: 1,
        opacity: 1,
        // ease: "elastic.out(1,0.6)",
        ease: "elastic.out(1.25,0.4)",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function fadeInAnimation() {
  const elements = document.querySelectorAll(".anim-fade-in");

  elements.forEach((element) => {
    gsap.set(element, {
      opacity: 0,
      y: "100%",
    });

    gsap.to(element, {
      duration: 0.8,
      opacity: 1,
      y: "0%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "-100% 80%",
        toggleActions: "play none none reverse",

        markers: false,
      },
    });
  });
}

function fadeLeftAnimation() {
  const elements = document.querySelectorAll(".anim-fade-left");

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: "-100%",
      },
      {
        duration: 0.8,
        opacity: 1,
        x: "0%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function fadeRightAnimation() {
  const elements = document.querySelectorAll(".anim-fade-right");

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: "100%",
      },
      {
        duration: 0.8,
        opacity: 1,
        x: "0%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function textLinesAnimation() {
  const textElements = document.querySelectorAll(".anim-text-lines");

  textElements.forEach((element) => {
    // Disable auto aria-label injection from SplitText to avoid Lighthouse warnings
    const split = new SplitText(element, {
      type: "lines",
      aria: "none",
      mask: "lines",
    });

    gsap.set(split.lines, {
      // opacity: 0,
      y: "100%",
    });

    split.lines.forEach((line, index) => {
      gsap.to(line, {
        opacity: 1,
        y: "0%",
        duration: 1.25,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });
    });
  });
}

function textLinesGradientAnimation() {
  const textElements = document.querySelectorAll(".anim-text-lines-gradient");

  textElements.forEach((element) => {
    // Add a class to lines so we can control layout precisely
    // Also disable auto aria-label injection to satisfy Lighthouse
    const split = new SplitText(element, {
      type: "lines",
      linesClass: "split-line",
      aria: "none",
    });

    // Ensure lines reveal from below without clipping descenders
    split.lines.forEach((line) => {
      const lineElement = line as HTMLElement;
      lineElement.style.overflow = "visible"; // prevent cutting glyph descenders (e.g., J, g, y)
      lineElement.style.display = "block"; // consistent box for transforms
      lineElement.style.paddingBottom = "0.12em"; // small buffer so descenders aren't cropped
      // Apply gradient to each line
      lineElement.style.backgroundImage =
        "linear-gradient(90deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))";
      // Vendor-prefixed background-clip for Safari
      lineElement.style.setProperty("-webkit-background-clip", "text");
      lineElement.style.backgroundClip = "text";
      lineElement.style.setProperty("-webkit-text-fill-color", "transparent");
      lineElement.style.color = "transparent";
    });

    // Use yPercent for smoother, box-size-relative motion
    gsap.set(split.lines, {
      opacity: 0,
      yPercent: 100,
      force3D: true,
    });

    split.lines.forEach((line, index) => {
      gsap.to(line, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.15,
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
          toggleActions: "play none none reverse",

          markers: false,
        },
      });
    });
  });
}

function outlineTextReveal() {
  const outlineTexts = document.querySelectorAll(".text-outline-krakov");

  outlineTexts.forEach((text) => {
    gsap.fromTo(
      text,
      {
        color: "transparent",
      },
      {
        duration: 1,
        color: "white",
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function parallaxAnimation() {
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    // Hint GPU acceleration for smoother video transforms
    htmlElement.style.willChange = "transform";
    // read but do not keep unused locals; values are consumed in tween callback below
    const offset = parseFloat(htmlElement.dataset.offset || "0");
    const offsetMobile = parseFloat(
      htmlElement.dataset.offsetMobile || htmlElement.dataset.offset || "0"
    );
    const isMobile = window.innerWidth < 768;
    const initialOffset =
      isMobile && htmlElement.dataset.offsetMobile ? offsetMobile : offset;

    // Set initial offset position
    gsap.set(element, {
      y: initialOffset,
    });

    gsap.to(element, {
      y: (i, target) => {
        const targetElement = target as HTMLElement;
        const isMobile = window.innerWidth < 768;
        const elementSpeed =
          isMobile && targetElement.dataset.speedMobile
            ? parseFloat(targetElement.dataset.speedMobile)
            : parseFloat(targetElement.dataset.speed || "1");
        const elementOffset =
          isMobile && targetElement.dataset.offsetMobile
            ? parseFloat(targetElement.dataset.offsetMobile)
            : parseFloat(targetElement.dataset.offset || "0");
        return elementOffset + elementSpeed * 100;
      },
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        scrub: true,
      },
    });
  });

  // Object-position parallax for images/videos with a special class
  // Usage: add class "parallax-object" and optional data attributes:
  // data-offset-x (default 50), data-offset-y (default 50), data-speed-x (default 0), data-speed-y (default 1)
  // data-speed-mobile can be used to override data-speed-x and data-speed-y on mobile (below 768px)
  // data-offset-x-mobile and data-offset-y-mobile can be used to override offsets on mobile (below 768px)
  const objectParallaxEls = document.querySelectorAll(".parallax-object");

  objectParallaxEls.forEach((element) => {
    const media = element as HTMLElement;
    const isMobile = window.innerWidth < 768;

    const offsetX =
      isMobile && media.dataset.offsetXMobile
        ? parseFloat(media.dataset.offsetXMobile)
        : parseFloat(media.dataset.offsetX || "50");
    const offsetY =
      isMobile && media.dataset.offsetYMobile
        ? parseFloat(media.dataset.offsetYMobile)
        : parseFloat(media.dataset.offsetY || "50");

    // Check for mobile speed override
    const speedX =
      isMobile && media.dataset.speedMobile
        ? parseFloat(media.dataset.speedMobile)
        : parseFloat(media.dataset.speedX || "0");
    const speedY =
      isMobile && media.dataset.speedMobile
        ? parseFloat(media.dataset.speedMobile)
        : parseFloat(media.dataset.speedY || "1");

    // Set initial object-position
    media.style.objectPosition = `${offsetX}% ${offsetY}%`;

    const proxy = { x: offsetX, y: offsetY };

    gsap.to(proxy, {
      x: offsetX + speedX * 100,
      y: offsetY + speedY * 100,
      ease: "none",
      onUpdate: () => {
        media.style.objectPosition = `${proxy.x}% ${proxy.y}%`;
      },
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

function animateTextsLetterSpacingScrub() {
  const elements = document.querySelectorAll("[data-letter-spacing-scrub]");

  elements.forEach((element) => {
    const split = new SplitText(element, {
      type: "words",
      wordsClass: "split-word",
    });

    gsap.fromTo(
      split.words,
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
}

export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  logoSplitAnimation();
  outlineTextReveal();
  textLinesAnimation();
  textLinesGradientAnimation();
  popInAnimation();
  fadeInAnimation();
  fadeLeftAnimation();
  fadeRightAnimation();
  parallaxAnimation();
  animateTextsLetterSpacingScrub();

  // Ensure ScrollTrigger accounts for media sizing once videos are ready
  // This fixes parallax elements that are videos whose dimensions become known after metadata load
  const videos = Array.from(
    document.querySelectorAll<HTMLVideoElement>("video")
  );
  const needsRefresh = videos.some((v) => v.readyState < 2); // HAVE_CURRENT_DATA
  if (needsRefresh) {
    videos.forEach((v) => {
      if (v.readyState < 2) {
        const onReady = () => {
          // slight delay lets layout settle
          requestAnimationFrame(() => ScrollTrigger.refresh());
        };
        v.addEventListener("loadedmetadata", onReady, { once: true });
        v.addEventListener("loadeddata", onReady, { once: true });
      }
    });
  }
  // As a fallback after full page load
  window.addEventListener("load", () => ScrollTrigger.refresh(), {
    once: true,
  });
}
