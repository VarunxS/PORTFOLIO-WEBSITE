'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea } from '@/components/ui/Base';
import { LeadershipPosition } from '@/lib/data';

interface LeadershipFormProps {
    initialData?: LeadershipPosition;
}

export const LeadershipForm = ({ initialData }: LeadershipFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<Partial<LeadershipPosition>>(initialData || {
        id: '', // Will be generated if empty
        title: '',
        organization: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        type: 'Leadership',
        achievements: []
    });

    const [achievementInput, setAchievementInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleAddAchievement = () => {
        if (achievementInput.trim()) {
            setFormData(prev => ({
                ...prev,
                achievements: [...(prev.achievements || []), { text: achievementInput.trim() }]
            }));
            setAchievementInput('');
        }
    };

    const handleRemoveAchievement = (index: number) => {
        setFormData(prev => ({
            ...prev,
            achievements: (prev.achievements || []).filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = initialData
                ? `/api/leadership/${initialData.id}`
                : `/api/leadership`;

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { content: 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to save position');
            }

            router.push('/admin/leadership');
            router.refresh();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-none border border-gray-200">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 font-mono text-sm">
                    Error: {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Role Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        disabled={formData.current}
                        value={formData.endDate || ''}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 w-full disabled:bg-gray-100 disabled:text-gray-400"
                    />
                </div>
                <div className="flex items-center mb-6 pl-2">
                    <input
                        type="checkbox"
                        name="current"
                        id="current"
                        checked={formData.current}
                        onChange={(e) => setFormData(p => ({ ...p, current: e.target.checked, endDate: e.target.checked ? '' : p.endDate }))}
                        className="w-4 h-4 mr-2 accent-navy-900"
                    />
                    <label htmlFor="current" className="text-sm font-medium text-navy-900">Current Role</label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-navy-900"
                    >
                        <option value="Leadership">Leadership</option>
                        <option value="Professional">Professional</option>
                        <option value="Academic">Academic</option>
                        <option value="Volunteering">Volunteering</option>
                    </select>
                </div>
            </div>

            <Textarea
                label="Description (Short)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
            />

            {/* Achievements */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements (Bullet Points)</label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={achievementInput}
                        onChange={(e) => setAchievementInput(e.target.value)}
                        placeholder="Lead team of 10..."
                        className="flex-grow mb-0"
                        fullWidth={false}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAchievement(); } }}
                    />
                    <Button type="button" onClick={handleAddAchievement} variant="secondary">Add</Button>
                </div>
                <ul className="space-y-2 mt-4 ml-4 list-disc">
                    {formData.achievements?.map((ach, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-1 group flex justify-between items-center bg-gray-50 p-2">
                            <span>{ach.text}</span>
                            <button type="button" onClick={() => handleRemoveAchievement(idx)} className="text-red-500 hover:text-red-700 font-bold px-2">
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-8 flex justify-end gap-4 border-t border-gray-100">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    loading={loading}
                >
                    {initialData ? 'Update Position' : 'Create Position'}
                </Button>
            </div>
        </form>
    );
};
