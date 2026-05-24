# YouTube No-Shorts Clone Constitution

## Core Principles

### I. React-First Frontend

Single-page application built with React; Functional components with hooks; Modern React patterns (no class components); Component-based architecture with clear separation of concerns.

### II. YouTube API Integration

All video data sourced from official YouTube Data API v3; API client must handle authentication, rate limiting, and error states gracefully; No direct scraping or unofficial endpoints.

### III. Search-Only Scope (NO SHORTS)

- Search functionality: Users can search for videos via YouTube API
- Video display: Show standard video results only
- **Shorts exclusion**: Filter out all YouTube Shorts from search results and UI
- No Shorts tab, no Shorts feed, no Shorts recommendations

### IV. Minimal UI Design

Simple, clean interface focused on core functionality:

- Search bar (prominent, always accessible)
- Video results grid/list
- Basic video player or link to YouTube
- No comments, no recommendations sidebar, no complex navigation

### V. Test-First Development

Tests written before implementation for core functionality:

- Search component behavior
- API client integration
- Shorts filtering logic
- Error handling states

## Technical Requirements

### Stack

- **Frontend**: React 18+
- **HTTP Client**: Axios for YouTube API calls
- **Styling**: CSS Modules
- **Build**: Vite

### API Requirements

- YouTube Data API v3 integration
- Environment variable for API key management (`.env`)
- Handle quota limits and API errors gracefully

### Shorts Filtering

- Detect Shorts via URL pattern (`/shorts/`) or video metadata
- Exclude Shorts from all search results and displays

## Development Workflow

### Code Quality

- ESLint + Prettier for consistent formatting
- Component documentation via JSDoc comments
- Meaningful variable and component names
- Follow YAGNI, DRY, KISS
- Do not do premature optimization

### Git Workflow

- Feature branches for new functionality
- Descriptive commit messages
- PR review required for merges

**Version**: 1.0.0 | **Ratified**: 2026-04-26 | **Last Amended**: 2026-04-26
