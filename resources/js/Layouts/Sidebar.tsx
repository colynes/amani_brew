import React from "react";
import { Link, usePage, useForm } from "@inertiajs/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  CreditCard,
  Tag,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    submenu: [
      { title: "Categories", href: "/admin/categories", icon: Tag },
      { title: "Products", href: "/admin/products", icon: Package },
    ],
  },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", href: "/admin/customers", icon: Users },
  { title: "Sales", href: "/admin/sales", icon: CreditCard },
  { title: "Reports", href: "/admin/reports", icon: BarChart3 },
];

interface SidebarProps {
  currentPath?: string;
}

function Sidebar({ currentPath = "" }: SidebarProps) {
  const { auth } = usePage().props as any;
  const { post } = useForm();

  const onLogout = (e: React.FormEvent) => {
    e.preventDefault();
    post("/logout");
  };

  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(href + "/");

  const user = auth?.user;

  return (
    <div className="flex h-full flex-col bg-card border-r border-border shadow-sm">
      {/* Logo */}
      <div className="border-b border-border px-lg py-xl">
        <div className="flex flex-col items-start space-y-sm">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-coffee to-amber-accent bg-clip-text text-transparent">
            Amani Brew
          </h1>
          <p className="text-muted-foreground text-sm">Coffee Operations</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-lg py-lg space-y-lg">
        {navItems.map((item) => (
          <div key={item.title}>
            <Link
              href={item.href}
              className={cn(
                "flex w-full items-center rounded-xl px-md py-md text-base font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5 shrink-0" aria-hidden="true" />
              {item.title}
            </Link>

            {item.submenu && (
              <div className="ml-lg mt-sm space-y-xs">
                {item.submenu.map((sub) => {
                  const subActive = isActive(sub.href);

                  return (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className={cn(
                        "flex w-full items-center rounded-lg px-md py-sm text-sm font-medium transition-all duration-200",
                        subActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <sub.icon className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                      {sub.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Fixed Footer */}
      <div className="border-t border-border p-lg bg-card/80 backdrop-blur-sm sticky bottom-0">
        <div className="mb-md flex items-center gap-md rounded-xl bg-muted p-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role || "admin"}
            </p>
          </div>
        </div>

        <form onSubmit={onLogout} className="w-full">
          <Button
            type="submit"
            variant="ghost"
            className="flex h-12 w-full items-center justify-start rounded-xl px-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;

