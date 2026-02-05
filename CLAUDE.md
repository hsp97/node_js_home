# CLAUDE.md - AI Assistant Guide for node_js_home

## Project Overview

**Project Name**: node_js_home (Deeplink / 딮링크)
**Description**: A Discord Music/Media Bot with Web Interface - designed to integrate with Discord for music/media functionality via YouTube
**Stage**: Early development (prototype)
**Primary Language**: JavaScript (Node.js)
**UI Language**: Korean (한국어)

## Repository Structure

```
node_js_home/
├── backend/                    # Node.js Express server
│   ├── index.js               # Server entry point (Express app)
│   ├── package.json           # Backend dependencies
│   └── package-lock.json      # Locked dependency versions
├── frontend/                   # Web UI (login interface)
│   ├── index.html             # Login form page
│   ├── script.js              # Client-side JavaScript
│   ├── style.css              # CSS styling
│   └── bgLogin.jpg            # Background image
├── .gitignore                  # Node.js standard gitignore
└── CLAUDE.md                   # This file
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Discord Integration**: Discord.js v14.15.2, @discordjs/voice v0.17.0 (installed but not yet implemented)
- **Media**: ytdl-core v4.11.5 for YouTube downloads (installed but not yet implemented)
- **Middleware**: CORS v2.8.5
- **Dev Tools**: Nodemon v3.1.0

### Frontend
- **Markup**: Vanilla HTML5
- **Styling**: CSS3 (flexbox, modern features)
- **JavaScript**: Vanilla JS with Fetch API
- **Libraries**: jQuery v3.5.1, Font Awesome v6.4.0 (CDN)

## Quick Start

### Install Dependencies
```bash
cd backend
npm install
```

### Run Development Server
```bash
# From backend directory
npx nodemon index.js
# OR
node index.js
```

### Server Port
The server runs on **port 3000** by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves frontend index.html |
| `GET` | `/test` | Returns test string |
| `POST` | `/textUrl` | Accepts JSON with `name` and `name2` fields |

### POST /textUrl Example
```javascript
// Request
fetch('http://localhost:3000/textUrl', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'value1', name2: 'value2' })
});

// Response
{ "message": "OK", "data": { "name": "...", "name2": "..." } }
```

## Code Conventions

### Backend (Node.js)
- Comments may be in Korean
- Uses CommonJS module system (`require`)
- Express app pattern with middleware chain
- Console.log for debugging output

### Frontend (JavaScript)
- Async/await with try/catch for API calls
- Arrow functions preferred
- CamelCase function naming (e.g., `getData`, `getForm`, `getSpinner`)
- Fetch API for HTTP requests (not jQuery.ajax)

### CSS
- Flexbox for layouts
- Viewport-relative units where appropriate
- Modern features (backdrop-filter, rgba)

## Key Files Reference

### backend/index.js
Main Express server setup:
- Lines 1-5: Dependencies and app initialization
- Lines 6-8: Middleware (CORS, JSON parser, URL-encoded parser)
- Lines 10-20: POST /textUrl route
- Lines 22-26: GET / route (serves frontend)
- Lines 28-30: GET /test route
- Lines 32-34: Server listener on port 3000

### frontend/script.js
Client-side logic:
- `getData()`: Sends form data to backend via POST
- `getForm()`: Reads and parses URL parameters into form
- `getSpinner()`: Toggles loading spinner visibility
- URL parameter handling for state persistence

### frontend/index.html
Login form UI with:
- Username/password inputs
- Three action buttons (Login, Login2, Login3)
- Loading spinner component

## Development Notes

### Known Issues & Technical Debt
1. **Unused Dependencies**: Discord.js, @discordjs/voice, and ytdl-core are installed but not implemented
2. **Hardcoded Paths**: Backend expects frontend at `/webService/frontend/` path
3. **No Error Handling**: Express routes lack try/catch and error middleware
4. **No Input Validation**: Request body is used directly without validation
5. **No Environment Configuration**: No .env file setup for secrets/config
6. **No Tests**: No testing framework or test files present

### Deployment Considerations
- Frontend references `http://localhost:3000` - needs environment-based configuration for production
- CSS paths reference `/webService/frontend/` structure
- No build process configured

## Git Workflow

### Branch Naming
Development branches should follow the pattern: `claude/claude-md-*`

### Commit Messages
The project uses Korean commit messages:
- "node js 딮링크 백앤드 폴더" (backend folder setup)
- "딮링크 node js 세팅 프론트" (frontend setup)

## Future Implementation Areas

Based on installed but unused dependencies, planned features include:
1. **Discord Bot**: Using Discord.js for bot functionality
2. **Voice Integration**: Using @discordjs/voice for voice channel features
3. **YouTube Playback**: Using ytdl-core for streaming YouTube audio

## Security Considerations

When implementing features, be aware of:
- No input validation currently exists
- CORS is open to all origins (`*`)
- No authentication/authorization implemented
- Sensitive data (Discord tokens, etc.) should use environment variables

## Testing

Currently no testing infrastructure. When adding tests:
- Consider Jest or Mocha for backend testing
- Add npm scripts for test execution
- Implement integration tests for API endpoints

## Commands Reference

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start server (production)
node index.js

# Start server (development with auto-reload)
npx nodemon index.js

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

*Last updated: 2026-02-05*
