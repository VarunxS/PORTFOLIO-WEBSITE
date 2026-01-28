import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProjectBySlug, getProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FadeIn } from '@/components/animations/Animations';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Base';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = getProjects({ status: 'published' });
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const project = getProjectBySlug(params.slug);

    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | Varun Singla`,
        description: project.description,
    };
}

export default async function ProjectPage(props: PageProps) {
    const params = await props.params;
    const project = getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    const allProjects = getProjects();
    const relatedProjects = allProjects
        .filter(p => p.id !== project.id && p.category === project.category)
        .slice(0, 2);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-24 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link href="/work" className="text-gray-500 hover:text-navy-900 flex items-center text-sm font-medium transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Work
                        </Link>
                    </div>

                    <FadeIn>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
                            {/* Header Info */}
                            <div>
                                <span className="text-navy-600 font-bold tracking-widest text-xs uppercase mb-4 block">
                                    {project.category}
                                </span>
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy-900 font-bold leading-tight mb-8">
                                    {project.title}
                                </h1>

                                <p className="text-xl text-gray-700 leading-relaxed font-body mb-8">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-10">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-sm text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div className="relative aspect-video lg:aspect-square bg-gray-100 rounded-none overflow-hidden self-start">
                                {project.imageUrl && (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                )}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Metrics Section */}
                    {Object.keys(project.metrics).length > 0 && (
                        <div className="bg-navy-900 text-white py-16 -mx-6 px-6 lg:-mx-12 lg:px-12 mb-20">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {Object.entries(project.metrics).map(([key, value]) => (
                                    <div key={key} className="border-l border-navy-700 pl-6">
                                        <div className="text-4xl lg:text-5xl font-light mb-2">{value}</div>
                                        <div className="text-navy-200 text-xs uppercase tracking-wider">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Deep Dive Content */}
                    <div className="max-w-3xl mx-auto mb-24">
                        <h2 className="font-heading text-3xl font-bold text-navy-900 mb-8 border-b border-gray-200 pb-4">
                            Project Detail
                        </h2>
                        <div className="prose prose-lg prose-slate max-w-none">
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                {project.longDescription || "No detailed description available."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <div className="bg-cream-50 py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="font-heading text-3xl text-navy-900 mb-10">Similar Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedProjects.map(p => (
                                <Link key={p.id} href={`/work/${p.slug}`} className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all">
                                    <h3 className="font-heading text-xl text-navy-900 mb-2 group-hover:text-gold-600 truncate">
                                        {p.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        View Project <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom CTA */}
            <div className="bg-navy-900 py-16 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="font-heading text-3xl text-white mb-6">Interested in this work?</h2>
                    <Link href="/contact">
                        <Button variant="secondary">Discuss Partnership</Button>
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
