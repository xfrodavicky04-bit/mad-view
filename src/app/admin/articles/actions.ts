"use server";

import { prisma } from "@/lib/db";
import { slugify, generateExcerpt, calculateReadingTime } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ArticleInput {
  id?: string;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  coverImage?: string | null;
  categoryId?: string | null;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED";
  featured?: boolean;
  publishedAt?: Date | string | null;
}

export async function saveArticleAction(input: ArticleInput) {
  const {
    id,
    title,
    content,
    coverImage,
    categoryId,
    status,
    featured = false,
  } = input;

  if (!title) return { error: "Title is required" };
  if (!content) return { error: "Content is required" };

  const finalSlug = input.slug ? slugify(input.slug) : slugify(title);
  const finalExcerpt = input.excerpt || generateExcerpt(content);
  const readingTime = calculateReadingTime(content);

  // Set published timestamp if status is PUBLISHED and not set already
  let publishedAt = input.publishedAt ? new Date(input.publishedAt) : null;
  if (status === "PUBLISHED" && !publishedAt) {
    publishedAt = new Date();
  }

  let resultId = id;

  try {
    // Check if slug is unique (excluding current article)
    const existing = await prisma.article.findFirst({
      where: {
        slug: finalSlug,
        NOT: id ? { id } : undefined,
      },
    });

    if (existing) {
      return { error: "An article with this title or slug already exists." };
    }

    if (id) {
      // Update existing article
      await prisma.article.update({
        where: { id },
        data: {
          title,
          slug: finalSlug,
          content,
          excerpt: finalExcerpt,
          coverImage,
          categoryId: categoryId || null,
          status,
          featured,
          publishedAt,
          readingTime,
        },
      });
    } else {
      // Create new article
      const newArticle = await prisma.article.create({
        data: {
          title,
          slug: finalSlug,
          content,
          excerpt: finalExcerpt,
          coverImage,
          categoryId: categoryId || null,
          status,
          featured,
          publishedAt,
          readingTime,
        },
      });
      resultId = newArticle.id;
    }
  } catch (error) {
    console.error("Save article error:", error);
    return { error: "An error occurred while saving the article." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/articles");
  
  if (id) {
    revalidatePath(`/admin/articles/${id}`);
  }

  return { success: true, articleId: resultId };
}

export async function deleteArticleAction(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Delete article error:", error);
    return { error: "An error occurred while deleting the article." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/articles");
  return { success: true };
}
