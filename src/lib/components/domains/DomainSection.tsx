import { useInView } from "@/lib/hooks/useInView";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface DomainSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  color: "blue" | "red" | "green" | "purple" | "orange" | "yellow";
  reversed?: boolean;
}

const colorMap = {
  blue: "from-blue-500 to-blue-700",
  red: "from-red-500 to-red-700",
  green: "from-green-500 to-green-700",
  purple: "from-purple-500 to-purple-700",
  orange: "from-orange-500 to-orange-700",
  yellow: "from-yellow-500 to-yellow-700",
} as const;

const bgColorMap = {
  blue: "from-blue-500/10 to-blue-700/10 dark:from-blue-500/5 dark:to-blue-700/5",
  red: "from-red-500/10 to-red-700/10 dark:from-red-500/5 dark:to-red-700/5",
  green:
    "from-green-500/10 to-green-700/10 dark:from-green-500/5 dark:to-green-700/5",
  purple:
    "from-purple-500/10 to-purple-700/10 dark:from-purple-500/5 dark:to-purple-700/5",
  orange:
    "from-orange-500/10 to-orange-700/10 dark:from-orange-500/5 dark:to-orange-700/5",
  yellow:
    "from-yellow-500/10 to-yellow-700/10 dark:from-yellow-500/5 dark:to-yellow-700/5",
} as const;

export function DomainSection({
  title,
  description,
  imageSrc,
  imageAlt,
  color,
  reversed = false,
}: DomainSectionProps) {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className={`space-y-12 opacity-0 transition-all duration-1000 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {reversed ? (
          <>
            <div
              className={`space-y-6 order-2 lg:order-1 transition-all duration-1000 delay-200 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <h2
                className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colorMap[color]}`}
              >
                {title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>
            <div
              className={`order-1 lg:order-2 relative aspect-square bg-gradient-to-br ${
                bgColorMap[color]
              } rounded-2xl p-8 transition-all duration-1000 ${
                isInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-16 scale-95"
              }`}
            >
              <Image
                src={getAssetPath(imageSrc)}
                alt={imageAlt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
          </>
        ) : (
          <>
            <div
              className={`relative aspect-square bg-gradient-to-br ${
                bgColorMap[color]
              } rounded-2xl p-8 transition-all duration-1000 ${
                isInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-16 scale-95"
              }`}
            >
              <Image
                src={getAssetPath(imageSrc)}
                alt={imageAlt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
            <div
              className={`space-y-6 transition-all duration-1000 delay-200 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <h2
                className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colorMap[color]}`}
              >
                {title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
