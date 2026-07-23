import React from 'react';
import { 
  Code, 
  Workflow, 
  Headphones, 
  Search, 
  TrendingUp, 
  Mic, 
  Github, 
  Cpu, 
  Network, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { popularCategories, Category } from '../../data/categories';

interface CategoryGridProps {
  onSelectCategory: (categoryName: string, path?: string) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code: Code,
  Workflow: Workflow,
  Headphones: Headphones,
  Search: Search,
  TrendingUp: TrendingUp,
  Mic: Mic,
  Github: Github,
  Cpu: Cpu,
  Network: Network,
  Sparkles: Sparkles
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">
              Curated Directories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore AI Agents by Category
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Browse agents by task, workflow, deployment model, and technology stack.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('AI Agent Reviews')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition cursor-pointer self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {popularCategories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Code;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name, cat.urlPath)}
                className="group cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-violet-500/50 p-5 transition-all duration-200 hover:-translate-y-1 shadow-lg flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">{cat.toolCount.toLocaleString()} Agents</span>
                  <span className="text-slate-500 truncate max-w-[100px]" title={`Top: ${cat.topAgent}`}>
                    Top: <span className="text-slate-300 font-medium">{cat.topAgent}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
