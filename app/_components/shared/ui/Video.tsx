"use client";

import React, { useRef, useEffect } from "react";

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export default function Video({
  src,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  poster,
  "aria-label": ariaLabel = "Video",
  onLoadedData,
  onError,
  ...rest
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) {
      return;
    }

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("touchstart", playOnInteraction);
          document.removeEventListener("click", playOnInteraction);
        };

        document.addEventListener("touchstart", playOnInteraction, { once: true });
        document.addEventListener("click", playOnInteraction, { once: true });
      }
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, [autoPlay, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      poster={poster}
      aria-label={ariaLabel}
      onLoadedData={onLoadedData}
      onError={onError}
      // Essential mobile attributes
      webkit-playsinline="true"
      preload="metadata"
      {...rest}
    />
  );
}