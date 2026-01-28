import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/Animations';
import { Mail, Linkedin } from 'lucide-react';

export default function ContactPage() {

    return (
        <main className="min-h-screen bg-navy-900">
            <Navbar />

            <div className="pt-28 pb-12 lg:pt-40 lg:pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Left Column: Info */}
                        <div className="lg:col-span-5 text-white">
                            <FadeIn>
                                <h1 className="font-heading text-5xl md:text-6xl mb-8">
                                    Contact
                                </h1>
                                <p className="text-xl text-gray-300 font-light leading-relaxed mb-12">
                                    I am currently open to internship opportunities in Investment Banking,
                                    Consulting, and Product Analytics.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white/5 rounded-full text-gold-500">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Email</h3>
                                            <a href="mailto:varunsingla608@gmail.com" className="text-lg font-medium hover:text-gold-500 transition-colors">
                                                varunsingla608@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white/5 rounded-full text-gold-500">
                                            <Linkedin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-1">LinkedIn</h3>
                                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-gold-500 transition-colors">
                                                linkedin.com/in/varunsingla
                                            </a>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                                            <h3 className="text-gold-500 font-heading text-xl mb-2">Quick Facts</h3>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                <li>• Based in Chandigarh, India (IST)</li>
                                                <li>• Response time: &lt; 24 Hours</li>
                                                <li>• Open to relocation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="lg:col-span-7">
                            <FadeIn delay={0.2}>
                                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col items-center justify-center text-center min-h-[400px]">
                                    <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center mb-8 text-navy-900">
                                        <Mail size={40} />
                                    </div>
                                    <h3 className="font-heading text-3xl text-navy-900 mb-4">Get in Touch</h3>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                        I prefer direct communication via email or phone for faster response times.
                                        Please reach out using the details below.
                                    </p>

                                    <div className="space-y-4 w-full max-w-xs">
                                        <a href="mailto:varunsingla608@gmail.com" className="flex items-center justify-center gap-3 p-4 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-all font-medium">
                                            <Mail size={20} />
                                            <span>Email Me</span>
                                        </a>
                                        <a href="tel:+918284082401" className="flex items-center justify-center gap-3 p-4 border border-navy-900 text-navy-900 rounded-lg hover:bg-navy-50 transition-all font-medium">
                                            <span>Call: +91 8284082401</span>
                                        </a>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
