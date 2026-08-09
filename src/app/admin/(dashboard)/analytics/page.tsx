import React from "react";
import Link from "next/link";

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-4 mb-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
            Analytics
          </p>
          <h1 className="font-serif text-5xl text-brand-dark leading-tight">Audience insights</h1>
          <p className="max-w-3xl text-sm leading-7 text-brand-muted">
            Track readership, views, and article engagement in one place. This is a scaffold for future metrics and charts.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="font-serif text-xl text-brand-dark">Total visitors</h2>
            <p className="mt-4 text-4xl font-serif text-brand-dark">—</p>
            <p className="mt-3 text-sm text-brand-muted">Data will appear once analytics are connected.</p>
          </div>
          <div className="rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="font-serif text-xl text-brand-dark">Popular articles</h2>
            <p className="mt-4 text-sm text-brand-muted">A list of most-read stories will be shown here.</p>
          </div>
          <div className="rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="font-serif text-xl text-brand-dark">Reading time</h2>
            <p className="mt-4 text-sm text-brand-muted">Average reader engagement and time spent per article.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
