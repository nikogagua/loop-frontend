# Loop — Frontend

Loop is a Reddit-style posting app. Users can register, verify their email, create text/image posts, and manage their own content. This repo is the React frontend.

**Live app:** https://loop-frontend-roan.vercel.app
**Backend repo:** [loop-backend](https://github.com/nikogagua/loop-backend)
**Live API:** https://loop-backend-mvpx.onrender.com

## Features

- Register / login with JWT-based auth, persisted in localStorage
- Auto-logout when a session token expires or becomes invalid
- Protected routes (Create Post, My Posts, Edit Post)
- Post feed with pagination
- Create, edit, and delete your own posts
- Image upload with drag-and-drop, live preview, and remove
- Dark / light mode
- Fully custom-designed UI (no component library)

## Tech Stack

- **Framework:** React (Vite)
- **Routing:** React Router
- **State:** React Context (auth state, theme)
- **Styling:** Plain CSS with a custom design system (CSS variables)
- **Icons:** Lucide React
- **Hosting:** Vercel

## Getting Started

1. Clone the repo
2. `npm install`
3. Create a `.env` file:
   VITE_API_URL=http://localhost:3000

(use the live backend URL instead if you're not running the backend locally)

4. `npm run dev`

## Project Structure

src/
api/ # functions that call the backend
components/ # reusable UI pieces (Navbar, Post, Pagination, etc.)
context/ # AuthContext, ThemeContext
pages/ # route-level pages (Home, Login, Register, etc.)
styles/ # shared CSS files

## What I Learned

Building Loop's frontend taught me React Router (nested layout routes, protected routes), the Context API for global state (auth, theme), controlled forms vs. FormData for file uploads, building a design system from scratch with CSS variables, and deploying to Vercel — including debugging case-sensitive import paths that only surfaced on Linux build servers.
