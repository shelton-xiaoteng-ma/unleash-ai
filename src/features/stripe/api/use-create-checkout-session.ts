import { APIError } from "@/lib/errors";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.stripe)["create-checkout-session"]["$post"],
  200
>;

export const useCreateCheckoutSession = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.stripe[
        "create-checkout-session"
      ].$post();
      if (!response.ok) {
        throw new APIError("Failed to create checkout session", response);
      }
      return await response.json();
    },
  });

  return mutation;
};
