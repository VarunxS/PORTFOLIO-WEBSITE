'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea } from '@/components/ui/Base';
import { FileUpload } from '@/components/admin/FileUpload';
import { CaseStudy } from '@/lib/data';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

interface CaseStudyFormProps {
    initialData?: CaseStudy;
}

export const CaseStudyForm = ({ initialData }: CaseStudyFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<Partial<CaseStudy>>(initialData || {
        title: '',
        slug: '',
        subtitle: '',
        client: '',
        industry: '',
        role: '',
        timeline: '',
        context: '',
        challenge: '',
        approach: '',
        solution: '',
        outcome: '',
        coverImage: '',
        thumbnail: '',
        pdfUrl: '',
        tools: [],
        metrics: {},
        status: 'published',
        featured: false
    });

    const [toolInput, setToolInput] = useState('');
    const [metricKey, setMetricKey] = useState('');
    const [metricValue, setMetricValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleAddTool = () => {
        if (toolInput.trim()) {
            setFormData(prev => ({
                ...prev,
                tools: [...(prev.tools || []), toolInput.trim()]
            }));
            setToolInput('');
        }
    };

    const handleRemoveTool = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tools: (prev.tools || []).filter((_, i) => i !== index)
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
                ? `/api/case-studies/${initialData.id}`
                : `/api/case-studies`;

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to save case study');
            }

            router.push('/admin/case-studies');
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

            {/* Header Info */}
            <h3 className="text-lg font-bold text-navy-900 border-b pb-2">Core Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Slug (Auto-generated)"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="case-study-slug"
                />
            </div>

            <Textarea
                label="Subtitle / Short Abstract"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                rows={2}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Client"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="My Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                />
                <Input
                    label="Timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                />
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
                <div className="flex items-center pt-8">
                    <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData(p => ({ ...p, featured: e.target.checked }))}
                        className="mr-2 h-4 w-4"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as Featured (Hero)</label>
                </div>
            </div>

            {/* Content Sections */}
            <h3 className="text-lg font-bold text-navy-900 border-b pb-2 pt-4">Narrative</h3>
            <RichTextEditor
                label="Context"
                value={formData.context || ''}
                onChange={(val) => setFormData(prev => ({ ...prev, context: val }))}
            />
            <RichTextEditor
                label="Challenge"
                value={formData.challenge || ''}
                onChange={(val) => setFormData(prev => ({ ...prev, challenge: val }))}
            />
            <RichTextEditor
                label="Approach"
                value={formData.approach || ''}
                onChange={(val) => setFormData(prev => ({ ...prev, approach: val }))}
            />
            <RichTextEditor
                label="Solution"
                value={formData.solution || ''}
                onChange={(val) => setFormData(prev => ({ ...prev, solution: val }))}
            />
            <RichTextEditor
                label="Outcome"
                value={formData.outcome || ''}
                onChange={(val) => setFormData(prev => ({ ...prev, outcome: val }))}
            />

            {/* Media */}
            <h3 className="text-lg font-bold text-navy-900 border-b pb-2 pt-4">Media & Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                    label="Cover Image"
                    currentFile={formData.coverImage}
                    onUpload={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                />
                <FileUpload
                    label="Thumbnail (Optional)"
                    currentFile={formData.thumbnail}
                    onUpload={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                />
            </div>
            <FileUpload
                label="PDF Download (Optional)"
                accept="application/pdf"
                maxSizeMB={10}
                currentFile={formData.pdfUrl}
                onUpload={(url) => setFormData(prev => ({ ...prev, pdfUrl: url }))}
            />

            {/* Tools & Metrics */}
            <h3 className="text-lg font-bold text-navy-900 border-b pb-2 pt-4">Details</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tools & Technologies</label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={toolInput}
                        onChange={(e) => setToolInput(e.target.value)}
                        placeholder="Python, Tableau..."
                        className="flex-grow mb-0"
                        fullWidth={false}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTool(); } }}
                    />
                    <Button type="button" onClick={handleAddTool} variant="secondary">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.tools?.map((tool, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                            {tool}
                            <button type="button" onClick={() => handleRemoveTool(idx)} className="ml-2 text-gray-400 hover:text-red-500">
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Impact Metrics</label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={metricKey}
                        onChange={(e) => setMetricKey(e.target.value)}
                        placeholder="Name (e.g. Cost Reduction)"
                        className="flex-grow mb-0"
                        fullWidth={false}
                    />
                    <Input
                        value={metricValue}
                        onChange={(e) => setMetricValue(e.target.value)}
                        placeholder="Value (e.g. 25%)"
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

            <div className="pt-8 flex justify-end gap-4">
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
                    {initialData ? 'Update Case Study' : 'Create Case Study'}
                </Button>
            </div>
        </form>
    );
};
