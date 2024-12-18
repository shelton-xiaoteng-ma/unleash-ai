import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { replicate } from "@/lib/replicate";
import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { z } from "zod";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
        aspectRatio: z.string(),
        outputFormat: z.string(),
        modelName: z
          .string()
          .optional()
          .default(process.env.REPLICATE_DEFAULT_MODEL_ID!),
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
        return c.json({ message: "" }, 403);
      }

      const { prompt, aspectRatio, outputFormat, modelName } =
        c.req.valid("json");

      try {
        const options = {
          model: modelName,
          input: {
            prompt: prompt,
            aspect_ratio: aspectRatio,
            output_format: outputFormat,
          },
        };
        const prediction = await replicate.predictions.create(options);

        await increaseApiLimit();

        if (prediction?.error) {
          return c.json({ detail: prediction.error }, 500);
        }

        return c.json({ prediction }, 200);
      } catch (error) {
        return c.json({ message: "Internal server error", error: error }, 500);
      }
    }
  )
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      return c.json({ detail: prediction.error }, 500);
    }
    let imageUrl: string | null = null;
    // type Status = "starting" | "processing" | "succeeded" | "failed" | "canceled";
    if (prediction?.status === "succeeded") {
      imageUrl = prediction.output[0];
    }
    return c.json(
      {
        prediction_status: prediction?.status,
        imageUrl: imageUrl,
      },
      200
    );
  });

export default app;
