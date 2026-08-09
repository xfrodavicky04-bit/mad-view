import Link from "next/link";

const featuredArticle = {
  title: "The Future of Political Power in an Era of Change",
  excerpt:
    "A closer look at the shifting alliances, institutional strain, and what independent politics looks like in 2026.",
  category: "Politics",
  readingTime: "8 min read",
  published: "Aug 2026",
  coverImage: "/images/featured-article.jpg",
  slug: "/articles/future-of-political-power",
};

const latestArticles = [
  {
    title: "Why Independent Voices Matter More Than Ever",
    category: "Opinion",
    excerpt: "A short manifesto for thoughtful political commentary beyond the news cycle.",
    slug: "/articles/independent-voices",
  },
  {
    title: "How the Digital Public Sphere Shapes Policy Debate",
    category: "Analysis",
    excerpt: "Media ecosystems, social media, and the long-term consequences for democratic discourse.",
    slug: "/articles/digital-public-sphere",
  },
  {
    title: "When Institutions Fail: Lessons from Recent Elections",
    category: "Politics",
    excerpt: "In search of the vulnerabilities that political systems quietly reveal under stress.",
    slug: "/articles/institutional-failure",
  },
];

const trendingArticles = [
  {
    title: "Strategic Democracy in a Polarized Age",
    slug: "/articles/strategic-democracy",
  },
  {
    title: "The Hidden Rules of Policy Narratives",
    slug: "/articles/policy-narratives",
  },
  {
    title: "The Ethics of Political Influence",
    slug: "/articles/ethics-of-influence",
  },
];

const categories = [
  { name: "Politics", href: "/category/politics" },
  { name: "Analysis", href: "/category/analysis" },
  { name: "Economy", href: "/category/economy" },
  { name: "Opinion", href: "/category/opinion" },
  { name: "International", href: "/category/international" },
  { name: "Society", href: "/category/society" },
];

export function PublicHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm shadow-brand-dark/5 mb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,0,0,0.12),_transparent_35%)] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-[1.3fr_0.9fr] items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-accent font-semibold">
            EDITORIAL MAGAZINE
          </span>
          <div className="max-w-2xl space-y-5">
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-[-0.03em] text-brand-dark">
              Independent political writing with the clarity of a modern journal.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-brand-muted">
              MAD VIEW is a single-author publication for essays, analysis, opinion, and social commentary — focused on the ideas that matter most.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/articles/the-future-of-political-power"
              className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-dark"
            >
              Read featured article
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-dark transition-colors hover:border-accent hover:text-accent"
            >
              About the author
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] overflow-hidden bg-brand-bg">
          <div className="relative h-[420px] md:h-[520px] bg-brand-dark/5">
            <div className="absolute inset-0 bg-[url('/images/hero-photo.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="p-8 sm:p-10">
            <div className="text-[10px] uppercase tracking-[0.4em] text-brand-muted font-semibold mb-4">
              A personal journal of politics
            </div>
            <h3 className="font-serif text-3xl text-brand-dark leading-tight">
              Ideas for a finer civic imagination.
            </h3>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              A clean reading experience for long-form political investigation, written for readers who prefer depth over noise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedArticleSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="rounded-[2rem] overflow-hidden border border-brand-border bg-white shadow-sm">
          <div className="relative h-[360px] bg-brand-dark/5">
            <div className="absolute inset-0 bg-[url('/images/featured-article.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="p-10 sm:p-12">
            <span className="text-[10px] uppercase tracking-[0.45em] text-accent font-semibold">
              {featuredArticle.category}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark leading-tight mt-6">
              {featuredArticle.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-brand-muted max-w-2xl">
              {featuredArticle.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-brand-muted">
              <span>{featuredArticle.readingTime}</span>
              <span>·</span>
              <span>{featuredArticle.published}</span>
            </div>
            <Link
              href={featuredArticle.slug}
              className="mt-10 inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark transition-colors hover:border-accent hover:text-accent"
            >
              Read the feature
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-muted font-semibold">
              Editor’s Pick
            </p>
            <h3 className="font-serif text-2xl text-brand-dark mt-5">
              Focused analysis for the politically engaged reader.
            </h3>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              A calm, trusted platform for serious arguments that refuses to follow the latest frenzy.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-brand-border bg-brand-bg p-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
              Quick take
            </span>
            <p className="mt-5 text-base leading-8 text-brand-dark">
              This publication is designed not as a press room, but as an individual journal where each piece is crafted intentionally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LatestArticlesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
            Latest Articles
          </p>
          <h2 className="font-serif text-3xl text-brand-dark mt-3">
            Recent dispatches from MAD VIEW.
          </h2>
        </div>
        <Link
          href="/archive"
          className="text-xs uppercase tracking-[0.35em] text-brand-dark font-semibold hover:text-accent transition-colors"
        >
          View archive
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {latestArticles.map((article) => (
          <article
            key={article.slug}
            className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-accent font-semibold">
              {article.category}
            </span>
            <h3 className="font-serif text-2xl leading-tight text-brand-dark mt-5">
              {article.title}
            </h3>
            <p className="text-sm leading-7 text-brand-muted mt-5">
              {article.excerpt}
            </p>
            <Link
              href={article.slug}
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.45em] font-semibold text-accent hover:text-accent-hover"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TrendingSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="rounded-[2rem] border border-brand-border bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
              Trending
            </p>
            <h2 className="font-serif text-3xl text-brand-dark mt-4">
              Topics readers are engaging with this week.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-brand-muted">
            An editorial selection of ideas and frames that carry weight beyond the daily headlines.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {trendingArticles.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="rounded-[1.5rem] border border-brand-border bg-brand-bg p-6 transition hover:border-accent hover:bg-white"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-brand-muted font-semibold">
                TRENDING
              </span>
              <h3 className="font-serif text-xl text-brand-dark mt-5 leading-tight">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-28">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
            Categories
          </p>
          <h2 className="font-serif text-3xl text-brand-dark mt-3">
            Find the conversation that matters.
          </h2>
        </div>
        <Link
          href="/categories"
          className="text-xs uppercase tracking-[0.35em] text-brand-dark font-semibold hover:text-accent transition-colors"
        >
          Explore all categories
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-serif text-2xl text-brand-dark">{category.name}</h3>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Political essays and arguments framed through {category.name.toLowerCase()}.
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomepageFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg py-16">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-start">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
            MAD VIEW
          </p>
          <h2 className="font-serif text-3xl text-brand-dark mt-4">
            A personal editorial publication for readers who value thoughtful political writing.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-brand-muted">
            Discover essays, analysis, and arguments without the clutter — a publication built for a single author’s voice.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-muted font-semibold">
            Explore
          </p>
          <div className="grid gap-2 text-sm text-brand-dark">
            <Link href="/archive" className="hover:text-accent transition-colors">
              Archive
            </Link>
            <Link href="/about" className="hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/search" className="hover:text-accent transition-colors">
              Search
            </Link>
            <Link href="/admin/login" className="hover:text-accent transition-colors">
              Admin login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
