import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export function Input({ icon, className = '', ...props }: InputProps) {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {icon}
                </div>
            )}
            <input
                className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--cyber-teal)] focus:ring-opacity-50 ${icon ? 'pl-10' : ''
                    } bg-[var(--deep-charcoal)] border-[rgba(148,163,184,0.2)] text-[var(--ice-white)] placeholder:text-[var(--cool-gray)] text-sm ${className}`}
                {...props}
            />
        </div>
    );
}

