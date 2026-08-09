import PublicHeader from "@/components/PublicHeader";
import Link from "next/link";

const articles = [
  {
    title: "The Future of Political Power in an Era of Change",
    excerpt: "A closer look at the shifting alliances, institutional strain, and what independent politics looks like in 2026.",
    category: "Politics",
    slug: "future-of-political-power",
  },
  {
    title: "Why Independent Voices Matter More Than Ever",
    excerpt: "A short manifesto for thoughtful political commentary beyond the news cycle.",
    category: "Opinion",
    slug: "independent-voices",
  },
  {
    title: "How the Digital Public Sphere Shapes Policy Debate",
    excerpt: "Media ecosystems, social media, and the long-term consequences for democratic discourse.",
    category: "Analysis",
    slug: "digital-public-sphere",
  },
];

export default function ArticlesIndexPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <PublicHeader />
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
            Articles
          </p>
          <h1 className="font-serif text-5xl text-brand-dark leading-tight">
            The archive of published writing.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-muted">
            Browse the editorial stories, essays, and investigations that define MAD VIEW.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="rounded-[1.75rem] border border-brand-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
                {article.category}
              </span>
              <h2 className="font-serif text-2xl text-brand-dark mt-5 leading-tight">
                {article.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-brand-muted">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
