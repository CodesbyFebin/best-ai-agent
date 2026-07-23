import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, className = '', id }: CardProps) {
  return (
    <div id={id} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}

export interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning';
  className?: string;
}

export function Badge({ text, variant = 'primary', className = '' }: BadgeProps) {
  const styles = {
    primary: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    outline: 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}>
      {text}
    </span>
  );
}
