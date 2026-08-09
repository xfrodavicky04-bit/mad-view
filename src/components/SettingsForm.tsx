"use client";

import React, { useState, useRef, useTransition } from "react";
import { saveSettingsAction } from "@/app/admin/(dashboard)/settings/actions";
import { optimizeImage } from "@/lib/imageOptimizer";
import {
  Settings,
  User,
  Share2,
  Upload,
  X,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

interface SettingData {
  siteName: string;
  siteDescription: string;
  accentColor: string;
  authorName: string;
  authorBio: string;
  authorImage: string | null;
  socialLinks: string; // JSON string
}

interface SettingsFormProps {
  settings: SettingData | null;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Parse social links
  let parsedSocials = {
    twitter: "",
    instagram: "",
    youtube: "",
    email: "",
  };
  if (settings?.socialLinks) {
    try {
      parsedSocials = {
        ...parsedSocials,
        ...JSON.parse(settings.socialLinks),
      };
    } catch (e) {
      // Ignore
    }
  }

  // Form states
  const [siteName, setSiteName] = useState(settings?.siteName || "MAD VIEW");
  const [siteDescription, setSiteDescription] = useState(
    settings?.siteDescription || ""
  );
  const [accentColor, setAccentColor] = useState(
    settings?.accentColor || "#8b0000"
  );
  const [authorName, setAuthorName] = useState(
    settings?.authorName || "Naga Vigneshwaran"
  );
  const [authorBio, setAuthorBio] = useState(settings?.authorBio || "");
  const [authorImage, setAuthorImage] = useState<string | null>(
    settings?.authorImage || null
  );

  const [twitter, setTwitter] = useState(parsedSocials.twitter);
  const [instagram, setInstagram] = useState(parsedSocials.instagram);
  const [youtube, setYoutube] = useState(parsedSocials.youtube);
  const [email, setEmail] = useState(parsedSocials.email);

  // DP Upload
  const handleDPUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Resize profile photo to max 400x400 for thumbnails
      const { file: optimizedFile, width, height } = await optimizeImage(file, 400);
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
        setAuthorImage(json.url);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile photo.");
    } finally {
      setIsUploading(false);
    }
  };

  // Save Settings
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(false);

    if (!siteName) {
      setErrorMsg("Website name is required.");
      return;
    }
    if (!authorName) {
      setErrorMsg("Author name is required.");
      return;
    }

    const payload = {
      siteName,
      siteDescription,
      accentColor,
      authorName,
      authorBio,
      authorImage,
      socialLinks: {
        twitter,
        instagram,
        youtube,
        email,
      },
    };

    startTransition(async () => {
      const res = await saveSettingsAction(null, payload);
      if (res?.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none">
      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border-l-4 border-accent text-red-800 text-sm rounded-r-md flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-green-50 border-l-4 border-green-600 text-green-800 text-sm rounded-r-md flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span>Site settings and profile updated successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: General Site Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Box */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-brand-dark flex items-center gap-2 pb-3 border-b border-brand-border">
              <Settings className="w-4 h-4 text-accent" />
              General settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Website Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark"
                  placeholder="MAD VIEW"
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Website Description
                </label>
                <input
                  type="text"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-brand-dark"
                  placeholder="Independent ideas, politics and society journal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Theme Accent Color
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 bg-transparent border-0 cursor-pointer p-0 shrink-0"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Box */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-brand-dark flex items-center gap-2 pb-3 border-b border-brand-border">
              <Share2 className="w-4 h-4 text-accent" />
              Social profiles & Contacts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  X / Twitter Link
                </label>
                <input
                  type="url"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
                  placeholder="https://x.com/username"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Instagram Link
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  YouTube Link
                </label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
                  placeholder="https://youtube.com/channel"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
                  placeholder="contact@madview.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Author Profile Settings */}
        <div className="space-y-6">
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm space-y-6 flex flex-col">
            <h2 className="font-serif text-base font-bold text-brand-dark flex items-center gap-2 pb-3 border-b border-brand-border w-full">
              <User className="w-4 h-4 text-accent" />
              Author details
            </h2>

            {/* Avatar Uploader */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24 rounded-full border border-brand-border bg-brand-bg flex items-center justify-center overflow-hidden shrink-0 group">
                {authorImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={authorImage}
                      alt="Author Avatar"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setAuthorImage(null)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-150 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <User className="w-10 h-10 text-brand-muted" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleDPUpload}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3.5 py-1.5 border border-brand-border rounded-lg text-xs font-semibold text-brand-dark hover:bg-brand-bg transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-brand-muted" />
                Upload Photo
              </button>
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark"
                  placeholder="Naga Vigneshwaran"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Author Biography
                </label>
                <textarea
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none text-brand-dark resize-none leading-relaxed"
                  placeholder="Author bio description..."
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-sans text-sm font-semibold tracking-wider transition-colors duration-200 focus:outline-none disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "SAVING..." : "SAVE SITE SETTINGS"}
          </button>
        </div>
      </div>
    </form>
  );
}
