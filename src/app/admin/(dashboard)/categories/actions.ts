"use server";

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) {
    return { error: "Category name is required." };
  }

  const slug = slugify(name);

  try {
    const existing = await prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      return { error: "A category with this name already exists." };
    }

    await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
      },
    });
  } catch (error) {
    console.error("Create category error:", error);
    return { error: "An unexpected error occurred." };
  }

  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategoryAction(id: string) {
  try {
    const articleCount = await prisma.article.count({
      where: { categoryId: id },
    });

    if (articleCount > 0) {
      return {
        error:
          "Cannot delete category with associated articles. Reassign those articles first.",
      };
    }

    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return { error: "An unexpected error occurred." };
  }

  revalidatePath("/admin/categories");
  return { success: true };
}
