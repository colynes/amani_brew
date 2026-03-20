import { Head, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppLayout({
  children,
  title = "Dashboard",
}: AppLayoutProps) {
  const { url } = usePage().props as any;

  return (
    <>
      <Head title={`Amani Brew Admin - ${title}`} />

      <div className="relative flex min-h-screen bg-slate-50">
        {/* Desktop Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white shadow-sm md:flex">
          <Sidebar currentPath={url} />
        </aside>

        {/* Main Content */}
        <main className="flex min-h-screen flex-1 flex-col md:pl-64">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-700 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <Sidebar currentPath={url} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}