import React from "react";
import { prisma } from "@/lib/db";
import SettingsForm from "@/components/SettingsForm";

export const revalidate = 0; // Dynamic rendering

export default async function SettingsPage() {
  // Fetch site settings
  const settings = await prisma.setting.findUnique({
    where: { id: "site_settings" },
  });

  return (
    <div className="p-8 space-y-8 font-sans max-w-6xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark uppercase">
          Site Settings
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Configure branding settings, author biographies, social contacts, and system preferences.
        </p>
      </div>

      {/* Settings Form */}
      <SettingsForm settings={settings} />
    </div>
  );
}
