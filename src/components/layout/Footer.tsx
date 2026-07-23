import React from 'react';
import ProgrammaticFooter from './ProgrammaticFooter';

interface FooterProps {
  onNavigate?: (view: string, siloId?: string, slug?: string) => void;
  onOpenRss?: () => void;
  onOpenPseoRepo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRss,
  onOpenPseoRepo
}) => {
  const handleNavigate = (path: string) => {
    if (!onNavigate) return;
    
    if (path === '/') {
      onNavigate('home');
      return;
    }

    if (path.startsWith('/agents/')) {
      const slug = path.replace('/agents/', '').replace(/\/$/, '');
      if (slug) {
        onNavigate('product', 'reviews', slug);
      } else {
        onNavigate('home');
      }
      return;
    }

    if (path === '/agents/') {
      onNavigate('home');
      return;
    }

    if (path.startsWith('/categories/')) {
      const slug = path.replace('/categories/', '').replace(/\/$/, '');
      onNavigate('silo-pillar', slug || 'reviews');
      return;
    }

    if (path === '/categories/') {
      onNavigate('silo-pillar', 'reviews');
      return;
    }

    if (path.startsWith('/compare/')) {
      const pair = path.replace('/compare/', '').replace(/\/$/, '');
      if (pair) {
        onNavigate('comparison-pair', 'compare', pair);
      } else {
        onNavigate('compare');
      }
      return;
    }

    if (path === '/compare/') {
      onNavigate('compare');
      return;
    }

    if (path === '/frameworks/') {
      onNavigate('silo-pillar', 'frameworks');
      return;
    }

    if (path === '/mcp-servers/') {
      onNavigate('silo-pillar', 'mcp');
      return;
    }

    if (path === '/research/') {
      onNavigate('silo-pillar', 'research');
      return;
    }

    if (path === '/methodology/') {
      onNavigate('methodology');
      return;
    }

    if (path === '/authors/') {
      onNavigate('authors');
      return;
    }

    if (path === '/sitemap/') {
      onNavigate('sitemap');
      return;
    }

    // Default fallback to path
    onNavigate(path);
  };

  return (
    <ProgrammaticFooter
      onNavigate={handleNavigate}
      onOpenRss={onOpenRss}
      onOpenPseoRepo={onOpenPseoRepo}
    />
  );
};

export default Footer;

