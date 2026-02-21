"use client";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import { useGetProductsQuery } from "@/store/services/api";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

function ProductsContent({ categorySlug }: { categorySlug?: string }) {
  const params = useSearchParams();
  const featured = params.get("featured");
  const categoryId = params.get("category");

  const { data: products, isLoading } = useGetProductsQuery({
    main_category: 2,
  });
  const { data: categories } = useGetCategoriesQuery({ main_category: 2 });

  const categoryName = categorySlug
    ? categories?.find((c) => c.slug === categorySlug)?.name
    : undefined;

  const filteredProducts = useMemo(() => {
    if (featured) {
      return products?.filter((product) => product.featured);
    }
    if (categoryId) {
      return products?.filter((product) => product.category_id == categoryId);
    }
    return products;
  }, [products, featured, categoryId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="py-8 md:py-12 px-4 border-b border-border">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {categoryName ? `${categoryName}` : "All Products"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {products?.length} product{products?.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <FilterSidebar categories={categories || []} />

              {/* Products Grid */}
              <div className="md:col-span-3">
                {isLoading ? (
                  <ProductSkeleton />
                ) : (
                  <ProductGrid
                    products={filteredProducts || []}
                    emptyMessage="No products found in this category."
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent categorySlug={categorySlug} />
    </Suspense>
  );
}
