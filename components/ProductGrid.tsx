"use client";

import type { Product, ProductWithImages } from "@/lib/types/database";
import { ProductCard } from "./ProductCard";
import { useGetAllProductImagesQuery } from "@/store/services/api";

export function ProductGrid({
  products,
  title,
  emptyMessage = "No products found.",
}: any) {
  const productIds = products?.map((product: ProductWithImages) => product.id);

  const { data: productImages } = useGetAllProductImagesQuery(productIds, {
    skip: productIds?.length === 0,
  });

  if (products?.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            images={productImages?.[product.id] || []}
          />
        ))}
      </div>
    </div>
  );
}
