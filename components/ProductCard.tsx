"use client";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types/database";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  product,
  images,
}: {
  product: Product;
  images?: ProductImage[];
}) {
  const imageUrl = images?.[0]?.publicUrl;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group rounded-lg border border-border h-full bg-card overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image Container */}
        <div className="relative bg-muted aspect-square overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          {product.featured && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="pt-2 border-t border-border">
            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
