"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <nav className="px-4 py-8 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-10 w-10 mr-4">
          <Image fill src="/logo.png" alt="logo" className="rounded-full" />
        </div>
        <h1 className="font-bold text-3xl">Unleash AI</h1>
      </Link>
      <div className="flex items-center justify-center gap-2 px-2">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="bg-blue-700 font-semibold text-lg"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
