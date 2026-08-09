"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  FolderOpen,
  Settings,
  Layers,
  BarChart3,
  LogOut,
  ExternalLink,
  User,
} from "lucide-react";

interface AdminSidebarProps {
  admin: {
    name: string;
    email: string;
    profileImage: string | null;
  } | null;
  settings: {
    siteName: string;
  } | null;
}

export default function AdminSidebar({ admin, settings }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Articles", href: "/admin/articles", icon: FileText },
    { name: "New Article", href: "/admin/write", icon: PenSquare },
    { name: "Categories", href: "/admin/categories", icon: FolderOpen },
    { name: "Media", href: "/admin/media", icon: Layers },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Profile", href: "/admin/profile", icon: User },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-brand-border bg-white flex flex-col h-screen sticky top-0 font-sans select-none">
      {/* Branding */}
      <div className="p-6 border-b border-brand-border flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl tracking-wide font-bold text-brand-dark">
            {settings?.siteName || "MAD VIEW"}
          </h2>
          <span className="text-[10px] tracking-widest text-brand-muted uppercase font-bold">
            Editorial CMS
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-accent text-white"
                  : "text-brand-dark hover:bg-brand-bg"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-brand-muted"}`} />
              {item.name}
            </Link>
          );
        })}

        {/* Separator */}
        <div className="h-px bg-brand-border my-6"></div>

        {/* View Public Site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-brand-dark hover:bg-brand-bg transition-colors duration-150"
        >
          <span className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-brand-muted" />
            View Site
          </span>
        </Link>
      </nav>

      {/* Admin User Profile Card & Logout */}
      <div className="p-4 border-t border-brand-border bg-brand-bg/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center overflow-hidden shrink-0">
            {admin?.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={admin.profileImage}
                alt={admin.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-brand-muted" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-brand-dark truncate">
              {admin?.name || "Administrator"}
            </p>
            <p className="text-[10px] text-brand-muted truncate">
              {admin?.email || "admin@madview.com"}
            </p>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-brand-border rounded-lg text-xs font-medium text-brand-dark hover:bg-red-50 hover:text-accent hover:border-red-200 transition-all duration-150 focus:outline-none"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
