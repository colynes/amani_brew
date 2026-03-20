import React from "react";
import { Link, usePage, useForm } from "@inertiajs/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    title: "Inventory",
    href: "#",
    icon: Package,
    submenu: [
      { title: "Categories", href: "/admin/categories" },
      { title: "Products", href: "/admin/products" },
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
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col items-start space-y-1">
          <h1 className="text-2xl font-bold text-emerald-600">Amani Brew</h1>
          <p className="text-sm text-slate-500">Coffee Operations Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {navItems.map((item) => (
          <div key={item.title}>
            <Link
              href={item.href}
              className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5 shrink-0" />
              {item.title}
            </Link>

            {item.submenu && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((sub) => {
                  const subActive = isActive(sub.href);

                  return (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all ${
                        subActive
                          ? "bg-emerald-50 font-medium text-emerald-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {sub.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
            <User className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.name || "User"}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {user?.role || "guest"}
            </p>
          </div>
        </div>

        <form onSubmit={onLogout} className="w-full">
          <Button
            type="submit"
            variant="ghost"
            className="flex h-11 w-full items-center justify-start rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;