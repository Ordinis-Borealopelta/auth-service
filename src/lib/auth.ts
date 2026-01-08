import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, jwt, organization } from "better-auth/plugins";
import { db } from "../db";
import { APP_NAME, COOKIE_PREFIX, PASSWORD_ALGORITHM } from "./constants";

export const auth = betterAuth({
  baseURL: process.env.GATEWAY_URL,
  appName: APP_NAME,
  advanced: {
    cookiePrefix: COOKIE_PREFIX,
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 6,
    maxPasswordLength: 64,
    password: {
      hash: (password) => Bun.password.hash(password, PASSWORD_ALGORITHM),
      verify: ({ password, hash }) =>
        Bun.password.verify(password, hash, PASSWORD_ALGORITHM),
    },
  },
  experimental: { joins: true },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [jwt(), organization(), admin()],
});
