import PublicHeader from "@/components/PublicHeader";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <PublicHeader />
      <main className="max-w-5xl mx-auto px-6 py-20 space-y-16">
        <section className="rounded-[2rem] border border-brand-border bg-white p-12 shadow-sm">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
              About MAD VIEW
            </p>
            <h1 className="font-serif text-5xl text-brand-dark leading-tight">
              A personal political journal for independent inquiry.
            </h1>
            <p className="text-lg leading-8 text-brand-muted">
              MAD VIEW is a single-author publication focused on essays, analysis, and opinion that treats politics as an intellectual craft rather than a daily spectacle.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 mt-12">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-brand-dark">Why this publication exists</h2>
              <p className="text-sm leading-8 text-brand-muted">
                The goal is to offer a cleaner alternative to the crowded media landscape: one voice, one editorial frame, and a clear commitment to rigorous political thought.
              </p>
              <p className="text-sm leading-8 text-brand-muted">
                Each piece is written to make complex ideas more approachable without sacrificing nuance or intellectual seriousness.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-brand-border bg-brand-bg p-8">
              <h3 className="font-serif text-2xl text-brand-dark">Editorial philosophy</h3>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-brand-muted list-disc list-inside">
                <li>Prioritize clarity, not clickability.</li>
                <li>Encourage sustained political reflection.</li>
                <li>Keep the reading experience elegant and distraction-free.</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-brand-border bg-white p-10 shadow-sm">
            <h2 className="font-serif text-3xl text-brand-dark">The author</h2>
            <p className="mt-5 text-sm leading-8 text-brand-muted">
              The platform is designed for a single author who manages every article, image, and editorial decision. That means the publication remains tightly focused and personally curated.
            </p>
            <p className="mt-5 text-sm leading-8 text-brand-muted">
              If you want a site that looks like a high-end journal and feels like a personal platform, MAD VIEW is built for that purpose.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-brand-muted">
              Contact: <Link href="mailto:author@madview.com" className="text-accent hover:text-accent-hover">author@madview.com</Link>
            </div>
            <Link
              href="/archive"
              className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark transition hover:border-accent hover:text-accent"
            >
              Browse the archive
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
