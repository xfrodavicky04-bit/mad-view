"use client";

import React, { useActionState, useState } from "react";
import { loginAction } from "../actions";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4 select-none animate-fade-in">
      <div className="w-full max-w-md bg-white border border-brand-border rounded-xl p-8 shadow-sm">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl tracking-wider font-bold text-brand-dark">
            MAD VIEW
          </h1>
          <p className="font-sans text-xs tracking-widest text-brand-muted uppercase mt-2">
            Administrator Portal
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-accent text-red-800 text-sm font-sans rounded-r-md">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Email field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-sans text-xs tracking-wider font-semibold text-brand-dark uppercase"
            >
              Admin ID (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark"
                placeholder="admin@madview.com"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block font-sans text-xs tracking-wider font-semibold text-brand-dark uppercase"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-3 bg-brand-bg border border-brand-border rounded-lg font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-sans text-sm font-semibold tracking-wider transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-55"
          >
            {isPending ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center mt-8 pt-6 border-t border-brand-border">
          <p className="font-sans text-xs text-brand-muted">
            Protected personal editorial publication.
          </p>
        </div>
      </div>
    </div>
  );
}
