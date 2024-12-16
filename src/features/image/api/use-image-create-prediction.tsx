import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

export type ResponseType = InferResponseType<
  typeof client.api.image.$post,
  200
>;

type RequestType = InferRequestType<typeof client.api.image.$post>["json"];

export const useImageCreatePrediction = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.image.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });
  return mutation;
};
