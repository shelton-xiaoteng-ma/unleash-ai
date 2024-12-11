import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import conversation from "./conversation";

// Set "edge" if planning on planning with edge on Vercel
// export const runtime = "nodejs";
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use(
  "*",
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/conversation", conversation);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
