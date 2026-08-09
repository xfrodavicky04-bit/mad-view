import PublicHeader from "@/components/PublicHeader";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <PublicHeader />
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        <div className="rounded-[2rem] border border-brand-border bg-white p-10 shadow-sm">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
              Search
            </p>
            <h1 className="font-serif text-5xl text-brand-dark leading-tight">
              Find the articles you want.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-brand-muted">
              Search the archive by title, category, and keywords in the article content.
            </p>
          </div>

          <form className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search articles, categories, or topics..."
              className="flex-1 rounded-full border border-brand-border bg-brand-bg px-6 py-4 text-sm text-brand-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-accent-hover"
            >
              Search
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-brand-border bg-white p-10 shadow-sm">
          <p className="text-sm text-brand-muted">
            Search results would appear here once the search function is connected to the published article archive.
          </p>
        </div>
      </main>
    </div>
  );
}
