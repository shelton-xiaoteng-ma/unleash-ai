"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import TypewritterComponent from "typewriter-effect";

export const LandingHero = () => {
  return (
    <div className="font-bold py-28 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-8">
        <h1>Unleash the Potential of AI</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
          <TypewritterComponent
            options={{
              strings: ["Chatbot.", "Image Generation.", "Video Generation."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-gray-100">
        Taste the charm of AI
      </div>
      <div>
        <Link href="/dashboard">
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generateing For Free
          </Button>
        </Link>
      </div>
    </div>
  );
};
