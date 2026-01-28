'use client';

import { Textarea } from '@/components/ui/Base';

// For now, using a simple Textarea that supports Markdown input
// In a real full production app, we might use TipTap or Slate or simplemde-react,
// but to keep dependencies low and "zero config", a good Markdown editor is actually just a textarea with some helper text.
// The prompt asked for "RichTextEditor (basic) - keep it simple".

interface RichTextEditorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const RichTextEditor = ({ label, value, onChange, error }: RichTextEditorProps) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <span className="text-xs text-gray-400">Markdown supported</span>
            </div>
            <textarea
                className="w-full min-h-[200px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all font-mono text-sm"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <p className="text-sm text-error">{error}</p>}
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                Tip: Use **bold**, *italics*, - list, # headings
            </div>
        </div>
    );
};
