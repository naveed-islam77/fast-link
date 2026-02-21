"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Category } from "@/lib/types/database";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  categories: Category[];
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <aside className="bg-card rounded-lg border border-border p-6 h-fit sticky top-20">
      <h3 className="font-bold text-lg text-foreground mb-4">Categories</h3>
      <nav className="space-y-2">
        <Link href="/products" scroll={false}>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
            }`}
          >
            All Products
          </button>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            scroll={false}
          >
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeCategory == category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              {category.name}
            </button>
          </Link>
        ))}
      </nav>

      {/* Clear Filters */}
      {activeCategory && (
        <div className="mt-6 pt-6 border-t border-border">
          <Link href="/products" scroll={false}>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              Clear Filters
            </Button>
          </Link>
        </div>
      )}
    </aside>
  );
}
