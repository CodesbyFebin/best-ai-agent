import React from 'react';
import AnnouncementBar from '../layout/AnnouncementBar';
import Header from '../layout/Header';
import Hero from './Hero';
import ProofStrip from './ProofStrip';
import DirectAnswer from './DirectAnswer';
import CategoryGrid from './CategoryGrid';
import FeaturedAgents from './FeaturedAgents';
import AgentFinder from './AgentFinder';
import Leaderboard from './Leaderboard';
import ComparisonGrid from './ComparisonGrid';
import ResearchSection from './ResearchSection';
import RecentReviews from './RecentReviews';
import EcosystemSection from './EcosystemSection';
import MethodologySection from './MethodologySection';
import NewsletterForm from './NewsletterForm';
import Footer from '../layout/Footer';
import HomepageSchema from '../seo/HomepageSchema';

interface HomepageProps {
  currentView?: string;
  onNavigate: (view: string, siloId?: string, slug?: string) => void;
  onOpenSearch?: () => void;
  onOpenRss?: () => void;
  onOpenPseoRepo?: () => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  currentView = 'home',
  onNavigate,
  onOpenSearch,
  onOpenRss,
  onOpenPseoRepo
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white">
      {/* Structured JSON-LD Schema */}
      <HomepageSchema />

      {/* 1. Announcement Bar */}
      <AnnouncementBar 
        onNavigateToMethodology={() => onNavigate('methodology')} 
      />

      {/* 2. Global Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onOpenRss={onOpenRss}
        onOpenPseoRepo={onOpenPseoRepo}
      />

      <main id="main-content">
        {/* 3. Hero & Intelligent Search */}
        <Hero
          onSearchSubmit={(query) => {
            if (onOpenSearch) onOpenSearch();
          }}
          onSelectCategoryFilter={(category) => {
            onNavigate('silo-pillar', 'reviews');
          }}
          onNavigateToFinder={() => {
            const finderElem = document.getElementById('agent-finder-section');
            if (finderElem) {
              finderElem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onNavigateToCompare={() => onNavigate('compare')}
          onNavigateToAgent={(slug) => onNavigate('product', 'reviews', slug)}
        />

        {/* 4. Proof & Freshness Strip */}
        <ProofStrip
          onNavigateToDirectory={() => onNavigate('silo-pillar', 'reviews')}
          onNavigateToMethodology={() => onNavigate('methodology')}
          onNavigateToResearch={() => onNavigate('silo-pillar', 'research')}
        />

        {/* 5. AEO Direct Answer Summary */}
        <DirectAnswer
          onNavigateToCategory={(cat) => onNavigate('silo-pillar', 'reviews')}
          onNavigateToCompare={() => onNavigate('compare')}
          onNavigateToMethodology={() => onNavigate('methodology')}
        />

        {/* 6. Popular Categories */}
        <CategoryGrid
          onSelectCategory={(catName) => onNavigate('silo-pillar', 'reviews')}
        />

        {/* 7. Featured AI Agents & Benchmarks */}
        <FeaturedAgents
          onNavigateToAgent={(slug) => onNavigate('product', 'reviews', slug)}
          onNavigateToCompare={(pairSlug) => onNavigate('compare')}
          onNavigateToMethodology={() => onNavigate('methodology')}
        />

        {/* 8. Interactive Agent Finder */}
        <div id="agent-finder-section">
          <AgentFinder
            onNavigateToAgent={(slug) => onNavigate('product', 'reviews', slug)}
            onNavigateToCompare={() => onNavigate('compare')}
          />
        </div>

        {/* 9. Transparent Leaderboard Table */}
        <Leaderboard
          onNavigateToAgent={(slug) => onNavigate('product', 'reviews', slug)}
          onNavigateToCompare={() => onNavigate('compare')}
        />

        {/* 10. Featured Comparisons */}
        <ComparisonGrid
          onNavigateToPair={(pairSlug) => onNavigate('comparison-pair', 'compare', pairSlug)}
          onNavigateToMatrix={() => onNavigate('compare')}
        />

        {/* 11. Original Benchmarks and Research */}
        <ResearchSection
          onNavigateToResearch={() => onNavigate('silo-pillar', 'research')}
        />

        {/* 12. Recently Updated Reviews */}
        <RecentReviews
          onNavigateToAgent={(slug) => onNavigate('product', 'reviews', slug)}
        />

        {/* 13. Ecosystem Exploration Network */}
        <EcosystemSection />

        {/* 14. Methodology & Editorial Trust */}
        <MethodologySection
          onNavigateToMethodology={() => onNavigate('methodology')}
          onNavigateToAuthors={() => onNavigate('authors')}
        />

        {/* 15. Newsletter Market Intelligence CTA */}
        <NewsletterForm />
      </main>

      {/* Structured Authority Footer */}
      <Footer
        onNavigate={onNavigate}
        onOpenRss={onOpenRss}
        onOpenPseoRepo={onOpenPseoRepo}
      />
    </div>
  );
};

export default Homepage;
