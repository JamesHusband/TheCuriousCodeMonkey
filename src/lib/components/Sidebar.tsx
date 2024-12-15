"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { taxonomy } from "@/lib/taxonomy";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen sticky top-0">
      <div className="p-6 bg-red-700 flex justify-center items-center">
        <Link href="/home">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
            alt="Monkey Logo"
            className="w-24 h-24 rounded-full"
          />
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-6">
          {taxonomy.domains.map((domain) => (
            <div key={domain.slug} className="space-y-2">
              <Link
                href={`/${domain.slug}`}
                className={`block text-lg font-medium hover:text-${
                  domain.color
                }-500 transition-colors ${
                  pathname === `/${domain.slug}`
                    ? `text-${domain.color}-500`
                    : "text-gray-300"
                }`}
              >
                {domain.title}
              </Link>
              {domain.topics && domain.topics.length > 0 && (
                <div className="space-y-1 pl-4">
                  {domain.topics.map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/${domain.slug}/${topic.slug}`}
                      className={`block text-sm hover:text-${
                        domain.color
                      }-500 transition-colors ${
                        pathname === `/${domain.slug}/${topic.slug}`
                          ? `text-${domain.color}-500`
                          : "text-gray-400"
                      }`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
