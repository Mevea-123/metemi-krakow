import { DMText } from "../shared/ui/DMText";
import Video from "../shared/ui/Video";

export default function VideosLeftSide() {
  return (
    <div className="w-full lg:w-[60%]">
      <div className="w-full aspect-square relative mt-100 lg:mt-168">
        <Video
          src="/videos/videos-main.mp4"
          className="object-cover w-full h-full rounded-4xl aspect-[121/134]"
          aria-label="Video Thumbnail"
        />
        <div className="absolute left-[clamp(3.125rem,calc(1.908rem+4.868vw),7.75rem)] bottom-[-17.5%] md:bottom-[-5.5%] lg:bottom-[-15%] flex flex-col w-full">
          <p
            className="parallax text-35xl text-white font-bold max-w-[60%] leading-[120%] anim-text-lines text-shadow-lg"
            data-speed="-1.75"
          >
            Meet real people around you.
          </p>
          <div className="flex flex-col lg:mr-140">
            <DMText
              rounded="right"
              colorVariant="primary"
              text="Okej, v 16:00 na severní pláži?"
              time="15:11"
              className="lg:self-end lg:mr-124 mb-[clamp(0.5rem,calc(0.105rem+1.579vw),2rem)] mt-30 lg:mt-224"
            />
            <DMText
              rounded="left"
              colorVariant="secondary"
              text="Uvidíme se za chvíli, těším se"
              time="15:18"
              className="lg:self-end ml-60 lg:ml-0"
              animateTyping
            />
          </div>
        </div>
      </div>
    </div>
  );
}
