"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onAnimationComplete: () => void;
}

export function Hero({ onAnimationComplete }: HeroProps) {
  const [titleVisible, setTitleVisible] = useState(false);
  const monkeyHeadRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!hasAnimated.current) {
        e.preventDefault();

        const scrollDelta = e.deltaY;
        const newScrollY = Math.max(
          0,
          Math.min(lastScrollY.current + scrollDelta, window.innerHeight)
        );

        // Calculate progress for monkey head animation (0 to 0.5)
        const headProgress = Math.min(
          newScrollY / (window.innerHeight * 0.5),
          1
        );

        // Update monkey head position and opacity
        if (monkeyHeadRef.current) {
          monkeyHeadRef.current.style.transform = `translateY(-${
            headProgress * 100
          }%)`;
          monkeyHeadRef.current.style.opacity = `${1 - headProgress}`;
        }

        // Only show title after monkey head is gone
        if (headProgress === 1 && !titleVisible) {
          setTitleVisible(true);
          // Reset scroll progress for the next phase
          lastScrollY.current = 0;
        } else if (headProgress < 1) {
          setTitleVisible(false);
        }

        // After title is visible, track another scroll cycle before transitioning
        if (headProgress === 1 && titleVisible) {
          const titleProgress = Math.min(newScrollY / window.innerHeight, 1);

          // Only transition to main content after another full scroll
          if (titleProgress === 1 && scrollDelta > 0) {
            hasAnimated.current = true;
            onAnimationComplete();
            return;
          }
        }

        lastScrollY.current = newScrollY;
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [titleVisible, onAnimationComplete]);

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-red-700"></div>
          <div className="w-1/2 bg-gray-800"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="relative w-[500px] h-[500px] mx-auto mb-8">
            <Image
              src="/assets/monkey-brain.webp"
              alt="The Curious Code Monkey Brain"
              width={500}
              height={500}
              className="absolute inset-0"
              priority
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
                src="/assets/monkey-head.webp"
                alt="The Curious Code Monkey Head"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
          <div
            ref={titleRef}
            className={`bg-gray-800 bg-opacity-95 p-8 rounded-lg transform transition-all duration-1000 shadow-2xl border border-red-700/20 backdrop-blur-sm ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-2">
                THE CURIOUS CODE MONKEY
              </h1>
              <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-red-700/50 to-transparent"></div>
              <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
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
