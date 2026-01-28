import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCaseStudies } from '@/lib/data';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/Animations';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Case Studies | Varun Singla',
    description: 'In-depth analysis and strategic problem solving case studies.',
};

export default function CaseStudiesPage() {
    const caseStudies = getCaseStudies({ status: 'published' });
    const featured = caseStudies.find(cs => cs.featured);
    const others = caseStudies.filter(cs => cs.id !== featured?.id);

    return (
        <main className="min-h-screen bg-cream-50">
            <Navbar />

            <div className="pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h1 className="font-heading text-5xl md:text-6xl text-navy-900 mb-6">
                            Case Study Portfolio
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl font-body leading-relaxed">
                            Detailed exploration of complex challenges, methodology, and quantifiable
                            impact across financial and operational domains.
                        </p>
                    </FadeIn>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Featured Case Study Hero */}
                {featured && (
                    <FadeIn className="mb-20">
                        <Link href={`/case-studies/${featured.slug}`} className="group block relative rounded-2xl overflow-hidden bg-navy-900 shadow-xl min-h-[500px] grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative h-64 lg:h-auto overflow-hidden">
                                {featured.coverImage && (
                                    <Image
                                        src={featured.coverImage}
                                        alt={featured.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}
                            </div>
                            <div className="p-12 flex flex-col justify-center text-white">
                                <div className="mb-6 flex items-center space-x-3">
                                    <span className="bg-gold-500 text-navy-900 px-3 py-1 text-xs font-bold rounded-sm uppercase tracking-wider">
                                        Featured
                                    </span>
                                    {featured.industry && (
                                        <span className="text-white/60 text-sm">
                                            {featured.industry}
                                        </span>
                                    )}
                                </div>

                                <h2 className="font-heading text-4xl italic mb-6">
                                    {featured.title}
                                </h2>
                                <p className="text-gray-300 text-lg mb-8 line-clamp-3">
                                    {featured.subtitle || featured.context}
                                </p>

                                <div className="flex items-center text-gold-500 font-medium group-hover:text-gold-400 transition-colors">
                                    Read Full Analysis <ArrowRight className="ml-2 h-5 w-5" />
                                </div>
                            </div>
                        </Link>
                    </FadeIn>
                )}

                {/* Grid of Other Case Studies */}
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {others.map((cs) => (
                        <StaggerItem key={cs.id}>
                            <Link href={`/case-studies/${cs.slug}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                                    {cs.thumbnail || cs.coverImage ? (
                                        <Image
                                            src={cs.thumbnail || cs.coverImage || ''}
                                            alt={cs.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : null}
                                </div>
                                <div className="p-8">
                                    <div className="text-sm text-gray-500 mb-2">
                                        {cs.client || 'Confidential Client'}
                                    </div>
                                    <h3 className="font-heading text-2xl text-navy-900 italic mb-4 group-hover:text-gold-600 transition-colors">
                                        {cs.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2 mb-6 text-sm">
                                        {cs.subtitle || cs.outcome}
                                    </p>
                                    <div className="flex items-center text-navy-900 font-medium text-sm group-hover:text-gold-600">
                                        Read Analysis <ArrowRight className="ml-2 h-3 w-3" />
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerChildren>
            </div>

            <Footer />
        </main>
    );
}
