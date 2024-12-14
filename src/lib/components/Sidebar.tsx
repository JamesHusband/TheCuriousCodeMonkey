import Link from "next/link";
import { Navigation } from "@/components/Navigation";

interface SidebarProps {
  FooterComponent?: React.ComponentType;
}

export function Sidebar({ FooterComponent }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen sticky top-0">
      <div className="p-6 bg-red-700 flex justify-center items-center">
        <Link href="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
            alt="Monkey Logo"
            className="w-24 h-24 rounded-full"
          />
        </Link>
      </div>
      <div className="p-4">
        <Navigation />
      </div>
      <div className="flex-grow"></div>
      {FooterComponent && (
        <div className="p-4 bg-red-700 flex justify-center items-center">
          <FooterComponent />
        </div>
      )}
    </aside>
  );
}
