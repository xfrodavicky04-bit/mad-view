import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";

export default function AdminMediaPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
              Media Library
            </p>
            <h1 className="font-serif text-5xl text-brand-dark leading-tight mt-3">
              Manage publication assets.
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-brand-muted mt-5">
              Upload and organize cover images, profile photos, and any visual assets for your articles.
            </p>
          </div>
          <Link
            href="/admin/write"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-accent-hover"
          >
            Upload new image
          </Link>
        </div>

        <div className="mt-10 rounded-[2rem] border border-brand-border bg-white p-10 shadow-sm">
          <div className="text-sm text-brand-muted">
            The media library is scaffolded as a placeholder here. You can later connect uploads to the existing article image flow.
          </div>
        </div>
      </div>
    </div>
  );
}
