"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ArticlesFiltersProps {
  categories: Category[];
}

export default function ArticlesFilters({ categories }: ArticlesFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  const handleFilterChange = (
    newSearch: string,
    newCategory: string,
    newStatus: string
  ) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newCategory) params.set("category", newCategory);
    if (newStatus) params.set("status", newStatus);

    startTransition(() => {
      router.push(`/admin/articles?${params.toString()}`);
    });
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange(search, category, status);
  };

  return (
    <form
      onSubmit={onSearchSubmit}
      className="flex flex-wrap items-center gap-4 bg-white border border-brand-border p-4 rounded-xl shadow-sm font-sans mb-6 select-none"
    >
      {/* Search Input */}
      <div className="flex-1 min-w-[240px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title..."
          className="w-full pl-10 pr-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark"
        />
      </div>

      {/* Category Select */}
      <div className="min-w-[160px]">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange(search, e.target.value, status);
          }}
          className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status Select */}
      <div className="min-w-[140px]">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleFilterChange(search, category, e.target.value);
          }}
          className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
        >
          <option value="">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="SCHEDULED">Scheduled</option>
        </select>
      </div>

      {/* Clear Filters Link */}
      {(search || category || status) && (
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("");
            setStatus("");
            router.push("/admin/articles");
          }}
          className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors px-2"
        >
          Clear
        </button>
      )}

      {isPending && (
        <span className="text-xs text-brand-muted animate-pulse">Filtering...</span>
      )}
    </form>
  );
}
