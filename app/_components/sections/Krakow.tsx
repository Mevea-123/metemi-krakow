import { KrakowText } from "../shared/icons/KrakowText";
import EmailSubscribe from "../shared/ui/EmailSubscribe";
import Video from "../shared/ui/Video";

export default function Krakow() {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col items-end md:flex-row w-full">
        <KrakowText className="w-full ld:w-[60%] px-[5%] lg:px-64 mx-auto mb-32 lg:mb-0" />
        <div className="w-full md:w-[40%] md:pr-24 flex flex-col gap-16 justify-between pb-32 md:pb-24 px-24 md:px-0">
          <h4 className="text-2xl text-gray font-bold anim-text-lines text-center md:text-start">
            Spuštění začíná v Krakowě
          </h4>
          <p className="text-xl text-gray anim-text-lines md:text-start text-center">
            Kraków je první město, kde aplikaci testujeme. Zapiš se a získej
            přístup jako jeden z prvních.
          </p>
        </div>
      </div>
      <div className="w-full relative overflow-hidden md:h-auto">
        {/* <MetemiBottom className="absolute text-white z-[5] left-1/2 -translate-x-1/2 w-[100vw] -top-4 md:-top-12" /> */}
        <h2
          data-letter-spacing-scrub
          className="text-stroke  text-[27vw]/[65%] absolute top-0 z-[5] left-1/2 -translate-x-1/2"
        >
          METEMI
        </h2>

        <Video
          src="/videos/krakow.mp4"
          className="md:aspect-[261/101] relative w-full object-cover parallax-object"
          aria-label="Krakow timelapse"
          data-speed-y="0.5"
        />
        {/* <Image
          src="/images/krakow-bg-4.jpg"
          alt="Krakow"
          width={800}
          height={200}
          className="md:aspect-[261/101] relative w-full object-cover parallax-object"
          data-speed-y="0.5"
        /> */}
        <div className="absolute bottom-[20%] max-w-screen left-1/2 -translate-x-1/2 flex flex-col items-center gap-8">
          <p className="text-2xl-small text-white anim-text-lines">
            <span className="font-bold">Chci pozvánku</span> jako první
          </p>
          <EmailSubscribe variant="secondary" className="w-[90%]" />
        </div>
      </div>
    </div>
  );
}
