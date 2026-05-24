import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <div className="video-card" onClick={() => onSelect(video)}>
      <div className="video-thumbnail">
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        <span className="video-duration">{video.duration}</span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channelTitle}</p>
        <p className="video-date">
          {new Date(video.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="no-results">
        <p>No videos found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onSelect={onVideoSelect}
        />
      ))}
    </div>
  );
}
