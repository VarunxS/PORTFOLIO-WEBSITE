'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Base';

export const Navbar = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Work', href: '/work' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Leadership', href: '/leadership' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled ? 'bg-white border-gray-200 py-3' : 'bg-white border-transparent py-5'
            )}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="z-50 relative">
                    <span className="font-heading text-xl font-bold tracking-tight text-navy-900">
                        VARUN SINGLA
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-navy-900',
                                pathname === link.href ? 'text-navy-900 font-semibold' : 'text-gray-500'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/contact" className="ml-4 hidden lg:inline-flex">
                        <Button variant="outline" size="sm" className="hidden lg:inline-flex">+91 8284082401</Button>
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-navy-900"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={cn(
                    "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 transition-transform duration-300 ease-in-out md:hidden",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xl font-heading font-medium text-navy-900 hover:text-navy-700"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href="tel:+918284082401">
                        <Button variant="outline" size="md">Call: +91 8284082401</Button>
                    </a>
                </div>
            </div>
        </header>
    );
};
