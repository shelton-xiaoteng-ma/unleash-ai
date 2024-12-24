import { APIError } from "@/lib/errors";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  typeof client.api.conversation.$post,
  200
>;

type RequestType = InferRequestType<
  typeof client.api.conversation.$post
>["json"];

export const useSendMessage = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.conversation.$post({ json });
      if (!response.ok) {
        throw new APIError("Something went wrong", response);
      }
      return await response.json();
    },
  });
  return mutation;
};