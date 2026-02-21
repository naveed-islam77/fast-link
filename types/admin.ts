interface AdminCreadentials {
  email: string;
  password: string;
}

interface ProductImage {
  id: string;
  product_id: string;
  file_path: string;
  display_order: number;
  created_at: string;
  publicUrl: string;
}


interface EmailData {
  from: string;
  message: string;
  subject: string;
}