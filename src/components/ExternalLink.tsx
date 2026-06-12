import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { getExternalLinks, type ExternalLink } from '../data/externalLinks';

interface ExternalLinkProps {
  slug: string;
  label: string;
  type: string;
  className?: string;
  showIcon?: boolean;
}

export default function ExternalLinkComponent({ 
  slug, 
  label, 
  type, 
  className = '', 
  showIcon = false 
}: ExternalLinkProps) {
  const links = getExternalLinks(slug);
  const link = links.find(l => l.type === type);
  
  if (!link) {
    return <span className={className}>{label}</span>;
  }

  const rel = link.sponsored 
    ? 'noopener noreferrer sponsored' 
    : 'noopener noreferrer';

  const ariaLabel = `Visit ${link.type} page for ${label}`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel={rel}
      className={`text-indigo-700 hover:underline ${className}`}
      aria-label={ariaLabel}
    >
      {label}
      {showIcon && <ExternalLinkIcon className="inline-block w-3 h-3 ml-0.5 -mb-0.5" />}
    </a>
  );
}