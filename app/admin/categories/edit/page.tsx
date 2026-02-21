"use client";

import EditCategoryInner from "@/components/category/EditCategoryInner";
import { Suspense } from "react";

export default function EditCategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCategoryInner />
    </Suspense>
  );
}
