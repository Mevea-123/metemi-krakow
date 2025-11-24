import React from "react";
import NavButton from "./NavButton";
import { MetemiFilled } from "../shared/icons/MetemiFilled";

export default function HeroHeader() {
  return (
    <div className="relative flex flex-col md:gap-0 gap-8">
      <MetemiFilled className="anim-logo translate-y-[-100%] text-white z-[5] w-[90vw] mx-auto " />

      <div className="flex items-center gap-12 md:gap-16 self-end pr-20 md:pr-[2.5%]">
        <p className="anim-pop-in text-outline-krakov whitespace-nowrap font-bold">
          for KRAKOW
        </p>
        <NavButton />
      </div>
    </div>
  );
}
