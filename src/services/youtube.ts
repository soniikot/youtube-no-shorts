import type { Video, SearchResult } from '../types';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Duration regex to extract minutes and seconds
const DURATION_REGEX = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

/**
 * Parses ISO 8601 duration to human-readable format
 */
function parseDuration(duration: string): string {
  const match = duration.match(DURATION_REGEX);
  if (!match) return 'Unknown';

  const [, hours, minutes, seconds] = match;
  const parts: string[] = [];

  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  return parts.join(' ') || '0s';
}

/**
 * Checks if a video is a YouTube Short
 * Shorts are typically under 60 seconds and have vertical aspect ratio
 * We filter based on duration being <= 60 seconds
 */
function isShort(duration: string): boolean {
  const match = duration.match(DURATION_REGEX);
  if (!match) return false;

  const [, hours, minutes, seconds] = match;
  const totalSeconds = 
    (hours ? parseInt(hours, 10) * 3600 : 0) +
    (minutes ? parseInt(minutes, 10) * 60 : 0) +
    (seconds ? parseInt(seconds, 10) : 0);

  // Shorts are 60 seconds or less
  return totalSeconds <= 60;
}

/**
 * Searches YouTube API for videos, filtering out Shorts
 */
export async function searchVideos(
  query: string,
  apiKey: string,
  pageToken?: string
): Promise<SearchResult> {
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '25',
    key: apiKey,
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const url = `${YOUTUBE_API_BASE}/search?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('YouTube API quota exceeded. Please try again later.');
    }
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const data = await response.json();

  // Fetch video details to get duration for Shorts filtering
  const videoIds = data.items?.map((item: any) => item.id.videoId).filter(Boolean) || [];
  
  if (videoIds.length === 0) {
    return { videos: [] };
  }

  const detailsParams = new URLSearchParams({
    part: 'snippet,contentDetails',
    id: videoIds.join(','),
    key: apiKey,
  });

  const detailsUrl = `${YOUTUBE_API_BASE}/videos?${detailsParams}`;
  const detailsResponse = await fetch(detailsUrl);

  if (!detailsResponse.ok) {
    throw new Error('Failed to fetch video details');
  }

  const detailsData = await detailsResponse.json();

  // Filter out Shorts and map to Video type
  const videos: Video[] = detailsData.items
    ?.filter((item: any) => !isShort(item.contentDetails?.duration || ''))
    .map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      duration: parseDuration(item.contentDetails?.duration || ''),
    })) || [];

  return {
    videos,
    nextPageToken: data.nextPageToken,
    totalResults: data.pageInfo?.totalResults,
  };
}
