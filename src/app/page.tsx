"use client";

import { useRouter } from "next/navigation";
import { Hero } from "@/features/hero/Hero";

export default function RootPage() {
  const router = useRouter();

  const handleAnimationComplete = () => {
    router.push("/home");
  };

  return <Hero onAnimationComplete={handleAnimationComplete} />;
}
