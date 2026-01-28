'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/lib/data';
import { Button } from '@/components/ui/Base';

interface CaseStudyShowcaseProps {
    caseStudy: CaseStudy;
}

export const CaseStudyShowcase = ({ caseStudy }: CaseStudyShowcaseProps) => {
    if (!caseStudy) return null;

    return (
        <section className="py-24 bg-navy-50 border-b border-gray-200">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Content Side - Left for Emphasis on Text */}
                        <div className="p-10 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                            <span className="text-navy-600 uppercase tracking-widest text-xs font-bold mb-6">
                                Featured Case Study
                            </span>

                            <h3 className="font-heading text-3xl md:text-4xl text-navy-900 mb-4 font-semibold">
                                {caseStudy.title}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-mono">
                                <span>{caseStudy.client || 'Confidential Client'}</span>
                                <span>|</span>
                                <span>{caseStudy.industry}</span>
                            </div>

                            <p className="text-gray-700 mb-8 leading-relaxed font-body text-lg">
                                {caseStudy.subtitle}
                            </p>


                            <div>
                                <Link href={`/case-studies/${caseStudy.slug}`}>
                                    <Button variant="primary">
                                        Read Analysis
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative h-80 lg:h-auto bg-gray-100 order-1 lg:order-2 border-l border-gray-100">
                            {caseStudy.coverImage && (
                                <Image
                                    src={caseStudy.coverImage}
                                    alt={caseStudy.title}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
