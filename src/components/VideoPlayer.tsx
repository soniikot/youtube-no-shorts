import { useEffect, useRef } from 'react';
import type { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
}

export function VideoPlayer({ video, onBack }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame Player API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Player will be created when API is ready
    const createPlayer = () => {
      if (playerRef.current && !(window as any).YT?.Player) {
        return;
      }

      playerInstance.current = new (window as any).YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: video.id,
        playerVars: {
          // Hide related videos at the end (show channel's other videos instead)
          rel: 0,
          // Disable keyboard controls to prevent navigation away
          disablekb: 0,
          // Modest branding
          modestbranding: 1,
          // No autoplay
          autoplay: 0,
        },
      });
    };

    // Check if API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      // Wait for API to be ready
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
    };
  }, [video.id]);

  return (
    <div className="video-player-container">
      <button className="back-button" onClick={onBack} aria-label="Back to results">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          />
        </svg>
        Back to results
      </button>
      <div className="video-player-wrapper">
        <div ref={playerRef} id="youtube-player" />
      </div>
      <div className="video-details">
        <h1 className="video-player-title">{video.title}</h1>
        <p className="video-player-channel">{video.channelTitle}</p>
        <p className="video-player-description">{video.description}</p>
      </div>
    </div>
  );
}
