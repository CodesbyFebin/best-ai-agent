import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Download,
  FileText,
  Mail,
  Search,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type { TrustPageContent } from '../data/trustContent';

type TrustPageProps = {
  page: TrustPageContent;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, path: string, view?: string) => void;
};

export default function TrustPage({ page, onNavigate }: TrustPageProps) {
  const [criteriaQuery, setCriteriaQuery] = useState('');
  const filteredCriteria = useMemo(() => {
    if (!page.criteria) return [];
    const query = criteriaQuery.trim().toLowerCase();
    if (!query) return page.criteria;
    return page.criteria.filter((row) =>
      `${row.criterion} ${row.whatWeCheck} ${row.evidence} ${row.indiaSignal}`.toLowerCase().includes(query)
    );
  }, [criteriaQuery, page.criteria]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string, view?: string) => {
    if (view) {
      event.preventDefault();
      onNavigate(event, path, view);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4">
          <a href="/" onClick={(event) => onNavigate(event, '/', 'home')} className="hover:underline">Home</a>
          <ChevronRight className="w-3 h-3" />
          <span>{page.view === 'authority' ? 'Authority Assets' : page.view === 'methodology' ? 'Methodology' : 'Trust'}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-semibold">{page.title}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-black uppercase tracking-wider">{page.eyebrow}</span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">{page.verificationStatus}</span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">Confidence {page.confidenceLevel}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">{page.h1}</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-3xl leading-relaxed">{page.metaDescription}</p>
        <div className="grid sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Author</span>
            <span className="font-semibold text-slate-900">{page.author}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Fact checker</span>
            <span className="font-semibold text-slate-900">{page.factChecker}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Updated</span>
            <span className="font-semibold text-slate-900">{page.updated}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Status</span>
            <span className="font-semibold text-slate-900">{page.verificationStatus}</span>
          </div>
        </div>
      </div>

      {page.downloadablePdf && (
        <a href={page.downloadablePdf} className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider">
          <Download className="w-4 h-4" /> Download methodology PDF
        </a>
      )}

      {page.facts && page.facts.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 mb-4">Key facts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {page.facts.map((fact) => (
              <div key={fact.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">{fact.label}</span>
                <span className="block mt-1 text-sm font-semibold text-slate-900 leading-snug">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {page.criteria && page.criteria.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-950">Interactive methodology table</h2>
              <p className="text-xs text-slate-500 mt-1">Filter the scoring criteria by capability, evidence, or India signal.</p>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={criteriaQuery}
                onChange={(event) => setCriteriaQuery(event.target.value)}
                placeholder="Search criteria..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-3 font-black">Criterion</th>
                  <th className="p-3 font-black">Weight</th>
                  <th className="p-3 font-black">What we check</th>
                  <th className="p-3 font-black">Evidence</th>
                  <th className="p-3 font-black">India signal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCriteria.map((row) => (
                  <tr key={row.criterion} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">{row.criterion}</td>
                    <td className="p-3 font-black text-emerald-700">{row.weight}</td>
                    <td className="p-3 text-slate-600">{row.whatWeCheck}</td>
                    <td className="p-3 text-slate-600">{row.evidence}</td>
                    <td className="p-3 text-slate-600">{row.indiaSignal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCriteria.length === 0 && <p className="text-sm text-slate-500 p-4">No criteria matched your filter.</p>}
        </div>
      )}

      {page.tables?.map((table) => (
        <div key={table.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 mb-4">{table.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <tr>{table.columns.map((column) => <th key={column} className="p-3 font-black">{column}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">{row.map((cell, cellIndex) => <td key={cellIndex} className="p-3 text-slate-600">{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {page.sections.map((section) => (
        <section key={section.heading} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-950">{section.heading}</h2>
          {section.body.map((paragraph) => <p key={paragraph} className="text-sm sm:text-base text-slate-600 leading-relaxed">{paragraph}</p>)}
        </section>
      ))}

      <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold">Report inaccurate information</h2>
            <p className="text-sm text-slate-300 mt-1">If you find outdated pricing, unsupported claims, broken sources, or compliance errors, send the page URL and evidence to editorial@bestaiagent.in.</p>
          </div>
        </div>
        <a href="mailto:editorial@bestaiagent.in?subject=Correction%20Request%20for%20BestAIAgent.in" className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider">
          <Mail className="w-4 h-4" /> Email correction request
        </a>
      </div>

      {page.faqs && page.faqs.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="border border-slate-100 rounded-xl p-4">
                <h3 className="text-sm font-bold text-slate-950">{faq.question}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {page.related && page.related.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-950 mb-4">Related trust and authority pages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {page.related.map((link) => (
              <a key={link.path} href={link.path} onClick={(event) => navigate(event, link.path, link.view)} className="flex items-center justify-between gap-3 border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:bg-emerald-50 transition">
                <span className="text-sm font-bold text-slate-900">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex flex-wrap items-center gap-3">
        <Calendar className="w-4 h-4 text-slate-400" /> Reviewed {page.updated}
        <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verification: {page.verificationStatus}
        <UserCheck className="w-4 h-4 text-indigo-600" /> Fact checked by {page.factChecker}
        <FileText className="w-4 h-4 text-slate-400" /> Confidence: {page.confidenceLevel}
        <CheckCircle className="w-4 h-4 text-emerald-600" /> Affiliate status disclosed where relevant
      </div>
    </div>
  );
}
