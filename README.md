# YouTube Without Shorts

A distraction-free YouTube client that filters out Shorts and recommendations, letting you search and watch videos without getting sidetracked.

## Features

- 🔍 **Search YouTube videos** using the official YouTube Data API v3
- 🚫 **No Shorts** - automatically filters out videos 60 seconds or shorter
- 🎯 **No recommendations** - clean interface with no "up next" or related videos
- 👤 **Guest mode** - use immediately without signing in
- 🔐 **Optional login** - sign in with your Google account (demo mode available)
- 📱 **Responsive design** - works on desktop and mobile

## Quick Start

### 1. Get a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Create credentials → API Key
5. Copy your API key

### 2. Configure the Application

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your API key:

```
VITE_YOUTUBE_API_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

This app can be deployed to any static hosting platform:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop).

### Manual

Upload the contents of `dist/` to your web server.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with auth
│   ├── SearchBar.tsx       # Search input component
│   ├── VideoGrid.tsx       # Video results display
│   ├── VideoPlayer.tsx     # YouTube player wrapper
│   └── StatusComponents.tsx # Loading, error, warning states
├── services/
│   └── youtube.ts          # YouTube API integration
├── types.ts                # TypeScript types
├── App.tsx                 # Main app component
├── App.css                 # App styles
├── index.css               # Global styles
└── main.tsx                # Entry point
```

## API Usage

The app uses the YouTube Data API v3:

- `search.list` - Search for videos
- `videos.list` - Get video details (for duration filtering)

**Note:** YouTube API has quota limits. Personal use should stay well within free tier limits.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **YouTube IFrame Player API** for video playback
- **CSS** for styling (no framework dependencies)

## License

MIT
