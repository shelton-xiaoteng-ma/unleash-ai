import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return c.json({ apiLimitCount, isPro });
});

export default app;
