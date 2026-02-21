"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { ProductForm } from "@/components/ProductForm";
import { Card } from "@/components/ui/card";
import { useGetProductByIdQuery } from "@/store/services/api";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EditProductInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(
    productId as string,
    { skip: !productId },
  );

  const { data: categories, isLoading } = useGetCategoriesQuery(
    { main_category: Number(product?.main_category) },
    { skip: !product?.main_category },
  );

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId, ...formData }),
      });

      if (!response.ok) throw new Error("Failed to update product");

      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (isLoading || isProductLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col md:flex-row">
          <AdminSidebar />
          <main className="flex-1 p-6 md:p-8">
            <p className="text-destructive">Product not found</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Link href="/admin/products">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Edit Product
                </h1>
                <p className="text-muted-foreground mt-1">{product.name}</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Form Card */}
            <Card className="p-6">
              <ProductForm
                product={product}
                categories={categories || []}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
