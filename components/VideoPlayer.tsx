import { useState } from 'react';

const VideoPlayer = ({ src, thumbnail }) => {
  const [playVideo, setPlayVideo] = useState(false);

  const handlePlayVideo = (event) => {
    if (src) {
      event.stopPropagation();  // Prevent click from reaching the card
      setPlayVideo(true);
    }
  };

  const handleOutsideClick = (event) => {
    if (src) {
      event.stopPropagation();  // Prevent click from reaching the card
      setPlayVideo(false);      // Close the video player
    }
  };

  const handleVideoClick = (event) => {
    event.stopPropagation();  // Keep clicks on the video from closing it
  };

  return (
    <div className="relative w-full max-w-xl">
      {!playVideo ? (
        <div className="relative cursor-pointer" onClick={handlePlayVideo}>
          <img src={thumbnail} alt="Video Thumbnail" className="w-full block" />
          {src && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button className="text-white text-6xl">▶</button>
            </div>
          )}
        </div>
      ) : (
        <div className="fixed inset-0 p-28 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={handleOutsideClick}>
          <video src={src} autoPlay controls className="w-full h-full" onClick={handleVideoClick}>
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
