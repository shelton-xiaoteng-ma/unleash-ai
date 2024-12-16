import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Image prompt is required." }),
  aspectRatio: z.string().min(1),
  outputFormat: z.string().min(1),
});

export const amountOptions = [
  { value: "1", label: "1 Photo" },
  { value: "2", label: "2 Photos" },
  { value: "3", label: "3 Photos" },
  { value: "4", label: "4 Photos" },
  { value: "5", label: "5 Photos" },
];

export const resolutionOptions = [
  {
    value: "256*256",
    label: "256*256",
  },
  {
    value: "512*512",
    label: "512*512",
  },
  {
    value: "1024*1024",
    label: "1024*1024",
  },
];

export const aspectRatioOptions = [
  {
    value: "16:9",
    label: "16:9",
  },
  {
    value: "9:16",
    label: "9:16",
  },
  {
    value: "21:9",
    label: "21:9",
  },
  {
    value: "9:21",
    label: "9:21",
  },
  {
    value: "1:1",
    label: "1:1",
  },
  {
    value: "3:2",
    label: "3:2",
  },
  {
    value: "2:3",
    label: "2:3",
  },
];

export const outputFormatOptions = [
  {
    value: "webp",
    label: "webp",
  },
  {
    value: "png",
    label: "png",
  },
  {
    value: "jpg",
    label: "jpg",
  },
];
