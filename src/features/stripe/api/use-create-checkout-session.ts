import { APIError } from "@/lib/errors";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.stripe)["create-checkout-session"]["$get"],
  200
>;

export const useCreateCheckoutSession = () => {
  const query = useQuery({
    queryKey: ["stripe", "create-checkout-session"],
    queryFn: async () => {
      const response = await client.api.stripe[
        "create-checkout-session"
      ].$get();
      if (!response.ok) {
        throw new APIError("Failed to create checkout session", response);
      }
      return await response.json();
    },
  });

  return query;
};
