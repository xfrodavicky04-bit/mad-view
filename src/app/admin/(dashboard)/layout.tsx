import React from "react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const admin = await prisma.admin.findUnique({
    where: { id: session?.adminId || "" },
  });

  const settings = await prisma.setting.findUnique({
    where: { id: "site_settings" },
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar navigation */}
      <AdminSidebar admin={admin} settings={settings} />

      {/* Content wrapper */}
      <main className="flex-1 flex flex-col min-w-0 bg-brand-bg/40 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
