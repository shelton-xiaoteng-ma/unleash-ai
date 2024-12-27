"use client";

import { tools } from "@/app/(dashboard)/dashboard/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/features/subscription/store/use-pro-modal";
import { useCreateCheckoutSession } from "@/features/stripe/api/use-create-checkout-session";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ProModal = () => {
  const { isOpen, close } = useProModal();

  const router = useRouter();

  const { mutate: createCheckoutSession, isPending } =
    useCreateCheckoutSession();

  const onSubscribe = () => {
    createCheckoutSession(undefined, {
      onSuccess: (data) => {
        if (data.url) {
          router.push(data.url);
        }
      },
      onError: () => {
        toast.error("Failed to create checkout session");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-4 pb-2">
            Upgrade to Pro
            <Badge className="uppercase text-sm p-1 rounded-md">pro</Badge>
          </DialogTitle>
        </DialogHeader>
        {tools.map((tool) => (
          <Card
            key={tool.label}
            className="p-3 flex items-center justify-between border-black/5"
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-6 h-6", tool.color)} />
              </div>
              <div className="text-sm font-semibold">{tool.label}</div>
            </div>
            <Check />
          </Card>
        ))}
        <DialogFooter>
          <Button
            variant="premium"
            className="w-full font-semibold"
            onClick={onSubscribe}
            disabled={isPending}
          >
            Upgrade <Zap />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
