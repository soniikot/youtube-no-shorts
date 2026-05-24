import type { AuthState, UserProfile } from '../types';

interface HeaderProps {
  authState: AuthState;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ authState, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">
          <span className="logo">▶</span>
          YouTube Without Shorts
        </h1>
        <div className="auth-section">
          {authState.type === 'guest' ? (
            <button className="login-button" onClick={onLogin}>
              Sign In
            </button>
          ) : (
            <div className="user-menu">
              <span className="user-name">{authState.user.name}</span>
              <button className="logout-button" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Simple in-memory auth state (guest mode by default)
// For real OAuth, you'd integrate with Google Identity Services
export function useAuth() {
  const getStoredAuth = (): AuthState => {
    const stored = localStorage.getItem('yt-auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.type === 'authenticated' && parsed.user) {
          return parsed;
        }
      } catch {
        // Invalid stored auth, fall back to guest
      }
    }
    return { type: 'guest' };
  };

  const setAuth = (auth: AuthState) => {
    if (auth.type === 'guest') {
      localStorage.removeItem('yt-auth');
    } else {
      localStorage.setItem('yt-auth', JSON.stringify(auth));
    }
  };

  return {
    getStoredAuth,
    setAuth,
  };
}

// Mock login - in production, integrate with Google OAuth
export function initiateLogin(): Promise<UserProfile> {
  // For demo purposes, simulate OAuth flow
  // In production, use @react-oauth/google or similar
  return new Promise((resolve) => {
    // Simulate OAuth popup flow
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // This would be replaced with real Google OAuth URL
    const oauthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      redirect_uri: window.location.origin + '/auth/callback',
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
      state: 'auth-state',
    }).toString();

    const popup = window.open(oauthUrl, 'Google Login', `width=${width},height=${height},left=${left},top=${top}`);

    // For demo: resolve with mock user after delay
    // In production, listen for OAuth callback
    setTimeout(() => {
      popup?.close();
      resolve({
        id: 'demo-user',
        name: 'Demo User',
        avatarUrl: 'https://www.gstatic.com/images/branding/product/1x/avatar_square_grey_512dp.png',
      });
    }, 1000);
  });
}
