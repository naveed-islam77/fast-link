"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { ProductForm } from "@/components/ProductForm";
import { Card } from "@/components/ui/card";
import {
  useCreateProductMutation,
  useUploadProductImagesMutation,
} from "@/store/services/api";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewProductPage() {
  const [mainCategory, setMainCategory] = useState<number | undefined>(0);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [uploadProductImages, { isLoading: isUploading }] =
    useUploadProductImagesMutation();
  const router = useRouter();

  const { data: categories } = useGetCategoriesQuery(
    { main_category: mainCategory },
    {
      skip: !mainCategory,
    },
  );

  const handleSubmit = async (formData: any, images: File[]) => {
    try {
      const product = await createProduct(formData).unwrap();

      if (images.length > 0) {
        await uploadProductImages({
          productId: product.id,
          images,
        }).unwrap();
      }

      toast.success("Product created successfully");
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

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
                  Add New Product
                </h1>
                <p className="text-muted-foreground mt-1">
                  Create a new product in your catalog
                </p>
              </div>
            </div>

            {/* Form Card */}
            <Card className="p-6">
              <ProductForm
                categories={categories || []}
                onSubmit={handleSubmit}
                isLoading={isLoading || isUploading}
                setMainCategory={setMainCategory}
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
