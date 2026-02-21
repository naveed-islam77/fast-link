export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  main_category: string;
  // icon_url: string | null;
  // display_order: number;
  // created_at: string;
  // updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string;
  price: number;
  image_url: string | null;
  display_order: number;
  featured: boolean;
  specifications: string;
  created_at: string;
  updated_at: string;
  main_category: string;
}

export interface ProductWithImages extends Product {
  images?: ProductImage[];
  category?: Category;
}
