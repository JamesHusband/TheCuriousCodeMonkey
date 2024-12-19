import { MainLayout } from "@/lib/components";

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
