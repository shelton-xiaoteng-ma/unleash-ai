import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      Landing page (Unprotected)
      <Button>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Button>
      <Button>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
}
