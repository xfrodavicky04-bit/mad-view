import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="space-y-4 mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
            Categories
          </p>
          <h1 className="font-serif text-5xl text-brand-dark leading-tight">
            Browse the journal by subject.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-muted">
            Each category collects essays, investigations, and commentary that reflect the publication’s editorial vision.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 ? (
            <div className="rounded-[1.75rem] border border-brand-border bg-white p-12 text-brand-muted shadow-sm">
              No categories have been created yet.
            </div>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
                  Category
                </div>
                <h2 className="font-serif text-2xl text-brand-dark mt-5 group-hover:text-accent transition-colors">
                  {category.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-brand-muted">
                  {category.description || "Political reporting and analysis framed in clear, serious prose."}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
