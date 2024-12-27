import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ["getSubscription"],
    queryFn: async () => {
      try {
        const response = await client.api.subscription.$get();
        if (!response.ok) {
          throw new Error("Failed to fetch subscription");
        }
        return response.json();
      } catch (error) {
        throw new Error(`Error fetching subscription: ${error}`);
      }
    },
  });
  return query;
};
