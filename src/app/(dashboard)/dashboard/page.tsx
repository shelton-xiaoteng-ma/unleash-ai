"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { tools } from "./constants";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div>
      <div className="pb-8 space-y-4">
        <h2 className="text-center text-2xl md:text-4xl font-bold">
          Exploring the Capabilities of AI
        </h2>
        <p className="text-muted-foreground text-sm md:text-lg font-light text-center">
          Chat or Generate Image/Code - Enjoy the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => {
              if (!tool.disable) router.push(tool.href);
            }}
            key={tool.href}
            className="p-4 border-black/5 flex items-center gap-4 hover:shadow-md transition cursor-pointer"
          >
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
            <div className="font-semibold">
              {tool.label}
              {tool.disable && (
                <p className="text-muted-foreground text-sm">Coming soon</p>
              )}
            </div>
            <ArrowRight className="ml-auto" />
          </Card>
        ))}
      </div>
    </div>
  );
}
