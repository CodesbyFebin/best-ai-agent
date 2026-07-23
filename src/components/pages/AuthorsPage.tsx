import React from 'react';
import { authorsList } from '../EditorialPages';
import { User, ShieldCheck, Linkedin, Twitter, Github, Award } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export default function AuthorsPage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> E-E-A-T Verified Editorial Board
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Meet Our AI Evaluation & Benchmark Team
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Our evaluations are conducted by experienced AI architects, systems engineers, security auditors, and technical researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorsList.map(author => (
            <div key={author.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500" />
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                      {author.name}
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <div className="text-xs text-indigo-400 font-medium">{author.role}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{author.bio}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{author.articlesCount}+ Guides & Reviews</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    {author.credentials[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
