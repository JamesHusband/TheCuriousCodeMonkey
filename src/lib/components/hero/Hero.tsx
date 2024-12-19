"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface HeroProps {
  onAnimationComplete: () => void;
}

export function Hero({ onAnimationComplete }: HeroProps) {
  const monkeyHeadRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const isFirstPhaseComplete = useRef(false);
  const isAnimating = useRef(false);
  const [showHead, setShowHead] = useState(true);

  // Check if device is mobile on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      onAnimationComplete();
    }
  }, [onAnimationComplete]);

  useEffect(() => {
    // Skip event listeners on mobile
    if (window.innerWidth < 768) return;

    const startFirstPhase = () => {
      if (
        !hasAnimated.current &&
        !isFirstPhaseComplete.current &&
        !isAnimating.current
      ) {
        isAnimating.current = true;

        // Animate monkey head
        if (monkeyHeadRef.current) {
          monkeyHeadRef.current.style.transition =
            "transform 1s ease-out, opacity 1s ease-out";
          monkeyHeadRef.current.style.transform = "translateY(-100%)";
          monkeyHeadRef.current.style.opacity = "0";

          // When first phase animation ends
          setTimeout(() => {
            setShowHead(false); // Remove head after animation
            isFirstPhaseComplete.current = true;
            isAnimating.current = false;
          }, 1000);
        }
      }
    };

    const startSecondPhase = () => {
      if (
        !hasAnimated.current &&
        isFirstPhaseComplete.current &&
        !isAnimating.current
      ) {
        isAnimating.current = true;
        hasAnimated.current = true;
        onAnimationComplete();
      }
    };

    const handleInteraction = () => {
      if (!isFirstPhaseComplete.current) {
        startFirstPhase();
      } else {
        startSecondPhase();
      }
    };

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      handleInteraction();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!hasAnimated.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      handleInteraction();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleInteraction();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      // Reset animation state on cleanup
      hasAnimated.current = false;
      isFirstPhaseComplete.current = false;
      isAnimating.current = false;
      if (monkeyHeadRef.current) {
        monkeyHeadRef.current.style.transition = "";
        monkeyHeadRef.current.style.transform = "";
        monkeyHeadRef.current.style.opacity = "1";
      }
    };
  }, [onAnimationComplete]);

  // Hide hero on mobile screens
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="h-screen bg-background">
      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-red-700"></div>
          <div className="w-1/2 bg-gray-800"></div>
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-square mx-auto">
            <Image
              src={getAssetPath("/assets/monkey-brain.png")}
              alt="The Curious Code Monkey Brain"
              fill
              className="absolute inset-0 object-contain"
              priority
              sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
            />
            {showHead && (
              <div
                ref={monkeyHeadRef}
                className="absolute inset-0"
                style={{
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src={getAssetPath("/assets/monkey-head.png")}
                  alt="The Curious Code Monkey Head"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
                />
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-8 z-10 text-white">
          <p className="text-sm mb-2 text-center text-gray-300 tracking-wider font-light">
            {isFirstPhaseComplete.current
              ? "Scroll to continue"
              : "Scroll to begin"}
          </p>
          <ChevronDown className="w-8 h-8 animate-bounce text-red-500" />
        </div>
      </section>
    </div>
  );
}
