"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-green-300",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-pink-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-yellow-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-600",
  },
  // {
  //   label: "Video Generation",
  //   icon: VideoIcon,
  //   href: "/video",
  //   color: "text-orange-700",
  // },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-black",
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   href: "/music-generation",
  //   color: "text-green-700",
  // },
];

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col space-y-4 py-4 bg-blue-400 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-4 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image src="/logo.png" fill alt="Logo" className="rounded-full" />
            {/* <Sparkle className="text-white size-8" /> */}
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Unleash AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="
                text-lg font-medium
                cursor-pointer p-5 w-full rounded-lg
                flex items-center flex-1
                group hover:text-white hover:bg-white/10 transition
                "
            >
              <route.icon
                className={cn(
                  "h-6 w-6 mr-3 group-hover:text-white",
                  route.color
                )}
              />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
