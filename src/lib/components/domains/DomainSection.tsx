"use client";

import { useInView } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath, toSnakeCase } from "@/lib/utils";

interface DomainSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function DomainSection({
  title,
  description,
  imageSrc,
  imageAlt,
}: DomainSectionProps) {
  const { ref, isInView } = useInView();
  const href = getAssetPath(`/${toSnakeCase(title)}`);

  return (
    <Link href={href}>
      <section
        ref={ref}
        className={`h-full opacity-0 transition-all duration-300 ease-out cursor-pointer ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="h-full flex flex-col group">
          <div
            className={`relative aspect-square bg-gradient-to-br from-red-500/10 to-red-700/10 hover:from-red-500/20 hover:to-red-700/20 rounded-2xl p-4 mb-4 transition-all duration-300 ${
              isInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <Image
              src={getAssetPath(imageSrc)}
              alt={imageAlt}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
          </div>

          <div
            className={`space-y-2 transition-all duration-300 delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 group-hover:scale-[1.02] transition-transform duration-300">
              {title}
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
}
