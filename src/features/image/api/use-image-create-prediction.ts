import { APIError } from "@/lib/errors";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  typeof client.api.image.$post,
  200
>;

type RequestType = InferRequestType<typeof client.api.image.$post>["json"];

export const useImageCreatePrediction = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.image.$post({ json });
      if (!response.ok) {
        throw new APIError("Failed to send message", response);
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSubscription"] });
    },
  });
  return mutation;
};
