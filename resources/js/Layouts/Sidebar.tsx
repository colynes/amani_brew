import React from 'react'
import { cn } from '@/lib/utils'
import { Link, usePage, useForm } from '@inertiajs/react'

import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  BarChart3, 
  CreditCard, 
  LogOut, 
  User 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { 
    title: 'Inventory', 
    href: '#', 
    icon: Package,
    submenu: [
      { title: 'Categories', href: '/admin/categories' },
      { title: 'Products', href: '/admin/products' },
    ]
  },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { title: 'Customers', href: '/admin/customers', icon: Users },
  { title: 'Sales', href: '/admin/sales', icon: CreditCard },
  { title: 'Reports', href: '/admin/reports', icon: BarChart3 },
]

interface SidebarProps {
  currentPath?: string
}

function Sidebar({ currentPath = '' }: SidebarProps) {
  const { auth } = usePage().props as any
  const { post } = useForm()

  const onLogout = (e: React.FormEvent) => {
    e.preventDefault()
    post('/logout')
  }

  const isActive = (href: string) => currentPath === href || currentPath.startsWith(href + '/')

  const user = auth?.user

  return (
    <div className="flex flex-col h-full bg-card border-r border-border shadow-md">
      {/* Logo */}
      <div className="p-lg border-b border-border bg-gradient-to-r from-coffee/5 to-amber-accent/5">
        <div className="flex flex-col items-start space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-coffee via-amber-accent to-coffee bg-clip-text text-transparent">
            Amani Brew
          </h1>
          <p className="text-sm text-muted-foreground">Coffee Operations Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-md space-y-1 overflow-auto">
        {navItems.map((item) => (
          <div key={item.title}>
            <Link 
              href={item.href} 
              className={cn(
                'group flex w-full items-center rounded-lg px-md py-md text-sm font-medium transition-all duration-200',
                'hover:bg-accent hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground shadow-sm',
                isActive(item.href) && 'data-[active=true]'
              )}
              data-active={isActive(item.href)}
            >
              <item.icon className="mr-3 h-4 w-4 shrink-0" />
              {item.title}
            </Link>
            {item.submenu && (
              <div className="ml-6 mt-1 space-y-0.5">
                {item.submenu.map((sub) => (
                  <Link 
                    key={sub.title}
                    href={sub.href}
                    className="group flex w-full items-center rounded-md px-md py-1.5 text-xs font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted shadow-xs"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-md border-t border-border mt-auto">
        <div className="flex items-center space-x-md p-md rounded-xl hover:bg-muted transition-all duration-200 group">
          <div className="w-10 h-10 bg-gradient-to-br from-coffee to-dark-roast rounded-xl flex items-center justify-center shadow-sm">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role || 'guest'}</p>
          </div>
        </div>

        <form onSubmit={onLogout} className="w-full mt-3">
          <Button variant="ghost" className="w-full h-11 justify-start text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-sm transition-all">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Sidebar

