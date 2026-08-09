"use client";

import React, { useActionState, useTransition, useState } from "react";
import { createCategoryAction, deleteCategoryAction } from "@/app/admin/(dashboard)/categories/actions";
import { FolderPlus, Trash2, Loader2, AlertCircle } from "lucide-react";

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: {
    articles: number;
  };
}

export default function CategoriesList({
  initialCategories,
}: {
  initialCategories: CategoryWithCount[];
}) {
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    null
  );
  const [isDeleting, startDeleteTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) {
      return;
    }

    setErrorMsg(null);
    startDeleteTransition(async () => {
      const res = await deleteCategoryAction(id);
      if (res?.error) {
        setErrorMsg(res.error);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Create Category Form */}
      <div className="md:col-span-1 bg-white border border-brand-border rounded-xl p-6 shadow-sm self-start">
        <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2 mb-4 pb-3 border-b border-brand-border">
          <FolderPlus className="w-5 h-5 text-accent" />
          Add Category
        </h2>

        {state?.error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-accent text-red-800 text-xs font-semibold rounded-r-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block font-sans text-xs font-semibold tracking-wider text-brand-muted uppercase"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark"
              placeholder="e.g. Economy"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="block font-sans text-xs font-semibold tracking-wider text-brand-muted uppercase"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark resize-none"
              placeholder="Brief editorial purpose..."
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-sans text-xs font-semibold tracking-wider transition-colors duration-200 focus:outline-none disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isPending ? "ADDING..." : "ADD CATEGORY"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="md:col-span-2 space-y-4">
        {errorMsg && (
          <div className="p-4 bg-red-50 border-l-4 border-accent text-red-800 text-sm rounded-r-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-brand-border">
            <h2 className="font-serif text-lg font-bold text-brand-dark">
              Existing Sections
            </h2>
          </div>

          <div className="divide-y divide-brand-border">
            {initialCategories.length === 0 ? (
              <div className="p-8 text-center text-brand-muted text-sm">
                No categories created yet.
              </div>
            ) : (
              initialCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-6 flex items-center justify-between hover:bg-brand-bg/5 transition-colors"
                >
                  <div className="pr-4 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-serif text-base font-bold text-brand-dark">
                        {category.name}
                      </h3>
                      <span className="text-[10px] bg-brand-bg border border-brand-border px-2 py-0.5 rounded text-brand-muted font-bold font-sans">
                        /{category.slug}
                      </span>
                    </div>
                    {category.description && (
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                    <span className="text-[10px] text-accent uppercase font-bold tracking-wider block mt-2">
                      {category._count.articles}{" "}
                      {category._count.articles === 1 ? "article" : "articles"}
                    </span>
                  </div>

                  {/* Disable delete for essential defaults like Politics & Analysis */}
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    disabled={isDeleting}
                    className="p-2.5 border border-brand-border rounded-lg text-brand-muted hover:text-accent hover:border-red-200 hover:bg-red-50 transition-colors shrink-0 disabled:opacity-50"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
