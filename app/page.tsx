"use client";

import HomeInner from "@/components/home/HomeInner";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <HomeInner />
    </Suspense>
  );
}
