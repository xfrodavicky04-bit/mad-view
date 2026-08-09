import PublicHeader from "@/components/PublicHeader";
import {
  PublicHero,
  FeaturedArticleSection,
  LatestArticlesSection,
  TrendingSection,
  CategoriesSection,
  HomepageFooter,
} from "@/components/HomepageSections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <PublicHeader />
      <main className="space-y-24 pt-8 pb-16">
        <PublicHero />
        <FeaturedArticleSection />
        <LatestArticlesSection />
        <TrendingSection />
        <CategoriesSection />
        <HomepageFooter />
      </main>
    </div>
  );
}
