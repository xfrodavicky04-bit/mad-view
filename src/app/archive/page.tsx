import PublicHeader from "@/components/PublicHeader";
import Link from "next/link";

const archiveData = [
  {
    year: 2026,
    months: [
      {
        name: "August",
        items: [
          { date: "09", title: "The Future of Political Power in an Era of Change", href: "/articles/future-of-political-power" },
          { date: "07", title: "Why Independent Voices Matter More Than Ever", href: "/articles/independent-voices" },
        ],
      },
      {
        name: "July",
        items: [
          { date: "21", title: "How the Digital Public Sphere Shapes Policy Debate", href: "/articles/digital-public-sphere" },
          { date: "15", title: "When Institutions Fail: Lessons from Recent Elections", href: "/articles/institutional-failure" },
        ],
      },
    ],
  },
];

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <PublicHeader />
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">
            Archive
          </p>
          <h1 className="font-serif text-5xl text-brand-dark leading-tight">
            Explore the publication history.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-muted">
            Older essays, commentary, and analysis are kept in a clean archive so you can trace the evolution of ideas over time.
          </p>
        </div>

        <div className="grid gap-10">
          {archiveData.map((year) => (
            <div key={year.year} className="rounded-[2rem] border border-brand-border bg-white p-10 shadow-sm">
              <h2 className="font-serif text-4xl text-brand-dark">{year.year}</h2>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {year.months.map((month) => (
                  <div key={month.name}>
                    <h3 className="font-serif text-2xl text-brand-dark">{month.name}</h3>
                    <div className="mt-5 space-y-4">
                      {month.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between rounded-[1.5rem] border border-brand-border bg-brand-bg p-5 transition hover:border-accent hover:bg-white"
                        >
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-muted font-semibold">
                              {item.date}
                            </span>
                            <h4 className="font-serif text-base text-brand-dark mt-2">
                              {item.title}
                            </h4>
                          </div>
                          <span className="text-xs uppercase tracking-[0.35em] text-accent font-semibold">
                            Read
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
