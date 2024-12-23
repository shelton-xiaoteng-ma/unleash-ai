import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

// Store messages in memory (per server instance)
export const messageStore: Record<
  string,
  Array<{ role: string; content: string }>
> = {};

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      message: z.string(),
      model: z.string().optional().default(process.env.DEFAULT_MODEL!),
    })
  ),
  async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "Unauthorized",
        },
        401
      );
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return c.json({ message: "Free trial has expired" }, 403);
    }

    const { message, model } = c.req.valid("json");

    // Initialize message store for user if it doesn't exist
    if (!messageStore[auth.userId]) {
      messageStore[auth.userId] = [];
    }

    // Add user message to store
    messageStore[auth.userId].push({
      role: "user",
      content: message,
    });

    // Get AI response
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_AI_KEY}`,
          "HTTP-Referer": `${process.env.NEXT_PUBLIC_APP_URL}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messageStore[auth.userId],
        }),
      }
    );

    await increaseApiLimit();

    const aiResponse = await response.json();

    // Add AI response to store
    if (aiResponse.choices && aiResponse.choices[0]?.message) {
      messageStore[auth.userId].push(aiResponse.choices[0].message);
    }

    // Return all messages for this user
    return c.json({
      messages: messageStore[auth.userId],
      error: aiResponse.error,
    });
  }
);

export default app;
