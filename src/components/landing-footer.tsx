import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const LandingFooter = () => {
  return (
    <div className="mt-4">
      <h2 className="text-center text-2xl font-semibold mb-2">More</h2>
      <div className="flex flex-col items-center justify-center py-4 px-8 md:px-16 gap-2">
        <Link
          href="https://github.com/shelton-xiaoteng-ma/unleash-ai"
          aria-label="Personal Homepage"
        >
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-left flex items-center"
          >
            <FaGithub className="mr-2 size-5" />
            <p className="text-lg md:text-2xl">View Source Code</p>
          </Button>
        </Link>
        <Link href="https://sheltonma.top/" aria-label="Personal Homepage">
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-left flex items-center"
          >
            <Home className="mr-2 size-8" />
            <p className="text-lg md:text-2xl">Visit Homepage</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
