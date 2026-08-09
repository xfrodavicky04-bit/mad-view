"use client";

import React, { useTransition, useState } from "react";
import Link from "next/link";
import { deleteArticleAction } from "@/app/admin/articles/actions";
import { formatDate } from "@/lib/utils";
import { FileEdit, Trash2, Eye, Plus, Loader2, AlertCircle } from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  status: string;
  views: number;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  category: {
    name: string;
  } | null;
}

interface ArticlesListProps {
  articles: ArticleItem[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    setDeleteError(null);
    startDeleteTransition(async () => {
      const res = await deleteArticleAction(id);
      if (res?.error) {
        setDeleteError(res.error);
      }
    });
  };

  return (
    <div className="space-y-4 font-sans select-none">
      {deleteError && (
        <div className="p-4 bg-red-50 border-l-4 border-accent text-red-800 text-sm rounded-r-md flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{deleteError}</span>
        </div>
      )}

      <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-16 text-center text-brand-muted text-sm space-y-4">
            <p>No articles match your search or filter criteria.</p>
            <Link
              href="/admin/write"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-xs font-semibold tracking-wider transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Write First Article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-brand-bg/5 transition-colors"
              >
                {/* Left side: Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-16 h-10 bg-brand-bg border border-brand-border rounded overflow-hidden shrink-0 flex items-center justify-center">
                    {article.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-brand-muted font-serif">
                        No image
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                      {article.category?.name || "Uncategorized"}
                    </span>
                    <h3 className="font-serif text-base font-bold text-brand-dark truncate mt-0.5">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-brand-muted mt-1">
                      <span>
                        Created: {formatDate(article.createdAt)}
                      </span>
                      {article.publishedAt && (
                        <>
                          <span>·</span>
                          <span>
                            Published: {formatDate(article.publishedAt)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Stats, Status, Actions */}
                <div className="flex items-center gap-6 shrink-0">
                  {/* Views */}
                  <div className="text-right">
                    <span className="text-xs text-brand-muted block">Views</span>
                    <span className="font-semibold text-sm text-brand-dark flex items-center gap-1 mt-0.5 justify-end">
                      <Eye className="w-3.5 h-3.5 text-brand-muted" />
                      {article.views.toLocaleString()}
                    </span>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      article.status === "PUBLISHED"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : article.status === "SCHEDULED"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {article.status.toLowerCase()}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="p-2 border border-brand-border rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-bg transition-colors"
                      title="Edit article"
                    >
                      <FileEdit className="w-4 h-4" />
                    </Link>

                    {article.status === "PUBLISHED" && (
                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        className="p-2 border border-brand-border rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-bg transition-colors"
                        title="View live article"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      disabled={isDeleting}
                      className="p-2 border border-brand-border rounded-lg text-brand-muted hover:text-accent hover:border-red-200 hover:bg-red-50 transition-colors"
                      title="Delete article"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
