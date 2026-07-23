import { SITE_CONFIG } from '../config';

export interface MetaTagsInput {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noindex?: boolean;
}

export function generateMetaTags(input: MetaTagsInput) {
  const fullCanonical = input.canonicalUrl.startsWith('http')
    ? input.canonicalUrl
    : `${SITE_CONFIG.domain}${input.canonicalUrl.startsWith('/') ? '' : '/'}${input.canonicalUrl}`;

  return {
    title: `${input.title} | ${SITE_CONFIG.name}`,
    description: input.description,
    canonical: fullCanonical,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      title: input.title,
      description: input.description,
      url: fullCanonical,
      type: input.ogType || 'website',
      siteName: SITE_CONFIG.name,
      image: input.ogImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      title: input.title,
      description: input.description,
      image: input.ogImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    },
  };
}
