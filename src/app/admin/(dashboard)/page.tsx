import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  FileEdit,
  Eye,
  Plus,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const revalidate = 0; // Dynamic rendering, disabled caching

export default async function AdminDashboardPage() {
  const session = await getSession();
  const admin = await prisma.admin.findUnique({
    where: { id: session?.adminId || "" },
  });

  // Fetch counts and metrics
  const totalArticles = await prisma.article.count({
    where: { status: "PUBLISHED" },
  });

  const totalDrafts = await prisma.article.count({
    where: { status: "DRAFT" },
  });

  const totalScheduled = await prisma.article.count({
    where: { status: "SCHEDULED" },
  });

  const viewsResult = await prisma.article.aggregate({
    _sum: {
      views: true,
    },
  });
  const totalViews = viewsResult._sum.views || 0;

  // Fetch recent articles
  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      category: true,
    },
  });

  // Calculate greeting
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  }

  return (
    <div className="p-8 space-y-8 font-sans max-w-6xl mx-auto w-full animate-fade-in">
      {/* Greeting and Header */}
      <div className="flex justify-between items-center pb-6 border-b border-brand-border">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark uppercase">
            {greeting}, {admin?.name.split(" ")[0] || "Author"}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Here is the current performance and publication status of MAD VIEW.
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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-bg rounded-lg text-accent">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
              Published
            </span>
            <span className="text-3xl font-serif font-bold text-brand-dark block mt-1">
              {totalArticles}
            </span>
            <span className="text-xs text-brand-muted block mt-1">Live articles</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-bg rounded-lg text-brand-muted">
            <FileEdit className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
              Drafts
            </span>
            <span className="text-3xl font-serif font-bold text-brand-dark block mt-1">
              {totalDrafts}
            </span>
            <span className="text-xs text-brand-muted block mt-1">In progress</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-bg rounded-lg text-brand-muted">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
              Scheduled
            </span>
            <span className="text-3xl font-serif font-bold text-brand-dark block mt-1">
              {totalScheduled}
            </span>
            <span className="text-xs text-brand-muted block mt-1">Pending launch</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-brand-bg rounded-lg text-accent">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
              Total Views
            </span>
            <span className="text-3xl font-serif font-bold text-brand-dark block mt-1">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-xs text-brand-muted block mt-1">Across all items</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Posts & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles Listing */}
        <div className="lg:col-span-2 bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-brand-border flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold text-brand-dark">
              Recent Articles
            </h3>
            <Link
              href="/admin/articles"
              className="text-xs font-semibold text-accent hover:text-accent-hover flex items-center gap-1.5 transition-colors"
            >
              Manage all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 divide-y divide-brand-border">
            {recentArticles.length === 0 ? (
              <div className="p-12 text-center text-brand-muted text-sm">
                No articles created yet. Get started by writing your first piece.
              </div>
            ) : (
              recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-6 flex items-center justify-between hover:bg-brand-bg/10 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                      {article.category?.name || "Uncategorized"}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-brand-dark truncate mt-0.5">
                      {article.title}
                    </h4>
                    <span className="text-xs text-brand-muted block mt-1">
                      {formatDate(article.createdAt)} · {article.readingTime} min read
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
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

                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="p-2 border border-brand-border rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-bg transition-colors"
                      title="Edit article"
                    >
                      <FileEdit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Panel: Author Profile Summary & Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <h3 className="font-serif text-base font-bold text-brand-dark mb-4 w-full text-left pb-3 border-b border-brand-border">
              Author Profile
            </h3>
            <div className="w-20 h-20 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center overflow-hidden mb-3">
              {admin?.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={admin.profileImage}
                  alt={admin.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-serif text-2xl text-brand-muted">
                  {admin?.name ? admin.name[0] : "A"}
                </span>
              )}
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-dark">
              {admin?.name}
            </h4>
            <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider">
              Independent Editor
            </p>
            <p className="text-xs text-brand-muted font-sans mt-3 line-clamp-3 leading-relaxed">
              {admin?.bio || "No profile biography entered yet."}
            </p>
            <Link
              href="/admin/settings"
              className="mt-4 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              Edit Profile settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
