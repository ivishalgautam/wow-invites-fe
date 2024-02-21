import { formatDuration } from "@/utils/formatDuration";
import React, { useRef, useState } from "react";

export default function VideoThumbnail({ src }) {
  const [duration, setDuration] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const generateThumbnail = (e) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas && video.readyState === 4) {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL("image/jpeg");
      setThumbnailUrl(thumbnail);
    }
  };

  const handleLoadedMetaData = (e) => {
    generateThumbnail(e);
    setDuration(formatDuration(e.target.duration));
  };

  return (
    <>
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${src}`}
        controls
        onLoadedMetadata={handleLoadedMetaData}
        poster={thumbnailUrl}
        className="hidden"
      ></video>

      <div className="relative">
        <span className="absolute right-0 top-0 rounded bg-black px-1 py-0.5 text-white">
          {duration}
        </span>
        <video width="400" preload="metadata">
          <source
            src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${src}#t=0.4`}
            type="video/mp4"
          />
        </video>
      </div>
    </>
  );
}
