import { Head, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function AppLayout({ children, title = 'Dashboard' }: AppLayoutProps) {
  const { auth, url } = usePage().props as any

  // Senior Tip: Don't return null here, let the Middleware handle the redirect
  // so the user doesn't see a flickering white screen.

  return (
    <>
      <Head title={`Amani Brew Admin - ${title}`} />

      <div className="relative flex min-h-screen bg-slate-50/50">
        {/* Sidebar Desktop - Fixed the width and visibility sync */}
        <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-white shadow-sm md:flex z-40">
          <Sidebar currentPath={url} />
        </aside>

        {/* Main Content - Adjusted margin-left to match Sidebar width exactly */}
        <main className="flex flex-1 flex-col overflow-hidden md:pl-64">
          {/* Mobile Header - only shows on small screens */}
          <MobileHeader />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 page-container">
            <div className="mx-auto max-w-7xl">
               {children}
            </div>
          </div>
        </main>

        {/* Mobile Sidebar Overlay (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl md:hidden border border-emerald-500/20 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-r-0">
            <Sidebar currentPath={url} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}