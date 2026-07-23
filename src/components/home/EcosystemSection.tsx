import React from 'react';
import { Network, ExternalLink, ShieldAlert, Globe } from 'lucide-react';
import { siteConfig } from '../../data/site';

export const EcosystemSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Open Network Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore the AI Agent Ecosystem
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Sister platforms and specialized directories under common ownership providing dedicated tools and developer resources.
          </p>
        </div>

        {/* Network Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {siteConfig.ecosystemNetwork.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 shadow-lg transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition flex items-center gap-1">
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                  </span>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.purpose}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-medium">
                {item.disclosure}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
