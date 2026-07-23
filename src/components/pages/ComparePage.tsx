import React from 'react';
import ComparisonMatrixPage from '../ComparisonMatrixPage';

interface Props {
  pairSlug?: string;
  onNavigate: (path: string) => void;
}

export default function ComparePage({ pairSlug, onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6">
      <ComparisonMatrixPage
        pairSlug={pairSlug || 'cursor-vs-copilot'}
        onNavigate={(view, slug) => {
          if (slug) {
            onNavigate(`/compare/${slug}/`);
          } else {
            onNavigate('/compare/');
          }
        }}
      />
    </div>
  );
}
