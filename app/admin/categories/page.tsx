"use client";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Category } from "@/lib/types/database";
import { DeleteModal } from "@/components/DeleteModal";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/store/services/categoryApi";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const { data: categories } = useGetCategoriesQuery({});

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    category: Category | null;
  }>({
    isOpen: false,
    category: null,
  });

  const handleDeleteClick = (category: Category) => {
    setDeleteModal({ isOpen: true, category });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.category) return;

    deleteCategory(deleteModal.category.id)
      .unwrap()
      .then(() => {
        toast.success("Category Deleted Successfully");
        setDeleteModal({ category: null, isOpen: false });
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Categories
                </h1>
                <p className="text-muted-foreground mt-1">
                  Organize products into categories
                </p>
              </div>
              <Link href="/admin/categories/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </Link>
            </div>

            {/* Categories Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {categories?.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    No categories yet
                  </p>
                  <Link href="/admin/categories/new">
                    <Button>Create First Category</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Name
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Main Category
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Description
                        </th>

                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((category) => (
                        <tr
                          key={category.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-6 text-foreground font-medium">
                            {category.name}
                          </td>
                          <td className="py-4 px-6 text-muted-foreground font-mono text-sm">
                            {category.main_category == "1"
                              ? "Smart Phones"
                              : "Laptops"}
                          </td>
                          <td className="py-4 px-6 text-muted-foreground max-w-xs truncate">
                            {category.description || "-"}
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/categories/edit?id=${category.id}`}
                              >
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-white bg-transparent cursor-pointer"
                                onClick={() => handleDeleteClick(category)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <DeleteModal
            isOpen={deleteModal.isOpen}
            title="Delete Category"
            description="This action cannot be undone. All products in this category will remain but will be unassigned."
            itemName={deleteModal.category?.name || ""}
            isLoading={isLoading}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteModal({ isOpen: false, category: null })}
          />
        </main>
      </div>
    </div>
  );
}
