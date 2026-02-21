"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageGallery } from "@/components/ImageGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useGetProductByIdQuery,
  useGetProductImagesQuery,
} from "@/store/services/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({}: ProductDetailPageProps) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { data: product, isLoading } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });
  const { data: images } = useGetProductImagesQuery(id as string, {
    skip: !id,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="py-4 px-4 border-b border-border">
          <div className="container mx-auto flex items-center gap-2 text-sm">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-primary"
            >
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            {product?.category && (
              <>
                <Link
                  href={`/products?category=${product.category_id}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {product.category.name}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-foreground font-medium">{product?.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {/* Image Gallery */}
              <div>
                <ImageGallery
                  images={images || []}
                  productName={product?.name || ""}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {product?.name}
                    </h1>
                    {product?.featured && (
                      <Badge className="bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  {product?.category && (
                    <Link href={`/products?category=${product?.category.slug}`}>
                      <p className="text-muted-foreground hover:text-primary transition-colors">
                        {product?.category.name}
                      </p>
                    </Link>
                  )}
                </div>

                {/* Price */}
                <div className="border-y border-border py-6">
                  <p className="text-muted-foreground mb-2">Price</p>
                  <p className="text-4xl font-bold text-primary">
                    ${product?.price.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                {product?.description && (
                  <div className="space-y-3">
                    <h2 className="font-semibold text-foreground">
                      Description
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Specifications */}
                {product?.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div className="space-y-3">
                      <h2 className="font-semibold text-foreground">
                        Specifications
                      </h2>
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        dangerouslySetInnerHTML={{
                          __html: product.specifications,
                        }}
                      ></div>
                    </div>
                  )}

                {/* Call to Action */}
                <div className="space-y-3 pt-6">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {/* {relatedProducts.length > 0 && (
              <div className="border-t border-border pt-12">
                <ProductGrid
                  products={relatedProducts}
                  title="Related Products"
                />
              </div>
            )} */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
