import { SignedIn, UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      Dashboard Page (Protected)
    </div>
  );
}
