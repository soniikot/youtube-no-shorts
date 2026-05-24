import { useState, useCallback } from "react";
import type { Video, AuthState, UserProfile } from "./types";
import { searchVideos } from "./services/youtube";
import { SearchBar } from "./components/SearchBar";
import { VideoGrid } from "./components/VideoGrid";
import { VideoPlayer } from "./components/VideoPlayer";
import { Header } from "./components/Header";
import { LoadingSpinner, ErrorMessage, NoApiKeyWarning } from "./components/StatusComponents";
import "./App.css";

// Get API key from environment
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";

function App() {
  const [authState, setAuthState] = useState<AuthState>({ type: "guest" });
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!API_KEY) {
      setError("YouTube API key is not configured");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await searchVideos(query, API_KEY);
      setVideos(result.videos);
      setSelectedVideo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVideoSelect = useCallback((video: Video) => {
    setSelectedVideo(video);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const handleLogin = useCallback(async () => {
    // In production, integrate with Google OAuth
    const mockUser: UserProfile = {
      id: "demo-user",
      name: "Demo User",
      avatarUrl: "https://www.gstatic.com/images/branding/product/1x/avatar_square_grey_512dp.png",
    };
    setAuthState({ type: "authenticated", user: mockUser });
  }, []);

  const handleLogout = useCallback(() => {
    setAuthState({ type: "guest" });
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setHasSearched(false);
  }, []);

  return (
    <div className="app">
      <Header authState={authState} onLogin={handleLogin} onLogout={handleLogout} />

      <main className="app-main">
        {!API_KEY ? (
          <NoApiKeyWarning />
        ) : selectedVideo ? (
          <VideoPlayer video={selectedVideo} onBack={handleBack} />
        ) : (
          <>
            <div className="search-section">
              <SearchBar onSearch={handleSearch} />
            </div>

            {isLoading && <LoadingSpinner />}

            {error && <ErrorMessage message={error} onRetry={handleRetry} />}

            {!isLoading && !error && hasSearched && <VideoGrid videos={videos} onVideoSelect={handleVideoSelect} />}

            {!isLoading && !error && !hasSearched && (
              <div className="welcome-message">
                <h2>Welcome to YouTube Without Shorts</h2>
                <p>Search for videos without distractions. No Shorts, no recommendations, just the content you need.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
