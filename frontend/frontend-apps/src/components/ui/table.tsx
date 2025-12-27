import React from 'react';

export function Table({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-lg border overflow-hidden bg-[var(--deep-charcoal)] border-[rgba(148,163,184,0.2)] ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full" style={{ tableLayout: 'fixed', width: '100%' }}>
                    {children}
                </table>
            </div>
        </div>
    );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
    return (
        <thead>
            <tr className="border-b border-[rgba(148,163,184,0.1)]">
                {children}
            </tr>
        </thead>
    );
}

export function TableHeaderCell({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <th className={`px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--cool-gray)] ${className}`} style={style}>
            {children}
        </th>
    );
}

export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
}

export function TableRow({
    children,
    className = '',
    onClick
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    return (
        <tr
            className={`hover:bg-[rgba(148,163,184,0.05)] transition-colors cursor-pointer border-b border-[rgba(148,163,184,0.1)] last:border-b-0 ${className}`}
            onClick={onClick}
        >
            {children}
        </tr>
    );
}

export function TableCell({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <td className={`px-4 py-3.5 align-middle ${className}`} style={style}>
            {children}
        </td>
    );
}

