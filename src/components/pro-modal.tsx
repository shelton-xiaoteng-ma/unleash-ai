"use client";

import { tools } from "@/app/(dashboard)/dashboard/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useProModal } from "@/features/saas/store/use-pro-modal";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";

export const ProModal = () => {
  const { isOpen, close } = useProModal();
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
          <Button variant="premium" className="w-full font-semibold">
            Upgrade <Zap />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
