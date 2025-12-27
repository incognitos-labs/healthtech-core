import React from 'react';

interface StatusBadgeProps {
    status: 'new' | 'active' | 'non-active';
}

const statusConfig = {
    new: {
        dot: 'var(--signal-purple)',
        text: 'New patient',
    },
    active: {
        dot: 'var(--cyber-teal)',
        text: 'Active',
    },
    'non-active': {
        dot: '#ef4444',
        text: 'Non-active',
    },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <div className="flex items-center gap-2">
            <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: config.dot }}
            />
            <span className="text-sm text-[var(--ice-white)]">
                {config.text}
            </span>
        </div>
    );
}

