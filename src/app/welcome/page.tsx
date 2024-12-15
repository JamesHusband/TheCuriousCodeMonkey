"use client";

import { useRouter } from "next/navigation";
import { Hero } from "../components/Hero";

export default function WelcomePage() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    router.push("/");
  };

  return <Hero onAnimationComplete={handleAnimationComplete} />;
}
