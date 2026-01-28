'use client';

import { LeadershipPosition } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LeadershipTimelineProps {
    positions: LeadershipPosition[];
}

export const LeadershipTimeline = ({ positions }: LeadershipTimelineProps) => {
    const displayPositions = positions.slice(0, 3);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="font-heading text-3xl font-semibold text-navy-900 mb-2">
                            Leadership & Impact
                        </h2>
                        <div className="h-1 w-20 bg-navy-900" />
                    </div>
                    <Link href="/leadership" className="hidden md:flex items-center text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors mt-4 md:mt-0">
                        View All Positions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="border-t border-gray-200">
                    {displayPositions.map((pos) => (
                        <div key={pos.id} className="group border-b border-gray-200 py-8 hover:bg-gray-50 transition-colors px-4 -mx-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                                {/* Date & Type */}
                                <div className="col-span-1">
                                    <span className="block text-sm font-semibold text-navy-900 mb-1">
                                        {pos.organization}
                                    </span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                                        {new Date(pos.startDate).getFullYear()} - {pos.current ? 'Present' : (pos.endDate ? new Date(pos.endDate).getFullYear() : '')}
                                    </span>
                                </div>

                                {/* Role & Description */}
                                <div className="col-span-1 md:col-span-3">
                                    <h3 className="text-lg font-medium text-navy-900 mb-2">
                                        {pos.title}
                                    </h3>
                                    {/* Single line achievement for scannability */}
                                    {pos.achievements.length > 0 && (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {pos.achievements[0].text}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <Link href="/leadership" className="flex items-center text-sm font-medium text-navy-900">
                        View All Positions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
