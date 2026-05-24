export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
}

export interface SearchResult {
  videos: Video[];
  nextPageToken?: string;
  totalResults?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
}

export type AuthState = 
  | { type: 'guest' }
  | { type: 'authenticated'; user: UserProfile };
