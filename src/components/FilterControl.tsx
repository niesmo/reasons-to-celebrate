import React from 'react';
import { CelebrationDate } from '../utils/celebrationLogic';

interface FilterControlProps {
    selectedTypes: CelebrationDate['type'][];
    onChange: (types: CelebrationDate['type'][]) => void;
}

const AVAILABLE_TYPES: { type: CelebrationDate['type']; label: string }[] = [
    { type: 'repdigit', label: 'Repdigits' },
    { type: 'palindrome', label: 'Palindromes' },
    { type: 'sequential', label: 'Sequential' },
    { type: 'round', label: 'Round Numbers' },
];

export default function FilterControl({ selectedTypes, onChange }: FilterControlProps) {
    const toggleType = (type: CelebrationDate['type']) => {
        if (selectedTypes.includes(type)) {
            onChange(selectedTypes.filter((t) => t !== type));
        } else {
            onChange([...selectedTypes, type]);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {AVAILABLE_TYPES.map(({ type, label }) => {
                const isSelected = selectedTypes.includes(type);
                return (
                    <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
