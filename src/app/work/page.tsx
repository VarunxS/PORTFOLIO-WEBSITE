import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProjects } from '@/lib/data';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/Animations';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Projects & Work | Varun Singla',
    description: 'Explore my portfolio of AI-powered financial analysis, automation projects, and product work.',
};

export default function WorkPage() {
    // Fetch all published projects
    const projects = getProjects({ status: 'published' });

    // Group available categories to show filter UI (simple static for now, interactive needs client component)
    // For standard server component page, better to render all and let client filter or just show all sorted
    // We'll show all sorted by date (managed in getProjects)

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-16 bg-cream-50">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h1 className="font-heading text-5xl md:text-6xl text-navy-900 mb-6">
                            Projects & Engagements
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl font-body leading-relaxed">
                            A selection of projects demonstrating technical execution across AI automation,
                            quantitive analysis, and product development.
                        </p>
                    </FadeIn>
                </div>
            </div>

            <div className="py-20 container mx-auto px-6">
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <StaggerItem key={project.id}>
                            <Link href={`/work/${project.slug}`} className="group block h-full flex flex-col">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-gray-100">
                                    <span className="absolute top-4 left-4 z-10 bg-navy-900/90 backdrop-blur text-white px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-sm">
                                        {project.category}
                                    </span>
                                    <div className="w-full h-full bg-navy-100 group-hover:scale-105 transition-transform duration-500 ease-out relative">
                                        {project.imageUrl && (
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                </div>

                                <h3 className="font-heading text-2xl text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-3 mb-4 font-body flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex items-center text-gold-500 font-medium text-sm mt-auto">
                                    View Case <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerChildren>

                {projects.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No projects published yet. Check back soon.
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
