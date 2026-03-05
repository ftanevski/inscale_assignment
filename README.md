# TripX Destinations

A Next.js application where users can log in and browse travel destinations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx              Root layout
  page.tsx                Redirects to /login
  login/page.tsx          Login view
  destinations/page.tsx   Destinations list view
components/               Reusable UI components
hooks/                    Custom React hooks
lib/                      API helpers and utilities
types/                    Shared TypeScript types
```
