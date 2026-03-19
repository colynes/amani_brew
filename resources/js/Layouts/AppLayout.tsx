import { Head, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'

export default function AppLayout({ children, title = 'Dashboard' }) {
  const { auth, url } = usePage().props

  if (!auth.user && url !== '/login') {
    return null // Inertia will redirect
  }

  return (
    <>
      <Head title={`Amani Brew Admin - ${title}`} />

      <div className="flex min-h-screen bg-background">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex md:w-64 flex-shrink-0 border-r border-border">
          <Sidebar currentPath={url} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden lg:ml-64">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
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
          <SheetContent side="left" className="w-64 p-0 border-r-0 md:hidden">
            <Sidebar currentPath={url} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

