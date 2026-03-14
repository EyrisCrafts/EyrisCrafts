'use client';

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src?: string;
  thumbnail: string;
  isHovering: boolean;
  onVideoClick?: () => void;
}

const VideoPlayer = ({ src, thumbnail, isHovering, onVideoClick }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !src) return;

    if (isHovering) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovering, src]);

  const handleClick = (e: React.MouseEvent) => {
    if (onVideoClick) {
      e.stopPropagation();
      onVideoClick();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden" onClick={handleClick}>
      <img
        src={thumbnail}
        alt="Project thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovering && src ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {src && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
