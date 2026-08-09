"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveArticleAction } from "@/app/admin/articles/actions";
import TiptapEditor from "@/components/TiptapEditor";
import { optimizeImage } from "@/lib/imageOptimizer";
import {
  Save,
  Eye,
  Globe,
  Upload,
  X,
  Loader2,
  Calendar,
  Check,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  categoryId: string | null;
  status: string;
  featured: boolean;
  publishedAt: Date | string | null;
}

interface ArticleEditorFormProps {
  article?: Article;
  categories: Category[];
}

export default function ArticleEditorForm({
  article,
  categories,
}: ArticleEditorFormProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [content, setContent] = useState(article?.content || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [coverImage, setCoverImage] = useState<string | null>(
    article?.coverImage || null
  );
  const [categoryId, setCategoryId] = useState<string>(
    article?.categoryId || ""
  );
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "SCHEDULED">(
    (article?.status as any) || "DRAFT"
  );
  const [featured, setFeatured] = useState(article?.featured || false);
  const [publishedAt, setPublishedAt] = useState<string>(
    article?.publishedAt
      ? new Date(article.publishedAt).toISOString().split("T")[0]
      : ""
  );

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showMetadata, setShowMetadata] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file: optimizedFile, width, height } = await optimizeImage(file, 1600);
      const data = new FormData();
      data.append("file", optimizedFile);
      if (width) data.append("width", width.toString());
      if (height) data.append("height", height.toString());

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");
      const json = await res.json();
      if (json.success && json.url) {
        setCoverImage(json.url);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload cover image.");
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Handler
  const handleSave = async (selectedStatus?: typeof status) => {
    const targetStatus = selectedStatus || status;
    if (!title) {
      setErrorMsg("Article title is required.");
      return;
    }
    if (!content || content === "<p></p>") {
      setErrorMsg("Article content cannot be empty.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    const payload = {
      id: article?.id,
      title,
      slug: slug || undefined,
      content,
      excerpt: excerpt || undefined,
      coverImage,
      categoryId: categoryId || null,
      status: targetStatus,
      featured,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    };

    const res = await saveArticleAction(payload);
    setIsSaving(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      router.push("/admin/articles");
      router.refresh();
    }
  };

  // Date formatted for preview
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const selectedCategoryName =
    categories.find((c) => c.id === categoryId)?.name || "Politics";

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-16">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-border select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 border border-brand-border rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-bg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold text-brand-dark">
              {article ? "Edit Article" : "Write Article"}
            </h1>
            <p className="text-xs text-brand-muted">
              {status === "PUBLISHED" ? "Live on website" : "Draft document"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview Trigger */}
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-brand-border rounded-lg text-sm font-semibold text-brand-dark hover:bg-brand-bg transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-brand-muted" />
            Preview
          </button>

          {/* Quick Draft save */}
          {status !== "PUBLISHED" && (
            <button
              type="button"
              onClick={() => handleSave("DRAFT")}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 border border-brand-border rounded-lg text-sm font-semibold text-brand-dark hover:bg-brand-bg transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin text-brand-muted" />
              ) : (
                <Save className="w-4 h-4 text-brand-muted" />
              )}
              Save Draft
            </button>
          )}

          {/* Publish / Apply Changes */}
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-semibold tracking-wide transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {article ? "Update Article" : "Publish Now"}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border-l-4 border-accent text-red-800 text-sm rounded-r-md">
          {errorMsg}
        </div>
      )}

      {/* Editor Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Area */}
          <div className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your editorial headline..."
              className="w-full bg-transparent border-b border-transparent focus:border-brand-border py-2 font-serif text-3xl md:text-4xl font-bold focus:outline-none placeholder-gray-300 text-brand-dark"
            />
          </div>

          {/* Tiptap editor canvas */}
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {/* Configurations column */}
        <div className="space-y-6">
          {/* Image cover uploader */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-sm font-bold text-brand-dark mb-4 pb-2 border-b border-brand-border">
              Cover Image
            </h3>

            {coverImage ? (
              <div className="relative rounded-lg overflow-hidden border border-brand-border bg-brand-bg group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full aspect-video object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-brand-border rounded-lg p-8 text-center hover:bg-brand-bg/40 hover:border-accent cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCoverUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                ) : (
                  <Upload className="w-8 h-8 text-brand-muted" />
                )}
                <div>
                  <p className="text-xs font-semibold text-brand-dark">
                    {isUploading ? "Uploading..." : "Upload Cover Image"}
                  </p>
                  <p className="text-[10px] text-brand-muted mt-1">
                    PNG, JPEG or WEBP (Max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Settings / Metadata panel */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-sm font-bold text-brand-dark mb-2 pb-2 border-b border-brand-border">
              Publishing Options
            </h3>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none text-brand-dark"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Visibility Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none text-brand-dark"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
              </select>
            </div>

            {/* Scheduled Publish Date */}
            {status === "SCHEDULED" && (
              <div className="space-y-1.5 animate-slide-up">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Publish Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                  <input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none text-brand-dark"
                  />
                </div>
              </div>
            )}

            {/* Featured Selection */}
            <div className="flex items-center gap-3 pt-2">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-accent border-brand-border rounded focus:ring-accent"
              />
              <label
                htmlFor="featured"
                className="text-xs font-semibold text-brand-dark uppercase tracking-wider select-none cursor-pointer"
              >
                Featured Article
              </label>
            </div>

            {/* Advanced Slug & Excerpt Accordion */}
            <div className="pt-2 border-t border-brand-border">
              <button
                type="button"
                onClick={() => setShowMetadata(!showMetadata)}
                className="w-full flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider hover:text-brand-dark"
              >
                <span>SEO & Excerpt Configuration</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    showMetadata ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMetadata && (
                <div className="space-y-4 mt-4 animate-slide-up">
                  {/* Custom Slug */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-brand-muted uppercase">
                      Custom URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="the-future-of-politics"
                      className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-xs focus:outline-none text-brand-dark"
                    />
                  </div>

                  {/* Custom Excerpt */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-brand-muted uppercase">
                      Search Excerpt
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      placeholder="Brief meta description for search engines..."
                      className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg font-sans text-xs focus:outline-none text-brand-dark resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Device-adaptive live preview overlay */}
      {previewOpen && (
        <div className="fixed inset-0 bg-brand-dark/45 backdrop-blur-sm z-50 flex flex-col animate-fade-in select-none">
          {/* Header toolbar */}
          <div className="bg-white border-b border-brand-border p-4 flex items-center justify-between shrink-0">
            <span className="font-serif text-lg font-bold text-brand-dark tracking-wide">
              Live Responsive Preview
            </span>

            {/* Device Selectors */}
            <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-lg border border-brand-border">
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                className={`p-2 rounded-md ${
                  previewDevice === "desktop" ? "bg-white shadow-sm text-accent" : "text-brand-muted hover:text-brand-dark"
                }`}
                title="Desktop Width"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("tablet")}
                className={`p-2 rounded-md ${
                  previewDevice === "tablet" ? "bg-white shadow-sm text-accent" : "text-brand-muted hover:text-brand-dark"
                }`}
                title="Tablet Width"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                className={`p-2 rounded-md ${
                  previewDevice === "mobile" ? "bg-white shadow-sm text-accent" : "text-brand-muted hover:text-brand-dark"
                }`}
                title="Mobile Width"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="p-2 border border-brand-border rounded-lg hover:bg-brand-bg hover:text-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preview Viewport Container */}
          <div className="flex-1 overflow-y-auto bg-[#eae8e1] flex justify-center py-8 px-4">
            <div
              className={`bg-brand-bg text-brand-dark shadow-xl border border-brand-border transition-all duration-300 overflow-y-auto flex flex-col h-full rounded-md ${
                previewDevice === "desktop"
                  ? "w-full max-w-5xl"
                  : previewDevice === "tablet"
                  ? "w-[768px]"
                  : "w-[390px]"
              }`}
            >
              {/* Fake Public Header */}
              <div className="py-6 px-8 border-b border-brand-border flex items-center justify-between font-sans shrink-0 bg-white">
                <span className="font-serif text-lg tracking-wider font-bold">
                  MAD VIEW
                </span>
                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                  {selectedCategoryName}
                </span>
              </div>

              {/* Preview Article Content */}
              <div className="flex-1 bg-brand-bg px-6 py-12 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Category */}
                  <span className="text-xs uppercase font-bold tracking-widest text-accent font-sans">
                    {selectedCategoryName}
                  </span>

                  {/* Title */}
                  <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-brand-dark">
                    {title || "Untitled Article"}
                  </h1>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-brand-muted font-sans pt-2 border-t border-brand-border pb-4">
                    <span>By Naga Vigneshwaran</span>
                    <span>·</span>
                    <span>{formattedDate}</span>
                    <span>·</span>
                    <span>1 min read</span>
                  </div>

                  {/* Cover Image */}
                  {coverImage && (
                    <div className="rounded-lg overflow-hidden border border-brand-border my-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImage}
                        alt="Cover Preview"
                        className="w-full object-cover max-h-[450px]"
                      />
                    </div>
                  )}

                  {/* Article content html */}
                  <article
                    className="prose prose-serif font-serif text-brand-dark text-lg leading-relaxed space-y-5"
                    dangerouslySetInnerHTML={{
                      __html:
                        content ||
                        "<p className='text-gray-300 italic'>Write content in the editor to see it here.</p>",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
