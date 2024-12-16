import { client } from "@/lib/hono";
import { replicatePendingStatus } from "@/lib/replicate";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.image)[":id"]["$get"],
  200
>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useImageGetPrediction = (id: string | null) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["image", { id }],
    queryFn: async () => {
      if (!id) return null;
      await delay(3000);
      const response = await client.api.image[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      return await response.json();
    },
    retry: (failureCount, error) => {
      if (error?.message === "Failed to fetch prediction") {
        return false;
      }
      return failureCount < 5;
    },
    refetchInterval: (data) => {
      if (data.state.data?.prediction_status === "processing") {
        return 2000;
      }
      if (data.state.data?.prediction_status === "starting") {
        return 5000;
      }
      return false;
    },
  });

  const isPending =
    query.isFetching ||
    (query.data?.prediction_status &&
      replicatePendingStatus.includes(query.data.prediction_status));
  return { ...query, isPending };
};
