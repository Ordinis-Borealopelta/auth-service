import { serve } from "bun";
import { Hono } from "hono";
import { auth } from "./lib/auth";

const port = Bun.env.AUTH_PORT || 4000;

const app = new Hono();

app.get("/health", (c) => {
  return c.json({
    status: "ok",
  });
});

app.on(["GET", "POST"], "*", (c) => auth.handler(c.req.raw));

serve({
  fetch: app.fetch,
  port,
  error: (error) => {
    console.log(error.message);
  },
});

console.log(`Auth service started at http://localhost:${port}`);
