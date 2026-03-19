// File: frontend/src/Layouts/MobileHeader.tsx
// Purpose: Mobile header for Amani Brew admin dashboard

import { FC } from 'react'
import { Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, usePage } from '@inertiajs/react'

interface MobileHeaderProps {
  onMenuOpen: () => void
}

const MobileHeader: FC<MobileHeaderProps> = ({ onMenuOpen }) => {
  const { auth } = usePage().props as { auth: { user: { name: string } } }

  return (
    <header className="sticky top-0 z-40 w-full h-14 px-4 sm:px-6 bg-white border-b border-border flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuOpen}
        className="mr-4 -ml-1 h-9 w-9"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Link
        href="/admin/dashboard"
        className="flex-1 font-bold bg-gradient-to-r from-primary to-emerald bg-clip-text text-transparent text-lg truncate"
      >
        Amani Brew
      </Link>

      <Button variant="ghost" size="icon" className="h-9 w-9">
        <User className="h-5 w-5" />
      </Button>
    </header>
  )
}

export default MobileHeader