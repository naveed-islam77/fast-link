"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Package, FolderOpen, Home, LogOut } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-full md:w-64 bg-sidebar border-b md:border-b-0 md:border-r border-sidebar-border">
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-sidebar-foreground mb-4">
            Admin Panel
          </h2>
          <nav className="space-y-2">
            <Link href="/admin/dashboard">
              <Button
                variant={isActive("/admin/dashboard") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start cursor-pointer"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                variant={isActive("/admin/products") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start cursor-pointer"
              >
                <Package className="w-4 h-4 mr-2" />
                Products
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button
                variant={isActive("/admin/categories") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start cursor-pointer"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Categories
              </Button>
            </Link>
            <Link href="/admin/create-admin">
              <Button
                variant={isActive("/admin/create-admin") ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start cursor-pointer"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Create Admin
              </Button>
            </Link>
          </nav>
        </div>

        <div className="border-t border-sidebar-border pt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
