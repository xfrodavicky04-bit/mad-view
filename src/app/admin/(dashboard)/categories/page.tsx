import React from "react";
import { prisma } from "@/lib/db";
import CategoriesList from "./CategoriesList";

export const revalidate = 0; // Dynamic rendering

export default async function CategoriesPage() {
  // Fetch categories along with their article count
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-8 space-y-8 font-sans max-w-5xl mx-auto w-full animate-fade-in">
      <div className="pb-6 border-b border-brand-border">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark uppercase">
          Categories
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Organize your writing into focused editorial sections.
        </p>
      </div>

      {/* Client List & Form container */}
      <CategoriesList initialCategories={categories} />
    </div>
  );
}
