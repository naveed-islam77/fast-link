"use client";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, FolderOpen } from "lucide-react";
import { useGetProductsQuery } from "@/store/services/api";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";

export default function AdminDashboard() {
  const { data: categories } = useGetCategoriesQuery({});
  const { data: products } = useGetProductsQuery({});

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome to the FastLink Admin Dashboard
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Products Card */}
              <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Products
                  </h2>
                  <Package className="w-8 h-8 text-primary opacity-20" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-foreground">
                    {products?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total products in catalog
                  </p>
                </div>
                <Link href="/admin/products" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Manage Products
                  </Button>
                </Link>
              </div>

              {/* Categories Card */}
              <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Categories
                  </h2>
                  <FolderOpen className="w-8 h-8 text-accent opacity-20" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-foreground">
                    {categories?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Product categories
                  </p>
                </div>
                <Link href="/admin/categories" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    Manage Categories
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Products
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Price
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.slice(0, 5).map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-foreground">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              product.featured
                                ? "bg-accent/20 text-accent-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {product.featured ? "Featured" : "Regular"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/products/new" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Add New Product
                  </Button>
                </Link>
                <Link href="/admin/categories/new" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Add New Category
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
