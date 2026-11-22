# Summora

Summora uses [Better Auth](https://www.better-auth.com/) for email/password
authentication and optional Google sign-in. Authentication runs in the Next.js
app and stores users, sessions, and accounts in PostgreSQL.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a PostgreSQL
   database. Set `BETTER_AUTH_SECRET` to a random secret of at least 32
   characters (for example, generate one with `openssl rand -base64 32`) and
   `BETTER_AUTH_URL` to the app's base URL.
3. Generate and apply Better Auth's database schema:

   ```bash
   npm run auth:migrate
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

Email/password sign-in and account creation are available by default.

## Google sign-in

Create a Google OAuth client in Google Cloud Console and add these authorized
redirect URIs:

- Local: `http://localhost:3000/api/auth/callback/google`
- Production: `https://your-domain.example/api/auth/callback/google`

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`. The Google
sign-in button appears only when both values are configured. `BETTER_AUTH_URL`
must match the app's deployed origin.
