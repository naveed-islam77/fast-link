import supabase from "@/lib/supabase/client";
import type { Category } from "@/lib/types/database";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Category", "Product"],
  endpoints: (builder) => ({
    // ---------- Categories ----------
    getCategories: builder.query<Category[], { main_category?: number }>({
      async queryFn({ main_category }) {
        let query = supabase.from("categories").select("*");
        if (main_category) query = query.eq("main_category", main_category);

        const { data, error } = await query;
        if (error) return { error };
        return { data: data ?? [] };
      },
      providesTags: ["Category"],
    }),

    getCategoryBySlug: builder.query<Category | null, string>({
      async queryFn(slug) {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) return { error };
        return { data };
      },
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<Category | null, string>({
      async queryFn(id) {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("id", id)
          .single();

        if (error) return { error };
        return { data };
      },
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<Category, Category>({
      async queryFn(category) {
        const { data, error } = await supabase
          .from("categories")
          .insert([category])
          .select()
          .single();

        if (error) return { error };
        return { data };
      },
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<
      Category,
      { category: Category; id: string }
    >({
      async queryFn({ category, id }) {
        const { data, error } = await supabase
          .from("categories")
          .update(category)
          .eq("id", id)
          .select()
          .single();

        if (error) return { error };
        return { data };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<string, string>({
      async queryFn(id) {
        const { error } = await supabase
          .from("categories")
          .delete()
          .eq("id", id);

        if (error) return { error };
        return { data: id };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
