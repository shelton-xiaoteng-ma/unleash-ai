"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";

interface NavbarProps {
  apiLimitCount: number;
}

export const Navbar = ({ apiLimitCount }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
