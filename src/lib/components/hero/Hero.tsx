"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface HeroProps {
  onAnimationComplete: () => void;
}

export function Hero({ onAnimationComplete }: HeroProps) {
  const [titleVisible, setTitleVisible] = useState(false);
  const monkeyHeadRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasAnimated = useRef(false);

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

    const handleScroll = (e: WheelEvent) => {
      if (!hasAnimated.current) {
        e.preventDefault();

        const scrollDelta = e.deltaY;
        const newScrollY = Math.max(
          0,
          Math.min(lastScrollY.current + scrollDelta, window.innerHeight)
        );

        handleAnimationProgress(newScrollY, scrollDelta > 0);
        lastScrollY.current = newScrollY;
      }
    };

    // Add touch event handling
    let touchStartY = 0;
    let currentTouchY = 0;
    let animationProgress = 0;
    let isAnimating = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (!hasAnimated.current) {
        touchStartY = e.touches[0].clientY;
        currentTouchY = touchStartY;
        isAnimating = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!hasAnimated.current && isAnimating) {
        e.preventDefault();
        currentTouchY = e.touches[0].clientY;
        const touchDelta = touchStartY - currentTouchY;

        // Scale the animation progress based on screen height
        const scaledDelta =
          (touchDelta / window.innerHeight) * window.innerHeight;
        animationProgress = Math.max(
          0,
          Math.min(scaledDelta, window.innerHeight)
        );

        handleAnimationProgress(animationProgress, touchDelta > 0);
      }
    };

    const handleTouchEnd = () => {
      if (!hasAnimated.current && isAnimating) {
        // If we've revealed the title and swiped up significantly, complete the animation
        if (titleVisible && animationProgress > window.innerHeight * 0.3) {
          hasAnimated.current = true;
          onAnimationComplete();
        } else if (
          !titleVisible &&
          animationProgress > window.innerHeight * 0.25
        ) {
          // If we haven't shown the title yet but swiped up enough, show it
          setTitleVisible(true);
        } else {
          // Reset to initial state if we haven't swiped enough
          setTitleVisible(false);
        }
      }
      isAnimating = false;
      animationProgress = 0;
    };

    const handleAnimationProgress = (
      progress: number,
      isScrollingDown: boolean
    ) => {
      // Calculate progress for monkey head animation (0 to 0.5)
      const headProgress = Math.min(progress / (window.innerHeight * 0.5), 1);

      // Update monkey head position and opacity
      if (monkeyHeadRef.current) {
        monkeyHeadRef.current.style.transform = `translateY(-${
          headProgress * 100
        }%)`;
        monkeyHeadRef.current.style.opacity = `${1 - headProgress}`;
      }

      // Show title after monkey head is gone
      if (headProgress === 1 && !titleVisible) {
        setTitleVisible(true);
      } else if (headProgress < 1) {
        setTitleVisible(false);
      }

      // Handle transition after title is visible
      if (headProgress === 1 && titleVisible && isScrollingDown) {
        const titleProgress = Math.min(progress / window.innerHeight, 1);
        if (titleProgress > 0.5) {
          hasAnimated.current = true;
          onAnimationComplete();
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      // Reset animation state on cleanup
      hasAnimated.current = false;
      if (monkeyHeadRef.current) {
        monkeyHeadRef.current.style.transform = "";
        monkeyHeadRef.current.style.opacity = "1";
      }
    };
  }, [titleVisible, onAnimationComplete]);

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
              src={getAssetPath("/assets/monkey-brain.webp")}
              alt="The Curious Code Monkey Brain"
              fill
              className="absolute inset-0 object-contain"
              priority
              sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
            />
            <div
              ref={monkeyHeadRef}
              className="absolute inset-0"
              style={{
                transform: "translateY(0)",
                opacity: 1,
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={getAssetPath("/assets/monkey-head.webp")}
                alt="The Curious Code Monkey Head"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
              />
            </div>
          </div>
          <div
            ref={titleRef}
            className={`mt-8 bg-gray-800 bg-opacity-95 p-4 sm:p-6 md:p-8 rounded-lg transform transition-all duration-1000 shadow-2xl border border-red-700/20 backdrop-blur-sm ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-2">
                THE CURIOUS CODE MONKEY
              </h1>
              <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-red-700/50 to-transparent"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                Exploring the Digital Jungle, One Line of Code at a Time
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 z-10 text-white">
          <p className="text-sm mb-2 text-center text-gray-300 tracking-wider font-light">
            Scroll to reveal
          </p>
          <ChevronDown className="w-8 h-8 animate-bounce text-red-500" />
        </div>
      </section>
    </div>
  );
}
