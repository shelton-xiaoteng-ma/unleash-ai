"use client";

import { cn } from "@/lib/utils";
import {
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-green-300",
    disable: false,
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-pink-700",
    disable: false,
  },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   href: "/code",
  //   color: "text-yellow-500",
  // },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-600",
    disable: true,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    disable: true,
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-black",
    disable: true,
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   href: "/music-generation",
  //   color: "text-green-700",
  // },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const disableLink = (e: React.MouseEvent, disabled: boolean) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 py-4 bg-blue-700 text-white">
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
              onClick={(e) => {
                disableLink(e, route.disable);
              }}
              href={route.href}
              key={route.href}
              className={cn(
                "text-lg font-medium cursor-pointer p-5 w-full rounded-lg flex items-center flex-1 group hover:text-white hover:bg-white/10 transition",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-gray-100",
                route.disable && "text-muted-foreground"
              )}
            >
              <route.icon
                className={cn(
                  "h-6 w-6 mr-3 group-hover:text-white",
                  route.disable ? "text-muted-foreground" : route.color
                )}
              />
              <div>
                {route.label}
                {route.disable && (
                  <p className="text-muted-foreground text-sm">Coming soon</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
