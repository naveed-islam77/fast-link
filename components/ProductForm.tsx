"use client";

import React from "react";

import { CustomQuillEditor } from "@/components/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  Category,
  Product,
  ProductWithImages,
} from "@/lib/types/database";
import { useState } from "react";

interface ProductFormProps {
  product?: ProductWithImages;
  categories: Category[];
  onSubmit: (data: any, images: File[]) => Promise<void>;
  isLoading?: boolean;
  setMainCategory?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function ProductForm({
  product,
  categories,
  onSubmit,
  isLoading = false,
  setMainCategory,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    specifications: product?.specifications || "",
    price: product?.price || 0,
    category_id: product?.category_id || "",
    featured: product?.featured || false,
    main_category: product?.main_category || "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(fileArray);

      // Create preview URLs
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, images);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Product Name
          </Label>
          <Input
            id="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
                slug: generateSlug(e.target.value),
              });
            }}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Main Category */}
          <div className="space-y-2">
            <Label htmlFor="main-category" className="text-sm font-medium">
              Main Category
            </Label>
            <Select
              value={String(formData.main_category)}
              onValueChange={(value) => {
                setFormData({ ...formData, main_category: value });
                setMainCategory && setMainCategory(parseInt(value));
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
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select
              value={String(formData.category_id)}
              onValueChange={(value) => {
                console.log("value", value);
                setFormData({ ...formData, category_id: value });
              }}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id?.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter product description"
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Specifications */}
      <div className="space-y-2">
        <Label htmlFor="specs" className="text-sm font-medium">
          Specifications (JSON)
        </Label>
        <CustomQuillEditor
          value={formData.specifications}
          onChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              specifications: value,
            }));
          }}
          placeholder="Enter product specifications with rich formatting..."
        />
        <p className="text-xs text-gray-500 mt-12">
          You can format text, add lists, links, and images to specifications
        </p>
      </div>

      {/* Product Images */}
      <div className="space-y-2">
        <Label htmlFor="images" className="text-sm font-medium">
          Product Images
        </Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        {images.length > 0 && (
          <p className="text-sm text-gray-600">
            {images.length} image(s) selected
          </p>
        )}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
          className="w-4 h-4 rounded"
        />
        <Label
          htmlFor="featured"
          className="text-sm font-medium cursor-pointer"
        >
          Mark as Featured Product
        </Label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-6">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : product
              ? "Update Product"
              : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
