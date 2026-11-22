import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const googleCredentials =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    : undefined;

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  ...(googleCredentials
    ? {
        socialProviders: {
          google: googleCredentials,
        },
      }
    : {}),
});
