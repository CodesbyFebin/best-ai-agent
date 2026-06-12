// BestAIAgent.in — Database barrel file
// Modules: db/products.ts | db/silos.ts | db/pages.ts

export { products, type Product } from './db/products';
export { silos, type Silo, type FAQItem, type SiloPage } from './db/silos';
export {
  siloPages,
  generatedSiloPages,
  getPageBySlug,
  getRelatedPages,
  sitemapNodes,
} from './db/pages';
