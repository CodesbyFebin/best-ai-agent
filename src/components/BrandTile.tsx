import React, { useState } from 'react';

interface BrandTileProps {
    name: string;
    slug?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    imageSrc?: string;
    alt?: string;
    className?: string;
}

export default function BrandTile({ name, size = 'md', imageSrc, alt, className = '' }: BrandTileProps) {
    const [imgError, setImgError] = useState(false);

    const sizeMap = {
        sm: 'w-8 h-8 text-[10px]',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-24 h-24 text-2xl'
    };
    const dimensions = {
        sm: 32,
        md: 48,
        lg: 64,
        xl: 96
    };
    const label = alt || `${name} brand tile on BestAIAgent.in`;

    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    if (imageSrc && !imgError) {
        return (
            <div className={`${sizeMap[size]} shrink-0 flex items-center justify-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm ${className}`}>
                <img
                    src={imageSrc}
                    alt={label}
                    width={dimensions[size]}
                    height={dimensions[size]}
                    loading={size === 'xl' ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-contain p-1.5"
                    onError={() => setImgError(true)}
                />
            </div>
        );
    }

    return (
        <div
            className={`${sizeMap[size]} shrink-0 flex items-center justify-center font-black tracking-tighter bg-gradient-to-tr from-slate-800 to-slate-600 text-white border border-slate-700 rounded-xl shadow-inner ${className}`}
            role="img"
            aria-label={label}
        >
            {initials}
        </div>
    );
}
