import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className={`w-4 h-4 rounded cursor-pointer accent-[var(--cyber-teal)] ${className}`}
                {...props}
            />
            {label && <span className="text-sm text-[var(--ice-white)]">{label}</span>}
        </label>
    );
}

