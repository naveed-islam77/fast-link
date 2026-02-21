import supabase from "@/lib/supabase/client";
import type {
  Product,
  ProductWithImages,
} from "@/lib/types/database";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Session, User } from "@supabase/supabase-js";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], {categoryId?: string; main_category?: number}>({
      async queryFn({categoryId, main_category}) {
        let query = supabase.from("products").select("*");

        if (categoryId) {
          query = query.eq("category_id", categoryId);
        } else if (main_category) {
          query = query.eq("main_category", main_category);
        }

        const { data, error } = await query;

        if (error) return { error };
        return { data: data ?? [] };
      },
      providesTags: ["Product"],
    }),

    getFeaturedProducts: builder.query<ProductWithImages[], void>({
      async queryFn() {
        const { data, error } = await supabase
          .from("products")
          .select("*, images:product_images(*)")
          .eq("featured", true)
          .order("display_order", { ascending: true });

        if (error) return { error };
        return { data: (data as ProductWithImages[]) ?? [] };
      },
      providesTags: ["Product"],
    }),

    getProductBySlug: builder.query<ProductWithImages | null, string>({
      async queryFn(slug) {
        const { data, error } = await supabase
          .from("products")
          .select("*, images:product_images(*), category:categories(*)")
          .eq("slug", slug)
          .single();

        if (error) return { error };
        return { data: data as ProductWithImages };
      },
    }),

    getProductById: builder.query<ProductWithImages | null, string>({
      async queryFn(id) {
        const { data, error } = await supabase
          .from("products")
          .select("*,category:categories(*)")
          .eq("id", id)
          .single();

        if (error) return { error };
        return { data: data as ProductWithImages };
      },
    }),

    getProductsByCategory: builder.query<ProductWithImages[], string>({
      async queryFn(categorySlug) {
        const { data, error } = await supabase
          .from("products")
          .select("*, images:product_images(*), category:categories(*)")
          .eq("category.slug", categorySlug)
          .order("display_order", { ascending: true });

        if (error) return { error };
        return { data: (data as ProductWithImages[]) ?? [] };
      },
    }),

    getProductImages: builder.query<ProductImage[],string>({
      async queryFn(productId) {
        try {
        
          const { data, error } = await supabase
            .from("product_images")
            .select("*")
            .eq("product_id", productId)
            .order("display_order", { ascending: true });

          if (error) throw error;

          const imagesWithUrl = data?.map((img) => ({
            ...img,
            publicUrl: supabase.storage
              .from("product_images")
              .getPublicUrl(img.file_path).data.publicUrl,
          })) ?? [];

          return { data: imagesWithUrl };
        } catch (error: any) {
          return { error };
        }
      },
    }),

    getAllProductImages: builder.query<Record<string,ProductImage[]>,string[]>({
        async queryFn(productIds) {
          try {
            if (!productIds || productIds.length === 0) {
              return { data: {} };
            }
            const { data, error } = await supabase
              .from("product_images")
              .select("*")
              .in("product_id", productIds)
              .order("display_order", { ascending: true });

            if (error) throw error;

            const imagesByProduct = data?.reduce((acc, img) => {
              const publicUrl = supabase.storage
                .from("product_images")
                .getPublicUrl(img.file_path).data.publicUrl;

              if (!acc[img.product_id]) acc[img.product_id] = [];
              acc[img.product_id].push({ ...img, publicUrl });
              return acc;
            }, {} as Record<string, typeof data>) ?? {};

            return { data: imagesByProduct };
          } catch (error: any) {
            return { error };
          }
        },
        providesTags: ["Product"],
    }),


    createProduct: builder.mutation<ProductImage, string>({
      async queryFn(product) {
        const { data, error } = await supabase
          .from("products")
          .insert(product)
          .select()
          .single();

        if (error) return { error };
        return { data: data ?? [] };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<ProductImage[], string>({
      async queryFn(product) {
        const { data, error } = await supabase
          .from("products")
          .update(product)
          .select()
          .single();

        if (error) return { error };
        return { data: data ?? [] };
      },
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<ProductImage[], string>({
      async queryFn(productId) {
        const { data, error } = await supabase
          .from("products")
          .delete()
          .eq("id", productId)
          .single();

        if (error) return { error };
        return { data: data ?? [] };
      },
      invalidatesTags: ["Product"],
    }),
    uploadProductImages: builder.mutation<any,{ productId: string; images: File[] }>({
      async queryFn({ productId, images }) {
        const user = await supabase.auth.getUser();
        console.log("user", user);
        try {
          const uploadedImages = [];

          for (let i = 0; i < images.length; i++) {
            const file = images[i];

            const fileExt = file.name.split(".").pop();
            const fileName = `${productId}/${Date.now()}-${i}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
              .from("product_images")
              .upload(fileName, file);

            if (uploadError) throw uploadError;

            uploadedImages.push({
              product_id: productId,
              file_path: fileName,
              display_order: i,
            });
          }

          const { data, error } = await supabase
            .from("product_images")
            .insert(uploadedImages)
            .select();

          if (error) throw error;

          return { data };
        } catch (error: any) {
          return { error };
        }
      },
    }),
    // login here due to supabase
    login: builder.mutation<{ user: User; session: Session },AdminCreadentials>({
      async queryFn(credentials) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) return { error };
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductImagesQuery,
  useGetAllProductImagesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImagesMutation,
  useLoginMutation,
} = api;
