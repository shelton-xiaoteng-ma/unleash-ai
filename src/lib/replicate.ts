import Replicate, { Status } from "replicate";

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const replicatePendingStatus = ["starting", "processing"] as Status[];
