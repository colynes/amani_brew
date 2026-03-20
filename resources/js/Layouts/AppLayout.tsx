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
  const { auth, url } = usePage().props as any;

  if (!auth?.user) {
    return children;
  }

  return (
    <>
      <Head title={`Amani Brew Admin - ${title}`} />

      <div className="app-shell">
        {/* Desktop Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 border-r border-border bg-slate-900 shadow-xl flex">
          <Sidebar currentPath={url} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden md:ml-64">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Content */}
          <div className="flex-1 overflow-y-auto page-container">
            {children}
          </div>
        </main>

        {/* Mobile Sidebar Overlay */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed md:hidden top-4 left-4 z-50 h-12 w-12 rounded-full"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 border-r-0 md:hidden bg-slate-900">
            <Sidebar currentPath={url} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

