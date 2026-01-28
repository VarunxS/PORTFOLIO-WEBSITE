import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-12 text-gray-600">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="md:col-span-2">
                        <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">Varun Singla</h3>
                        <p className="text-sm max-w-xs leading-relaxed">
                            Business Intelligence & Strategy.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-navy-900 text-sm mb-3">Sitemap</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/work" className="hover:text-navy-900">Work</Link></li>
                            <li><Link href="/case-studies" className="hover:text-navy-900">Case Studies</Link></li>
                            <li><Link href="/leadership" className="hover:text-navy-900">Leadership</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-navy-900 text-sm mb-3">Contact</h4>
                        <div className="flex space-x-4 mb-2">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-navy-900">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:varunsingla608@gmail.com" className="hover:text-navy-900">
                                <Mail size={20} />
                            </a>
                        </div>
                        <p className="text-xs">varunsingla608@gmail.com</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} Varun Singla.</p>
                    <Link href="/admin/login" className="hover:text-gray-600 mt-2 md:mt-0">Admin Access</Link>
                </div>
            </div>
        </footer>
    );
};
