"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeSidebar } from "@/components/HomeSideBar";
import { ProductGrid } from "@/components/ProductGrid";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/store/services/api";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Home() {
  const { data: categories } = useGetCategoriesQuery({ main_category: 1 });
  const { data: products, isLoading } = useGetProductsQuery({
    main_category: 1,
  });
  const params = useSearchParams();
  const featured = params.get("featured");
  const categoryId = params.get("category");

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
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 bg-linear-to-b from-primary/5 to-background">
          <div className="container mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Experience the Future of Mobile Technology
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                Discover FastLink's premium smartphones, tablets, and
                accessories designed for the modern world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Laptops
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href={featured ? "/" : "/?featured=true"} scroll={false}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  {featured ? "Show All" : "Show Featured"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <HomeSidebar categories={categories || []} />
              <div className="md:col-span-3">
                {isLoading ? (
                  <ProductSkeleton />
                ) : (
                  <ProductGrid
                    products={filteredProducts || []}
                    title="Smart Phones"
                    emptyMessage="No featured products yet."
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
