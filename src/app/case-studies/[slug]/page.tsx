import { getCaseStudyBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Base';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const study = getCaseStudyBySlug(resolvedParams.slug);
    if (!study) return { title: 'Not Found' };

    return {
        title: `${study.title} | Case Study`,
        description: study.subtitle,
    };
}

export default async function CaseStudyPage(props: PageProps) {
    const params = await props.params; // AWAIT HERE
    const study = getCaseStudyBySlug(params.slug);

    if (!study) {
        notFound();
    }

    return (
        <main className="pt-24 pb-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-navy-900 mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                </Link>

                {/* Header Block */}
                <div className="border-b border-gray-200 pb-16 mb-16">
                    <span className="text-navy-600 font-bold tracking-widest text-xs uppercase mb-6 block">
                        Case Study: {study.industry}
                    </span>
                    <h1 className="font-heading text-5xl lg:text-7xl font-bold text-navy-900 mb-8 leading-none">
                        {study.title}
                    </h1>
                    <p className="text-2xl text-gray-600 max-w-3xl font-light leading-relaxed mb-12">
                        {study.subtitle}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                        <div>
                            <span className="block text-gray-400 uppercase text-xs font-bold mb-1">Client</span>
                            <span className="font-semibold text-navy-900">{study.client || 'Confidential'}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 uppercase text-xs font-bold mb-1">Timeline</span>
                            <span className="font-semibold text-navy-900">{study.timeline || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 uppercase text-xs font-bold mb-1">Role</span>
                            <span className="font-semibold text-navy-900">{study.role || 'Lead Analyst'}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 uppercase text-xs font-bold mb-1">Tools</span>
                            <span className="font-semibold text-navy-900">{(study.tools || []).join(', ')}</span>
                        </div>
                    </div>
                </div>

                {/* Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    <div className="lg:col-span-8 space-y-16">
                        {/* Context */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">Context</h2>
                            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.context}
                            </div>
                        </section>

                        {/* Challenge */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">The Challenge</h2>
                            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.challenge}
                            </div>
                        </section>

                        {/* Approach */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">Strategic Approach</h2>
                            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.approach}
                            </div>
                        </section>

                        {/* Solution */}
                        <section>
                            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">The Solution</h2>
                            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {study.solution}
                            </div>
                        </section>

                        {/* Outcome */}
                        <section className="bg-navy-50 p-8 border-l-4 border-navy-900">
                            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">Impact & Outcome</h2>
                            <div className="text-lg text-navy-800 leading-relaxed whitespace-pre-line">
                                {study.outcome}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Metrics */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-navy-900 text-white p-8 sticky top-32">
                            <h3 className="font-bold text-lg mb-8 border-b border-navy-700 pb-4">Key Results</h3>
                            <div className="space-y-8">
                                {Object.entries(study.metrics || {}).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="block text-4xl lg:text-5xl font-light mb-1">{value}</span>
                                        <span className="text-xs uppercase tracking-wide text-navy-300">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {study.pdfUrl && (
                                <div className="mt-12 pt-8 border-t border-navy-700">
                                    <a href={study.pdfUrl} download>
                                        <Button fullWidth variant="secondary">Download PDF</Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
