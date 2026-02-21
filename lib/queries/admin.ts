import { createClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/lib/types/database";

export async function createCategory(
  data: Omit<Category, "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();
  const { data: result, error } = await supabase
    .from("categories")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateCategory(
  id: string,
  data: Partial<Omit<Category, "id" | "created_at">>
) {
  const supabase = await createClient();
  const { data: result, error } = await supabase
    .from("categories")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw error;
}

export async function createProduct(
  data: Omit<Product, "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();
  const { data: result, error } = await supabase
    .from("products")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "created_at">>
) {
  const supabase = await createClient();
  const { data: result, error } = await supabase
    .from("products")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw error;
}

export async function uploadProductImage(
  productId: string,
  imagePath: string,
  displayOrder: number = 0
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_images")
    .insert([
      {
        product_id: productId,
        image_url: imagePath,
        display_order: displayOrder,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProductImage(imageId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId);

  if (error) throw error;
}
