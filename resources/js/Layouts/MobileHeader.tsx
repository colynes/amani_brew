import { FC } from 'react'
import { Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, usePage } from '@inertiajs/react'

const MobileHeader: FC = () => {
  const { auth } = usePage().props as any

  return (
    <header className="sticky top-0 z-40 w-full h-16 px-4 sm:px-6 lg:px-8 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="mr-4 -ml-1 h-9 w-9"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Link
        href="/admin/dashboard"
        className="flex-1 font-bold bg-gradient-to-r from-coffee to-amber-accent bg-clip-text text-transparent text-xl truncate"
      >
        Amani Brew
      </Link>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

export default MobileHeader

