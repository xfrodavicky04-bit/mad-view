"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface SettingsInput {
  siteName: string;
  siteDescription: string;
  accentColor: string;
  authorName: string;
  authorBio: string;
  authorImage?: string | null;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    email?: string;
  };
}

export async function saveSettingsAction(
  prevState: any,
  input: SettingsInput
) {
  try {
    // 1. Save to settings table
    await prisma.setting.upsert({
      where: { id: "site_settings" },
      update: {
        siteName: input.siteName,
        siteDescription: input.siteDescription,
        accentColor: input.accentColor,
        authorName: input.authorName,
        authorBio: input.authorBio,
        authorImage: input.authorImage,
        socialLinks: JSON.stringify(input.socialLinks),
      },
      create: {
        id: "site_settings",
        siteName: input.siteName,
        siteDescription: input.siteDescription,
        accentColor: input.accentColor,
        authorName: input.authorName,
        authorBio: input.authorBio,
        authorImage: input.authorImage,
        socialLinks: JSON.stringify(input.socialLinks),
      },
    });

    // 2. Sync changes back to Admin profile details
    const firstAdmin = await prisma.admin.findFirst();
    if (firstAdmin) {
      await prisma.admin.update({
        where: { id: firstAdmin.id },
        data: {
          name: input.authorName,
          bio: input.authorBio,
          profileImage: input.authorImage,
        },
      });
    }
  } catch (error) {
    console.error("Save settings error:", error);
    return { error: "Failed to save settings." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/about");
  return { success: true };
}
