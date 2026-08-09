import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  const articles = await prisma.article.findMany({
    where: { categoryId: category.id, status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 6,
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <nav className="mb-6 text-sm uppercase tracking-[0.35em] text-brand-muted font-semibold">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-3">/</span>
          <span>{category.name}</span>
        </nav>

        <div className="space-y-4 mb-12">
          <h1 className="font-serif text-5xl leading-tight text-brand-dark">
            {category.name}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-muted">
            Exploring the latest essays and analysis within the {category.name.toLowerCase()} category.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-[1.75rem] border border-brand-border bg-white p-12 text-brand-muted text-center shadow-sm">
            No published articles found in this category yet.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
                  {category.name}
                </span>
                <h2 className="font-serif text-2xl text-brand-dark mt-5">
                  {article.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-brand-muted">{article.excerpt || "A concise, thoughtful piece from the archive."}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
