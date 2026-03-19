import React from 'react'
import { cn } from '@/lib/utils'
import { Link, usePage } from '@inertiajs/react'

import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  BarChart3,
  Layers,
  CreditCard,
  LogOut,
  User,
  Menu,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { 
    title: 'Inventory', 
    href: '#', 
    icon: Package,
    submenu: [
      { title: 'Categories', href: '/admin/inventory/categories' },
      { title: 'Products', href: '/admin/inventory/products' },
    ]
  },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { 
    title: 'Fat Clients', 
    href: '#', 
    icon: Users,
    submenu: [
      { title: 'Subscriptions', href: '/admin/fat-clients/subscriptions' },
      { title: 'Billing', href: '/admin/fat-clients/billing' },
    ]
  },
  { title: 'Sales', href: '/admin/sales', icon: CreditCard },
  { title: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { 
    title: 'Users', 
    href: '/admin/users', 
    icon: Users,
    roles: ['admin', 'manager'] // visible based on user role
  },
]

function Sidebar({ className, currentPath = '' }) {
  const { auth } = usePage().props
  const { post, processing } = useForm()

  const onLogout = (e) => {
    e.preventDefault()
    post('/logout')
  }

  const isActive = (href) => currentPath === href || currentPath.startsWith(href + '/')


  const user = auth.user
  const isAdminOrManager = user?.role === 'admin' || user?.role === 'manager'

  return (
    <div className={cn('flex flex-col h-full bg-white border-r border-border shadow-lg', className)}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col items-start space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald bg-clip-text text-transparent">
            Amani Brew
          </h1>
          <p className="text-sm text-secondary-text">Premium Butchery</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {navItems.map((item) => {
          if (item.roles && !isAdminOrManager) return null
          return (
            <div key={item.title}>
              <Link href={item.href} className={cn(
                'group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted/50',
                'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground'
              )}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.title}
              </Link>
              {item.submenu && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((sub) => (
                    <Link 
                      key={sub.title}
                      href={sub.href}
                      className="group flex w-full items-center rounded-md px-3 py-1.5 text-xs font-medium text-secondary-text transition-all hover:text-primary hover:bg-muted/50"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-primary-text truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-secondary-text capitalize">{user?.role || 'guest'}</p>
          </div>
        </div>

        <form onSubmit={onLogout} className="w-full mt-2">
          <Button variant="ghost" className="w-full h-10 justify-start text-secondary-text hover:bg-muted hover:text-primary">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
