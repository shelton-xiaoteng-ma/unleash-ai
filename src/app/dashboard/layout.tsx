import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:w-64 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-blue-500">
        <Sidebar />
      </div>
      <main className="md:pl-64">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
