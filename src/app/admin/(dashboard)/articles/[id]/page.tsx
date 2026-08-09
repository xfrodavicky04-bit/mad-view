import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ArticleEditorForm from "@/components/ArticleEditorForm";

export const revalidate = 0; // Dynamic rendering

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;

  // 1. Fetch the target article
  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  // 2. Fetch categories
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  // Format model data to fit the Editor form inputs
  const formattedArticle = {
    ...article,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
  };

  return (
    <div className="p-8">
      <ArticleEditorForm article={formattedArticle} categories={categories} />
    </div>
  );
}
