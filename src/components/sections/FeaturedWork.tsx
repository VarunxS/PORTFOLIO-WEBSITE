'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/Animations';
import { Project } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

interface FeaturedWorkProps {
    projects: Project[];
}

export const FeaturedWork = ({ projects }: FeaturedWorkProps) => {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="font-heading text-3xl font-semibold text-navy-900 mb-2">
                            Selected Engagements
                        </h2>
                        <div className="h-1 w-20 bg-navy-900" />
                    </div>
                    <Link href="/work" className="hidden md:flex items-center text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors">
                        View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
                    {projects.map((project) => (
                        <div key={project.id} className="group">
                            <Link href={`/work/${project.slug}`} className="block">
                                <div className="relative aspect-video overflow-hidden mb-6 bg-gray-100 border border-gray-200">
                                    <span className="absolute top-0 left-0 z-10 bg-navy-900 text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-br-sm">
                                        {project.category}
                                    </span>
                                    {project.imageUrl && (
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105" // Subtle zoom
                                        />
                                    )}
                                </div>

                                <h3 className="font-heading text-2xl text-navy-900 mb-3 group-hover:underline decoration-navy-900 underline-offset-4 decoration-1">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-2 mb-4 font-body text-base leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex items-center text-navy-700 font-medium text-sm">
                                    View Project <ArrowRight className="ml-2 h-3 w-3" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/work" className="inline-flex items-center text-navy-900 font-medium">
                        View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
