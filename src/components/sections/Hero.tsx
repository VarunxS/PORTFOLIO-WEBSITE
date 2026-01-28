'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Base';

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-white pt-20 border-b border-gray-100">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-8"
                    >
                        <h1 className="font-heading font-semibold text-5xl md:text-6xl lg:text-7xl text-navy-900 leading-tight mb-6">
                            Bridging Strategy <br />
                            & Operational Intelligence.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl font-body leading-relaxed text-left">
                            Delivering high-impact financial modeling, AI-driven process automation, and strategic research to transform decision-making.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="/work">
                            <Button size="lg" className="bg-navy-900 text-white hover:bg-navy-800 shadow-none rounded-none px-8 min-w-[200px]">
                                Strategic Work
                            </Button>
                        </Link>
                        <Link href="/case-studies">
                            <Button size="lg" variant="outline" className="rounded-none px-8 border-gray-300 hover:bg-gray-50 min-w-[200px]">
                                Case Studies
                            </Button>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
