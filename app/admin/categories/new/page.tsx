"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { CategoryForm } from "@/components/CategoryForm";
import { Card } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useCreateCategoryMutation } from "@/store/services/categoryApi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewCategoryPage() {
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    createCategory(formData)
      .unwrap()
      .then(() => {
        toast.success("Category created successfully");
        router.push("/admin/categories");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Link href="/admin/categories">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Add New Category
                </h1>
                <p className="text-muted-foreground mt-1">
                  Create a new product category
                </p>
              </div>
            </div>

            {/* Error Message */}
            {getErrorMessage(error as any) && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
                {getErrorMessage(error as any)}
              </div>
            )}

            {/* Form Card */}
            <Card className="p-6">
              <CategoryForm onSubmit={handleSubmit} isLoading={isLoading} />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
