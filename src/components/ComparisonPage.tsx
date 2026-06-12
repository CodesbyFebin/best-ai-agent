import { useMemo } from 'react';
import { ChevronRight, Calendar, Sliders, ArrowLeftRight } from 'lucide-react';
import { comparisonPages, getComparisonBySlug, getRelatedComparisons } from '../data/comparisons';
import { getToolAsset } from '../data/assetRegistry';
import BrandTile from './BrandTile';

interface ComparisonPageProps {
  slug: string;
  routeTo: (view: string, siloId?: string, articleSlug?: string, productSlug?: string) => void;
}

export default function ComparisonPage({ slug, routeTo }: ComparisonPageProps) {
  const comp = useMemo(() => getComparisonBySlug(slug), [slug]);
  const related = useMemo(() => (comp ? getRelatedComparisons(comp.slug) : []), [comp]);

  if (!comp) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <ArrowLeftRight className="w-12 h-12 text-slate-400 mx-auto" strokeWidth={1.5} />
        <p className="text-slate-500 mt-4 font-semibold">Comparison not found.</p>
        <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase">Back to homepage</button>
      </div>
    );
  }

  const leftAsset = getToolAsset(comp.toolA.slug);
  const rightAsset = getToolAsset(comp.toolB.slug);
  const comparisonImage = `/assets/comparisons/${comp.slug}.png`;

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded border border-slate-200/60 uppercase tracking-widest">Comparison</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">AEO Structured</span>
          </div>

          <div className="comparison-hero-logos flex items-center gap-4 py-2">
            <BrandTile name={comp.toolA.name} imageSrc={leftAsset.logo} alt={leftAsset.logoAlt} size="lg" />
            <span aria-hidden="true" className="text-[10px] font-black uppercase tracking-widest text-slate-400">vs</span>
            <BrandTile name={comp.toolB.name} imageSrc={rightAsset.logo} alt={rightAsset.logoAlt} size="lg" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">{comp.h1}</h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-[10px]">
                {comp.author.split(',')[0].trim().slice(0, 2)}
              </div>
              <span className="font-semibold text-slate-800">{comp.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published: {comp.publishedAt}</span>
            </div>
          </div>
          <div className="bg-emerald-50/50 border-l-4 border-emerald-500 p-5 rounded-r-xl space-y-2 mt-4">
            <p className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-widest">Quick Answer</p>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed italic">{comp.directAnswer}</p>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
            <img
              src={comparisonImage}
              alt={`${comp.toolA.name} vs ${comp.toolB.name} comparison preview card on BestAIAgent.in`}
              width={1200}
              height={630}
              loading="eager"
              decoding="async"
              className="w-full h-auto"
            />
            <figcaption className="px-4 py-3 text-[10px] text-slate-300 bg-slate-950">
              Generated editorial comparison graphic. Brand logos belong to their respective owners.
            </figcaption>
          </figure>

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            {[
              { tool: comp.toolA, asset: leftAsset },
              { tool: comp.toolB, asset: rightAsset },
            ].map(({ tool, asset }, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center gap-3">
                  <BrandTile name={tool.name} imageSrc={asset.logo} alt={asset.logoAlt} size="sm" />
                  <h3 className="text-base font-bold text-slate-900">{tool.name}</h3>
                </div>
                <p className="text-xs text-slate-500">{tool.tagline}</p>
                <button onClick={() => routeTo('product', undefined, undefined, tool.slug)} className="text-xs font-bold text-emerald-700 hover:underline">Read full review →</button>
              </div>
            ))}
          </div>

          <section className="grid md:grid-cols-2 gap-6 pt-2" aria-label={`${comp.toolA.name} and ${comp.toolB.name} workspace previews`}>
            {[
              { tool: comp.toolA, asset: leftAsset },
              { tool: comp.toolB, asset: rightAsset },
            ].map(({ tool, asset }) => (
              <figure key={tool.slug} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={asset.screenshot || '/assets/screenshots/placeholder-workflow.png'}
                  alt={asset.screenshotAlt || `${tool.name} illustrative workspace preview`}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
                <figcaption className="px-4 py-3 text-[10px] text-slate-500">
                  Illustrative workflow preview, not an official product screenshot.
                </figcaption>
              </figure>
            ))}
          </section>

          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" /> Side-by-Side Comparison
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-800 uppercase font-mono text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Criteria</th>
                    <th className="p-3 text-center"><div className="flex flex-col items-center gap-2"><BrandTile name={comp.toolA.name} imageSrc={leftAsset.logo} alt={leftAsset.logoAlt} size="sm" /> {comp.toolA.name}</div></th>
                    <th className="p-3 text-center"><div className="flex flex-col items-center gap-2"><BrandTile name={comp.toolB.name} imageSrc={rightAsset.logo} alt={rightAsset.logoAlt} size="sm" /> {comp.toolB.name}</div></th>
                    <th className="p-3 text-center">Winner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comp.fields.map((f, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-950">{f.label}</td>
                      <td className="p-3 text-center text-slate-700">{f.toolA}</td>
                      <td className="p-3 text-center text-slate-700">{f.toolB}</td>
                      <td className="p-3 text-center">
                        <span className={`font-black ${f.winner === 'A' ? 'text-emerald-700' : f.winner === 'B' ? 'text-indigo-700' : 'text-slate-500'}`}>
                          {f.winner === 'tie' ? 'Tie' : f.winner === 'A' ? comp.toolA.name : comp.toolB.name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Editorial Verdict:</span>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">{comp.verdict}</p>
          </div>

          {related.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest">Related Comparisons</h4>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map(r => (
                  <button key={r.slug} onClick={() => routeTo('article', undefined, r.slug)} className="text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition">
                    <p className="text-xs font-bold text-slate-900">{r.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{r.primaryKeyword}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="font-extrabold text-sm text-center tracking-wide uppercase text-slate-200">{comp.toolA.name} Profile</h4>
          <button onClick={() => routeTo('product', undefined, undefined, comp.toolA.slug)} className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wide transition text-center">View Review</button>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="font-extrabold text-sm text-center tracking-wide uppercase text-slate-200">{comp.toolB.name} Profile</h4>
          <button onClick={() => routeTo('product', undefined, undefined, comp.toolB.slug)} className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg text-xs uppercase tracking-wide transition text-center">View Review</button>
        </div>
      </div>
    </div>
  );
}
