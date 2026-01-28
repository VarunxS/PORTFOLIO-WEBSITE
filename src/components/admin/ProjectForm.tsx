'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea } from '@/components/ui/Base';
import { FileUpload } from '@/components/admin/FileUpload';
import { Project } from '@/lib/data';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Loader2 } from 'lucide-react';

interface ProjectFormProps {
    initialData?: Project;
}

export const ProjectForm = ({ initialData }: ProjectFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<Partial<Project>>(initialData || {
        title: '',
        slug: '',
        description: '',
        longDescription: '',
        category: '',
        imageUrl: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        status: 'published',
        metrics: {}
    });

    const [tagInput, setTagInput] = useState('');
    const [metricKey, setMetricKey] = useState('');
    const [metricValue, setMetricValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tags: (prev.tags || []).filter((_, i) => i !== index)
        }));
    };

    const handleAddMetric = () => {
        if (metricKey.trim() && metricValue.trim()) {
            setFormData(prev => ({
                ...prev,
                metrics: {
                    ...prev.metrics,
                    [metricKey.trim()]: metricValue.trim()
                }
            }));
            setMetricKey('');
            setMetricValue('');
        }
    };

    const handleRemoveMetric = (key: string) => {
        const newMetrics = { ...formData.metrics };
        delete newMetrics[key];
        setFormData(prev => ({ ...prev, metrics: newMetrics }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = initialData
                ? `/api/projects/${initialData.id}`
                : `/api/projects`;

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to save project');
            }

            router.push('/admin/projects');
            router.refresh();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-sm">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Slug (Auto-generated if empty)"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="my-project-slug"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="AI, Automation, Product..."
                />
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date?.toString().split('T')[0]}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gold-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gold-500 bg-white"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>

            <FileUpload
                label="Project Cover Image"
                currentFile={formData.imageUrl}
                onUpload={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
            />

            <Textarea
                label="Short Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
            />

            <RichTextEditor
                label="Long Description / Case Study Content"
                value={formData.longDescription || ''}
                onChange={(val) => setFormData(prev => ({ ...prev, longDescription: val }))}
            />

            {/* Tags Management */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag..."
                        className="flex-grow mb-0"
                        fullWidth={false}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    />
                    <Button type="button" onClick={handleAddTag} variant="secondary">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(idx)} className="ml-2 text-gray-400 hover:text-red-500">
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Metrics Management */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Metrics</label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={metricKey}
                        onChange={(e) => setMetricKey(e.target.value)}
                        placeholder="Metric Name (e.g. ROI)"
                        className="flex-grow mb-0"
                        fullWidth={false}
                    />
                    <Input
                        value={metricValue}
                        onChange={(e) => setMetricValue(e.target.value)}
                        placeholder="Value (e.g. 150%)"
                        className="flex-grow mb-0"
                        fullWidth={false}
                    />
                    <Button type="button" onClick={handleAddMetric} variant="secondary">Add</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(formData.metrics || {}).map(([key, value]) => (
                        <div key={key} className="bg-navy-50 border border-navy-100 p-3 rounded flex justify-between items-center text-sm">
                            <div>
                                <span className="font-bold text-navy-900 block">{value}</span>
                                <span className="text-gray-500 text-xs">{key}</span>
                            </div>
                            <button type="button" onClick={() => handleRemoveMetric(key)} className="text-gray-400 hover:text-red-500">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    loading={loading}
                >
                    {initialData ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
};
