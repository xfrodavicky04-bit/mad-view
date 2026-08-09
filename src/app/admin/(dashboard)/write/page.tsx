import React from "react";
import { prisma } from "@/lib/db";
import ArticleEditorForm from "@/components/ArticleEditorForm";

export const revalidate = 0; // Dynamic rendering

export default async function WriteArticlePage() {
  // Fetch categories for metadata selection
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-8">
      <ArticleEditorForm categories={categories} />
    </div>
  );
}
