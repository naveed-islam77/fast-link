"use client";

import EditProductInner from "@/components/product/EditProductInner";
import { Suspense } from "react";

export default function EditProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <EditProductInner />
    </Suspense>
  );
}
