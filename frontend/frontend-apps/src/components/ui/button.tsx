import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

    const variants = {
        primary: 'bg-[var(--cyber-teal)] text-[var(--obsidian-black)] hover:opacity-90',
        secondary: 'bg-[var(--deep-charcoal)] border border-[rgba(148,163,184,0.2)] text-[var(--ice-white)] hover:opacity-80',
        ghost: 'text-[var(--ice-white)] hover:bg-[rgba(148,163,184,0.1)]',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

