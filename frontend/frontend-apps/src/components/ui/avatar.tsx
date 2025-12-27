import React from 'react';

interface AvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-lg',
};

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
    return (
        <div
            className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold flex-shrink-0 bg-[var(--cyber-teal)] text-[var(--obsidian-black)] ${className}`}
        >
            {getInitials(name)}
        </div>
    );
}

