"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/lib/types/database";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function CategoryForm({
  category,
  onSubmit,
  isLoading = false,
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    main_category: category?.main_category || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Category Name
          </Label>
          <Input
            id="name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="main-category" className="text-sm font-medium">
            Main Category
          </Label>
          <Select
            value={String(formData.main_category)}
            onValueChange={(value) => {
              setFormData({ ...formData, main_category: value });
            }}
          >
            <SelectTrigger id="main-category" className="w-full">
              <SelectValue placeholder="Select a main category" />
            </SelectTrigger>
            <SelectContent>
              {[
                { name: "samrt phone", id: 1 },
                { name: "laptop", id: 2 },
              ]?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id?.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-6">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
