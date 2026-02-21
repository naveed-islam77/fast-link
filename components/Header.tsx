"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/fast-link-logo.png"
            alt="FastLink"
            width={50}
            height={50}
            className="w-28 h-auto"
          />
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            FastLink
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Smart Phones
          </Link>
          <Link
            href="/products"
            className="text-foreground hover:text-primary transition-colors"
          >
            Laptops
          </Link>
          <Link
            href="/admin"
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Link
            href="/admin"
            className="text-sm bg-primary text-primary-foreground px-3 py-2 rounded-lg"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
