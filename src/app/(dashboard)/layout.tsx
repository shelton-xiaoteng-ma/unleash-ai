import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:w-64 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-blue-500">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-64">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
