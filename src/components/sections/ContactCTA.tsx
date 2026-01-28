'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Base';

export const ContactCTA = () => {
    return (
        <section className="py-20 bg-navy-900 text-white">
            <div className="container mx-auto px-6 lg:px-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between">
                <div className="max-w-2xl mb-8 lg:mb-0">
                    <h2 className="font-heading text-3xl font-semibold mb-4">
                        Available for Select Opportunities
                    </h2>
                    <p className="text-gray-300 font-light text-lg">
                        Open to Analyst roles in Investment Banking, Consulting, and Product Strategy.
                    </p>
                </div>
                <Link href="/contact">
                    <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100 border-none">
                        Get in Touch
                    </Button>
                </Link>
            </div>
        </section>
    );
};
