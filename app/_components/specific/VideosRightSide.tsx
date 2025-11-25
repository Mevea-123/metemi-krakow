import { DMText } from "../shared/ui/DMText";
import Video from "../shared/ui/Video";

export default function VideosRightSide() {
  return (
    <div className="w-full lg:w-[40%] flex flex-col-reverse lg:flex-col">
      <div className="flex gap-8 lg:gap-16 w-full relative mt-60 lg:-mt-64">
        <Video
          src="/videos/videos-small-left.mp4"
          className="object-cover mt-10 lg:mt-150 rounded-4xl flex-1 min-w-0 parallax"
          aria-label="Girl running"
          data-speed="1.5"
          data-speed-mobile="-0.75"
          data-offset="-50"
          data-offset-mobile="0"
        />
        <Video
          src="/videos/videos-small-right.mp4"
          className="object-cover rounded-4xl flex-1 min-w-0 parallax"
          aria-label="Two girls smilingWhy"
          data-speed="-1.5"
          data-speed-mobile="0.5"
          data-offset="100"
          data-offset-mobile="-50"
        />

        <div className="absolute -right-4 lg:-right-64 -bottom-32 lg:-bottom-100">
          <DMText
            rounded="right"
            colorVariant="primary"
            text="Jsem už u workout hřiště u řeky. Dorazíte během 10 minut?"
            time="14:48"
            className="ml-[clamp(5rem,calc(3.026rem+7.895vw),12.5rem)]"
          />
          <DMText
            rounded="left"
            colorVariant="secondary"
            text="Budu čekat u vstupu do parku u zastávky. Poznáš mě podle žlutých šatů"
            time="14:50"
            className="mt-[clamp(0.25rem,calc(0.053rem+0.789vw),1rem)]"
            animateTyping
          />
        </div>
      </div>
      <div className="flex flex-col gap-[clamp(1rem,calc(0.572rem+1.711vw),2.625rem)] mt-125 lg:mt-175 lg:pl-0 pl-24">
        <h3 className="text-4xl anim-text-lines-gradient font-bold leading-[90%] text-center lg:text-start">
          Potkej lidi kolem <br /> sebe. Offline. <br /> Již brzy.
        </h3>
        <p className="text-2xl-small text-gray anim-text-lines leading-[120%] text-center lg:text-start mb-32 md:mb-0">
          Život se děje offline. <br />{" "}
          <span className="font-bold">Metemi tě</span> k němu{" "}
          <span className="font-bold">přiblíží.</span>
        </p>
      </div>
    </div>
  );
}
