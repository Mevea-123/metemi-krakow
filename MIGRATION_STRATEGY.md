# Next.js to Vanilla HTML/CSS/JS Migration Strategy

**Project:** metemi-next  
**Date Started:** October 23, 2025  
**Estimated Time:** Multiple sessions  
**Goal:** Convert React/Next.js project to plain HTML, CSS, and JS (3 files max, no build tools)

---

## 📋 Overview

This document tracks the migration from a Next.js/React/TypeScript/Tailwind project to vanilla web technologies.

**Current Stack:**
- ⚛️ Next.js 15.5.2 + React 19
- 📘 TypeScript
- 🎨 Tailwind CSS v4
- 🎭 GSAP + SplitText for animations
- 🎯 ~~anime.js (v4.1.3)~~ - NOT NEEDED (removed)
- 📜 Lenis for smooth scrolling
- 🖼️ Next.js Image optimization

**Target Stack:**
- 📄 Single `index.html`
- 🎨 Single `styles.css` (or inline in HTML)
- ⚙️ Single `script.js` (or inline in HTML)
- 📦 CDN imports only (GSAP, Lenis)

---

## 🗂️ Project Structure Analysis

### Current Components & Features

#### **Sections (Main Content)**
1. ✅ **Hero** - Main hero section with background, header, content, video
2. ✅ **Countdown** - Animated countdown timer (GSAP-based)
3. ✅ **Videos** - Two-column video showcase (left + right side)
4. ✅ **Krakow** - Location section with video background and email signup

#### **Layout Components**
5. ✅ **Navigation** - Currently empty/null, minimal implementation
6. ✅ **Footer** - Social icons, copyright, logo

#### **Specific Components**
7. ✅ HeroHeader
8. ✅ HeroContent
9. ✅ HeroVideo
10. ✅ NavButton
11. ✅ VideosLeftSide
12. ✅ VideosRightSide

#### **Shared UI Components**
13. ✅ ClientAnimations - GSAP animation initializer
14. ✅ DMText - Custom text component
15. ✅ EmailSubscribe - Email form component
16. ✅ LenisProvider - Smooth scroll wrapper
17. ✅ OutlinedTextSVG - SVG text outline
18. ✅ Video - Custom video player component

#### **Icons/SVG Components**
- FacebookIcon, GithubIcon, InstagramIcon, LinkedInIcon
- SnapchatIcon, TwitterIcon
- KrakowText, LetterMIcon, MetemiFilled, MetemiText

---

## 🎯 Migration Phases

### **Phase 1: Setup & Foundation** ✅ COMPLETE
**Estimated Time:** 30-45 minutes

- [x] 1.1 Create new directory structure for vanilla version
  - [x] Create `vanilla/` folder in project root
  - [x] Create `index.html`, `styles.css`, `script.js`
  - [x] Create `assets/` folder (images, videos, fonts)

- [x] 1.2 Copy static assets
  - [x] Copy `/public/images/` → `assets/images/`
  - [x] Copy `/public/videos/` → `assets/videos/`
  - [x] Copy `/public/svg/` → `assets/svg/`
  - [x] Verify all asset paths

- [x] 1.3 Setup CDN dependencies
  - [x] Add GSAP CDN link (+ ScrollTrigger, SplitText)
  - [x] Add Lenis smooth scroll CDN
  - [x] Add Google Fonts (Inter, Figtree)
  - [x] Test all CDN resources load correctly

- [x] 1.4 Complete HTML structure created
  - [x] All sections converted from React components
  - [x] SVG icons inlined
  - [x] Semantic HTML with proper accessibility

**Deliverables:** Basic HTML structure with working CDN imports ✅

---

### **Phase 2: CSS Migration** ⏳ NOT STARTED
**Estimated Time:** 1-2 hours

- [ ] 2.1 Convert Tailwind theme to CSS variables
  - [ ] Extract all custom CSS variables from `@theme` block
  - [ ] Convert spacing, colors, gradients
  - [ ] Convert responsive font sizes (clamp functions)
  - [ ] Convert custom border radius values
  - [ ] Test all CSS variables in browser

- [ ] 2.2 Convert Tailwind utility classes to vanilla CSS
  - [ ] Create utility classes for common patterns:
    - [ ] Flexbox layouts (`.flex`, `.flex-col`, `.items-center`, etc.)
    - [ ] Grid layouts
    - [ ] Spacing utilities (margin, padding)
    - [ ] Text utilities (size, weight, color)
    - [ ] Background utilities
    - [ ] Border/rounded utilities
  - [ ] Document class naming convention

- [ ] 2.3 Convert component-specific styles
  - [ ] Hero section styles
  - [ ] Countdown styles
  - [ ] Videos section styles
  - [ ] Krakow section styles
  - [ ] Footer styles
  - [ ] Animation-ready classes (`.anim-*`)

- [ ] 2.4 Responsive design
  - [ ] Extract all breakpoints from Tailwind
  - [ ] Convert mobile-first media queries
  - [ ] Test on multiple screen sizes
  - [ ] Verify clamp() functions work correctly

**Deliverables:** Complete `styles.css` with all converted styles

---

### **Phase 3: HTML Structure** ⏳ NOT STARTED
**Estimated Time:** 1.5-2 hours

- [ ] 3.1 Create base HTML structure
  - [ ] Add DOCTYPE, html, head, body
  - [ ] Add meta tags (charset, viewport, description)
  - [ ] Add title and favicon
  - [ ] Link CSS and JS files
  - [ ] Add font preloads

- [ ] 3.2 Convert React components to HTML sections
  - [ ] Hero section
    - [ ] HeroHeader content
    - [ ] HeroContent content
    - [ ] HeroVideo content
  - [ ] Countdown section
  - [ ] Videos section
    - [ ] VideosLeftSide content
    - [ ] VideosRightSide content
  - [ ] Krakow section
  - [ ] Footer section

- [ ] 3.3 Convert SVG icon components to inline SVG
  - [ ] LetterMIcon
  - [ ] MetemiText
  - [ ] MetemiFilled
  - [ ] KrakowText
  - [ ] Social media icons (Facebook, Twitter, etc.)
  - [ ] Optimize SVG code (remove unnecessary attributes)

- [ ] 3.4 Replace Next.js Image with standard img/picture tags
  - [ ] Convert all `<Image>` components
  - [ ] Add appropriate sizes/srcset for responsive images
  - [ ] Add loading="lazy" where appropriate
  - [ ] Verify image optimization alternatives

- [ ] 3.5 Add semantic HTML and accessibility
  - [ ] Proper heading hierarchy (h1, h2, h3)
  - [ ] ARIA labels where needed
  - [ ] Alt text for all images
  - [ ] Semantic tags (section, article, nav, footer)

**Deliverables:** Complete `index.html` with all content and structure

---

### **Phase 4: JavaScript - Core Functionality** ⏳ NOT STARTED
**Estimated Time:** 1-2 hours

- [ ] 4.1 Initialize libraries
  - [ ] Initialize Lenis smooth scroll
  - [ ] Register GSAP plugins (ScrollTrigger, SplitText)
  - [ ] Add DOMContentLoaded event listener

- [ ] 4.2 Countdown timer functionality
  - [ ] Port countdown logic from React component
  - [ ] Implement IntersectionObserver trigger
  - [ ] Implement GSAP number animations
  - [ ] Test countdown animation on scroll

- [ ] 4.3 Email subscription form
  - [ ] Create form submission handler
  - [ ] Add validation logic
  - [ ] Add success/error messages
  - [ ] Connect to backend API (if applicable)
  - [ ] Add loading states

- [ ] 4.4 Video handling
  - [ ] Implement custom video player controls (if needed)
  - [ ] Add autoplay/pause logic
  - [ ] Ensure videos load properly
  - [ ] Add fallback for video failures

**Deliverables:** Core interactive features working

---

### **Phase 5: JavaScript - Animations** ⏳ NOT STARTED
**Estimated Time:** 2-3 hours

- [ ] 5.1 Port GSAP animations from `animations.ts`
  - [ ] `logoSplitAnimation()`
  - [ ] `popInAnimation()`
  - [ ] `fadeInAnimation()`
  - [ ] `fadeLeftAnimation()`
  - [ ] `fadeRightAnimation()`
  - [ ] `textLinesAnimation()`
  - [ ] `textLinesGradientAnimation()`
  - [ ] `outlineTextReveal()`
  - [ ] `parallaxAnimation()` (standard + object-position variants)

- [ ] 5.2 Setup ScrollTrigger instances
  - [ ] Configure all scroll-based animations
  - [ ] Set proper start/end triggers
  - [ ] Add markers for debugging (remove in production)
  - [ ] Test on mobile and desktop

- [ ] 5.3 Animation refinements
  - [ ] Ensure proper stagger delays
  - [ ] Test easing functions
  - [ ] Handle edge cases (fast scrolling, resize)
  - [ ] Add mobile-specific animation adjustments
  - [ ] Verify performance (no jank)

**Deliverables:** All animations working smoothly

---

### **Phase 6: Polish & Optimization** ⏳ NOT STARTED
**Estimated Time:** 1-1.5 hours

- [ ] 6.1 Performance optimization
  - [ ] Minify CSS (or use inline critical CSS)
  - [ ] Minify JavaScript
  - [ ] Optimize images (WebP, compression)
  - [ ] Add lazy loading for images/videos
  - [ ] Test page load speed

- [ ] 6.2 Cross-browser testing
  - [ ] Test in Chrome
  - [ ] Test in Firefox
  - [ ] Test in Safari
  - [ ] Test in Edge
  - [ ] Fix any browser-specific issues

- [ ] 6.3 Responsive testing
  - [ ] Test on mobile (320px - 768px)
  - [ ] Test on tablet (768px - 1024px)
  - [ ] Test on desktop (1024px+)
  - [ ] Test on ultra-wide screens
  - [ ] Fix layout issues

- [ ] 6.4 Accessibility audit
  - [ ] Run Lighthouse audit
  - [ ] Check keyboard navigation
  - [ ] Verify screen reader compatibility
  - [ ] Check color contrast ratios
  - [ ] Fix accessibility issues

- [ ] 6.5 Final cleanup
  - [ ] Remove console.logs
  - [ ] Remove commented code
  - [ ] Add code comments where needed
  - [ ] Verify all links work
  - [ ] Final QA pass

**Deliverables:** Production-ready vanilla website

---

## 📦 Dependencies to Replace

### GSAP (Keep - Use CDN)
```html
<!-- GSAP Core + Plugins from CDN -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js"></script>
```

### Lenis (Keep - Use CDN)
```html
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

### Tailwind CSS (Remove - Convert to vanilla CSS)
- Convert all Tailwind classes to custom CSS
- Keep the design system (colors, spacing, typography)

### Next.js/React (Remove - Convert to vanilla HTML/JS)
- Replace components with HTML sections
- Replace hooks with vanilla JS event listeners
- Replace Image component with img/picture tags

---

## 🎨 Design System Reference

### Colors
```css
--color-secondary: #20304f;
--color-gray: #6e6d6d;
--color-dm-primary: #d93644;
--color-dm-secondary: #363859;
--gradient-start: #20304f;
--gradient-mid: #e2373e;
--gradient-end: #f4861e;
```

### Typography
- Primary font: Inter
- Secondary font: Figtree
- Responsive sizes use clamp() - already in CSS variables

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- XL: > 1280px

---

## ⚠️ Known Challenges

1. **GSAP SplitText** - May require Club GreenSock subscription for commercial use
   - Alternative: Use custom text splitting with vanilla JS
   
2. **Next.js Image Optimization** - Need to pre-optimize images manually
   - Use tools like Squoosh, ImageOptim, or Sharp CLI

3. **Video Handling** - No automatic optimization like Next.js
   - Pre-encode videos in multiple formats (MP4, WebM)
   - Add proper fallbacks

4. **Smooth Scrolling** - Lenis should work but needs testing
   - Fallback: CSS `scroll-behavior: smooth`

5. **Animation Performance** - Watch for janky animations on mobile
   - Use `will-change` sparingly
   - Prefer transform/opacity animations

---

## 📝 Notes & Decisions

### Session Log

**Session 1 - October 23, 2025**
- Created migration strategy document
- Analyzed current codebase structure
- Identified all components and dependencies
- Defined migration phases
- Removed anime.js from dependencies (not needed)
- ✅ Completed Phase 1: Setup & Foundation
  - Created `vanilla/` directory with proper structure
  - Copied all assets from `/public` to `/vanilla/assets`
  - Created complete `index.html` with all sections
  - Added all CDN dependencies (GSAP, Lenis, Google Fonts)
  - Converted all React components to semantic HTML
  - Inlined all SVG icons directly in HTML

---

## ✅ Progress Tracker

**Overall Progress:** ~20% Complete

- [x] Phase 1: Setup & Foundation (100%) ✅
- [ ] Phase 2: CSS Migration (0%)
- [ ] Phase 3: HTML Structure (100%) ✅ (Done with Phase 1)
- [ ] Phase 4: JavaScript - Core Functionality (0%)
- [ ] Phase 5: JavaScript - Animations (0%)
- [ ] Phase 6: Polish & Optimization (0%)

---

## 🚀 Next Steps

**For Next Session:**
1. ✅ ~~Phase 1 Complete~~
2. **Start Phase 2: CSS Migration**
   - Convert Tailwind theme to CSS variables
   - Create utility classes for layout
   - Convert component-specific styles
   - Implement responsive design

**Estimated Time for Next Session:** 1-2 hours

---

## 📚 Resources

- [GSAP Docs](https://greensock.com/docs/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

---

**Last Updated:** October 23, 2025  
**Status:** Planning Phase ✅  
**Next Session:** Begin Phase 1 Implementation
