# Schema Audit Report

**Generated:** 2026-06-12  
**Auditor:** BestAIAgent.in Schema Analysis

## Executive Summary

Comprehensive JSON-LD schema implementation across Organization, WebSite, SoftwareApplication, Review, BreadcrumbList, FAQPage, Article, HowTo, and DefinedTerm types. Schema is dynamically injected and context-aware.

## Schema Strengths

### 1. Dynamic Schema Injection
- Script ID: `seo-jsonld-dynamic` - single schema replacement
- View-based schema selection in `App.tsx` (lines 693-981)
- No render-blocking - injected after load

### 2. Organization Schema
```json
{
  "@type": "Organization",
  "name": "BestAIAgent.in",
  "address": { "@type": "PostalAddress", "addressLocality": "Mumbai" },
  "sameAs": []  // Ready for social links
}
```

### 3. WebSite Schema with SearchAction
- SearchAction configured for `/search?q={search_term_string}`
- InLanguage: en-IN (India-specific)

### 4. SoftwareApplication Schema
Per-product implementation includes:
- AggregateRating (ratingValue, bestRating, worstRating, ratingCount)
- Offers with UnitPriceSpecification
- FeatureList array
- ApplicationCategory differentiation (DeveloperApplication vs BusinessApplication)

### 5. Review Schema
- Author attribution (Person type)
- ReviewRating with scale
- PositiveNotes/NegativeNotes as ItemList
- DatePublished/DateModified

### 6. BreadcrumbList Schema
- Dynamic position assignment
- View-based breadcrumb paths
- Proper item URL construction

### 7. FAQPage Schema
- Up to 10 questions per page (line 608)
- Question/Answer structure with acceptedAnswer

### 8. HowTo Schema (for tutorials)
- 4-step standard structure
- India-specific testing guidance step

### 9. CollectionPage & ItemList
- Home page uses CollectionPage
- ItemList with position and URL
- Used for hub and authority pages

## Schema Issues & Recommendations

### Critical Issues

**1. Missing Product Schema for Comparisons**
- Comparison pages lack dedicated schema
- Missing aggregate comparison structure

### 2. Missing VideoObject Schema
- No video tutorials with schema
- Missing HowToVideo extensions

### 3. Missing Speakable Schema
- No speakable markup for voice search
- Missing @type: SpeakableSpecification

### Medium Priority Issues

**4. Schema Validation Gaps**
- Need to validate with Google Rich Results Test
- Missing error handling for malformed schema
- No schema version pinning

**5. AggregateRating Accuracy**
- ratingCount fixed at "189" - appears placeholder
- Should reflect actual evaluation count

## Schema Coverage Matrix

| Schema Type | Status | Pages Covered | Notes |
|-------------|--------|---------------|-------|
| Organization | ✅ | All | Complete |
| WebSite | ✅ | All | SearchAction included |
| BreadcrumbList | ✅ | All | Dynamic breadcrumbs |
| SoftwareApplication | ✅ | 5 products | Per-tool |
| Review | ✅ | 5 products | Full review schema |
| FAQPage | ✅ | All with FAQs | Up to 10 Qs |
| Article | ✅ | All content | With dateModified |
| HowTo | ⚠️ | Tutorials | Add video support |
| DefinedTerm | ⚠️ | Glossary | Need expansion |
| CollectionPage | ✅ | Home | With ItemList |
| ItemList | ✅ | All hubs | Position tracking |
| WebPage | ✅ | All views | isPartOf linking |

## Recommendations

### Immediate Actions
1. Add schema validation to build process
2. Implement Rich Results Test automation
3. Add speakable schema for voice optimization

### Enhancement Opportunities
1. Expand DefinedTerm schema for glossary
2. Add VideoObject schema for tutorial videos
3. Implement ProductGroup schema for comparisons
4. Add Course schema for educational content

## Schema Score: 8.9/10

**Strengths:** Comprehensive types, dynamic injection, EEAT signals  
**Weaknesses:** Comparison schema, video schema missing  
**Opportunity:** Validate and expand to 20+ schema types