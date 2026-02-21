"use client";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/store/services/api";
import { Product } from "@/lib/types/database";
import { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const { data: categories } = useGetCategoriesQuery({});
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const { data: products } = useGetProductsQuery({});
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({
    isOpen: false,
    product: null,
  });

  const handleDeleteClick = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleDeleteConfirm = async () => {
    deleteProduct(deleteModal.product?.id as string)
      .unwrap()
      .then(() => {
        toast.success("Product Deleted SuccessFully");
      })
      .catch((err) => {
        toast.error(err?.message);
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
                <h1 className="text-3xl font-bold text-foreground">Products</h1>
                <p className="text-muted-foreground mt-1">
                  Manage all products in your catalog
                </p>
              </div>
              <Link href="/admin/products/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>

            {/* Products Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {products?.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No products yet</p>
                  <Link href="/admin/products/new">
                    <Button>Create First Product</Button>
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
                          Category
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Price
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product) => {
                        const category = categories?.find(
                          (c) => c.id === product.category_id,
                        );
                        return (
                          <tr
                            key={product.id}
                            className="border-b border-border hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-4 px-6 text-foreground font-medium">
                              {product.name}
                            </td>
                            <td className="py-4 px-6 text-muted-foreground">
                              {category?.name || "Unknown"}
                            </td>
                            <td className="py-4 px-6 text-foreground font-medium">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  product.featured
                                    ? "bg-accent/20 text-accent-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {product.featured ? "Featured" : "Regular"}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex gap-2">
                                <Link
                                  href={`/admin/products/edit?id=${product.id}`}
                                >
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-transparent cursor-pointer"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-white cursor-pointer bg-transparent"
                                  onClick={() => handleDeleteClick(product)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <DeleteModal
            isOpen={deleteModal.isOpen}
            title="Delete Product"
            description="This action cannot be undone. The product will be permanently deleted."
            itemName={deleteModal.product?.name || ""}
            isLoading={isDeleting}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteModal({ isOpen: false, product: null })}
          />
        </main>
      </div>
    </div>
  );
}
