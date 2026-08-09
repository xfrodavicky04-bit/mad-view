import Link from "next/link";
import { notFound } from "next/navigation";

const articleData: Record<string, { title: string; category: string; excerpt: string; content: string; published: string; readingTime: string }> = {
  "future-of-political-power": {
    title: "The Future of Political Power in an Era of Change",
    category: "Politics",
    excerpt: "A closer look at the shifting alliances, institutional strain, and the new rules of influence in modern governance.",
    content:
      "<p>The political landscape is no longer shaped by old institutions alone. Independent voices, citizen movements, and new cultural norms are altering narratives around power.</p><p>Strong editorial writing can make sense of these shifts by asking not only who wins elections, but what kind of civic imagination we are building.</p><blockquote>The best political writing is a conversation with the future rather than a summary of the present.</blockquote><p>Each article on MAD VIEW is designed to remain readable, intentional, and grounded in argument.</p>",
    published: "Aug 2026",
    readingTime: "8 min read",
  },
  "independent-voices": {
    title: "Why Independent Voices Matter More Than Ever",
    category: "Opinion",
    excerpt: "A short manifesto for thoughtful political commentary beyond the news cycle.",
    content:
      "<p>Independence in political writing is not an aesthetic, it is a responsibility. It means resisting the noise of daily outrage and choosing arguments that deepen understanding.</p><p>Readers deserve form and clarity, not a flood of hot takes.</p>",
    published: "Jul 2026",
    readingTime: "6 min read",
  },
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articleData[params.slug];
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <nav className="mb-8 text-sm uppercase tracking-[0.35em] text-brand-muted font-semibold">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-3">/</span>
          <Link href="/articles" className="hover:text-accent transition-colors">
            Articles
          </Link>
          <span className="mx-3">/</span>
          <span className="text-brand-dark">{article.title}</span>
        </nav>

        <article className="space-y-10">
          <header className="space-y-6">
            <div className="text-[11px] uppercase tracking-[0.45em] text-accent font-semibold">
              {article.category}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight tracking-[-0.03em] text-brand-dark">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.25em] text-brand-muted">
              <span>{article.readingTime}</span>
              <span>·</span>
              <span>{article.published}</span>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-brand-muted">
              {article.excerpt}
            </p>
          </header>

          <div className="rounded-[2rem] overflow-hidden bg-brand-dark/5">
            <div className="relative h-[420px] bg-[linear-gradient(180deg,rgba(17,17,17,0.1),rgba(17,17,17,0.65))]">
              <div className="absolute inset-0 bg-[url('/images/article-hero.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute bottom-6 left-6 text-white text-sm uppercase tracking-[0.3em] font-semibold">
                Editorial photography
              </div>
            </div>
          </div>

          <div className="space-y-8 max-w-4xl text-base leading-8 text-brand-dark">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            <figure className="rounded-[1.75rem] overflow-hidden border border-brand-border bg-brand-bg shadow-sm">
              <div className="h-72 bg-[url('/images/article-image.jpg')] bg-center bg-cover" />
              <figcaption className="p-6 text-sm text-brand-muted">
                Photograph: political rhythm and public inquiry.
              </figcaption>
            </figure>
            <div className="rounded-[1.75rem] border border-brand-border bg-white p-10 shadow-sm">
              <p className="text-lg leading-9 text-brand-dark font-serif">
                "Political journalism must make space for the reader to think, not just react. The most valuable power is the power to reconsider." 
              </p>
            </div>
            <p className="text-sm leading-7 text-brand-muted">
              This article page is part of the initial editorial UI for MAD VIEW, shaped to feel like a thoughtful, serious independent publication.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
