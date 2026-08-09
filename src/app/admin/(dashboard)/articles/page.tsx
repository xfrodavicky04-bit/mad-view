import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ArticlesFilters from "./ArticlesFilters";
import ArticlesList from "./ArticlesList";
import { Plus } from "lucide-react";

export const revalidate = 0; // Dynamic rendering

interface ArticlesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
  }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedParams = await searchParams;
  const { search, category, status } = resolvedParams;

  // 1. Fetch categories for filters
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  // 2. Fetch filtered articles
  const articles = await prisma.article.findMany({
    where: {
      title: search ? { contains: search } : undefined,
      categoryId: category || undefined,
      status: status || undefined,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 space-y-8 font-sans max-w-6xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-brand-border">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark uppercase">
            Articles
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage your written articles, edits, drafts, and publication statuses.
          </p>
        </div>
        <Link
          href="/admin/write"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-semibold tracking-wide transition-all shadow-sm focus:outline-none"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* URL Filter Sync Bar */}
      <ArticlesFilters categories={categories} />

      {/* List Container */}
      <ArticlesList articles={articles} />
    </div>
  );
}
