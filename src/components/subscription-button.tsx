"use client";

import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession } from "@/features/stripe/api/use-create-checkout-session";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateCheckoutSession();
  const onClick = async () => {
    // If the user is already on a pro plan, redirect them to the subscription management page
    mutate(undefined, {
      onSuccess: (data) => {
        if (data.url) {
          router.replace(data.url);
        } else {
          console.log(data);
          toast.error("Failed to redirect to checkout");
        }
      },
      onError: (error) => {
        toast.error(`Failed to create checkout session: ${error.message}`);
      },
    });
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      className="flex items-center"
      onClick={onClick}
      disabled={isPending}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="ml-2 fill-white" />}
    </Button>
  );
};
