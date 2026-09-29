# NEXORA Website

## Run locally
1. Install Node.js 20+
2. Open this folder in a terminal
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## Publish free on Vercel
Push this folder to GitHub, import the repository into Vercel, and deploy.

## Before publishing
The permanent Discord invite is already configured: `https://discord.gg/3yWX2qTUZ`.
Replace the placeholder Instagram / YouTube / Twitch `#` links in the footer.

## Automatic game release calendar
Set `RAWG_API_KEY` in the deployment environment (and `.env.local` for local development). Get a key from https://rawg.io/apidocs. The `/releases` page fetches upcoming titles through the server, keeps the key private, and refreshes its cached data every six hours. It credits RAWG on the page. Without a key, the calendar shows a setup message instead of invented release dates.
