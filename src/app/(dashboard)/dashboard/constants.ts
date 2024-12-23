import { ImageIcon, MessageSquare, VideoIcon } from "lucide-react";

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    disable: false,
  },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   href: "/code",
  //   color: "text-yellow-500",
  //   bgColor: "bg-yellow-500/10",
  // },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    disable: false,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    disable: true,
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   href: "/music-generation",
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  // },
];
