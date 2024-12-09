"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
