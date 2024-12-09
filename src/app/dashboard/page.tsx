"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  // {
  //   label: "Video Generation",
  //   icon: VideoIcon,
  //   href: "/video",
  //   color: "text-orange-700",
  //   bgColor: "bg-orange-700/10",
  // },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   href: "/music-generation",
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  // },
];

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
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center gap-4 hover:shadow-md transition cursor-pointer"
          >
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
            <div className="font-semibold">{tool.label}</div>
            <ArrowRight className="ml-auto" />
          </Card>
        ))}
      </div>
    </div>
  );
}
