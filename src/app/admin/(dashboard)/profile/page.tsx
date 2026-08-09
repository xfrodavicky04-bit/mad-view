import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminProfilePage() {
  const admin = await prisma.admin.findFirst();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-4 mb-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
            Profile
          </p>
          <h1 className="font-serif text-5xl text-brand-dark leading-tight">Author profile</h1>
          <p className="max-w-3xl text-sm leading-7 text-brand-muted">
            Update your public author profile, biography, and contact details from the admin settings page.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-brand-dark">Author Details</h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Name: {admin?.name || "Not set"}
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Email: {admin?.email || "Not set"}
            </p>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Bio: {admin?.bio || "A short biography has not been added yet."}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-brand-border bg-brand-bg p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-brand-dark">Manage profile</h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Use the Settings page to change the display name, profile image, and social links shown across the public site.
            </p>
            <Link
              href="/admin/settings"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-accent-hover"
            >
              Edit Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
