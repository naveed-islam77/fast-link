"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { CategoryForm } from "@/components/CategoryForm";
import { Card } from "@/components/ui/card";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/store/services/categoryApi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function EditCategoryInner() {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { data: category, isLoading: pageLoading } = useGetCategoryByIdQuery(
    id as string,
    { skip: !id },
  );

  const handleSubmit = async (formData: any) => {
    updateCategory({ category: formData, id: id as string })
      .unwrap()
      .then(() => {
        toast.success("Category Updated successfully");
        router.push("/admin/categories");
      })
      .catch((err) => toast.error(err?.message));
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col md:flex-row">
          <AdminSidebar />
          <main className="flex-1 p-6 md:p-8">
            <p className="text-destructive">Category not found</p>
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
            <div className="flex items-center gap-4">
              <Link href="/admin/categories">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Edit Category
                </h1>
                <p className="text-muted-foreground mt-1">{category.name}</p>
              </div>
            </div>

            <Card className="p-6">
              <CategoryForm
                category={category}
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
