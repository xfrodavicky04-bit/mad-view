import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Search } from "lucide-react";

export default async function PublicHeader() {
  // Fetch site settings and categories for header links
  const settings = await prisma.setting.findUnique({
    where: { id: "site_settings" },
  });

  const categories = await prisma.category.findMany({
    take: 4,
    orderBy: { name: "asc" },
  });

  const siteTitle = settings?.siteName || "MAD VIEW";
  const siteTagline = settings?.siteDescription || "Ideas / Politics / Society";

  return (
    <header className="w-full bg-brand-bg border-b border-brand-border sticky top-0 z-40 select-none backdrop-blur-md bg-brand-bg/90">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between font-sans">
        {/* Logo and Subtitle */}
        <Link href="/" className="flex flex-col group">
          <h1 className="font-serif text-2xl md:text-3xl font-extrabold tracking-wider text-brand-dark transition-colors duration-250 group-hover:text-accent">
            {siteTitle}
          </h1>
          <span className="text-[9px] tracking-widest text-brand-muted uppercase font-bold mt-0.5">
            {siteTagline}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="text-xs uppercase font-bold tracking-widest text-brand-dark hover:text-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/archive"
            className="text-xs uppercase font-bold tracking-widest text-brand-dark hover:text-accent transition-colors"
          >
            Archive
          </Link>
          <Link
            href="/about"
            className="text-xs uppercase font-bold tracking-widest text-brand-dark hover:text-accent transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Actions (Search icon) */}
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="p-2 text-brand-dark hover:text-accent transition-colors"
            title="Search Articles"
          >
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
