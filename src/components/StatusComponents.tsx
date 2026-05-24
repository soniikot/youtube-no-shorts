export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="error-container">
      <div className="error-icon">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
      </div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export function NoApiKeyWarning() {
  return (
    <div className="warning-container">
      <div className="warning-icon">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
          />
        </svg>
      </div>
      <h2>YouTube API Key Required</h2>
      <p>
        To use this app, you need a YouTube Data API v3 key.
      </p>
      <ol className="setup-steps">
        <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
        <li>Create a new project or select an existing one</li>
        <li>Enable the YouTube Data API v3</li>
        <li>Create credentials (API Key)</li>
        <li>Copy your API key and create a <code>.env</code> file in the project root</li>
        <li>Add this line: <code>VITE_YOUTUBE_API_KEY=your_api_key_here</code></li>
      </ol>
      <p className="warning-note">
        Your API key is stored locally and never sent to any server except YouTube's API.
      </p>
    </div>
  );
}
