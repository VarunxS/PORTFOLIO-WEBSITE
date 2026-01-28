'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input, Textarea, Button } from '@/components/ui/Base';
import { FadeIn } from '@/components/animations/Animations';
import { Mail, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit form');
            }

            setStatus('success');
            setFormData({ name: '', email: '', company: '', subject: '', message: '' });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

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
                                    Let's Connect
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

                        {/* Right Column: Form */}
                        <div className="lg:col-span-7">
                            <FadeIn delay={0.2}>
                                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
                                    {status === 'success' ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="font-heading text-3xl text-navy-900 mb-4">Message Sent</h3>
                                            <p className="text-gray-600 mb-8">
                                                Thank you for reaching out. I'll get back to you shortly.
                                            </p>
                                            <Button variant="outline" onClick={() => setStatus('idle')}>
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <h3 className="font-heading text-2xl text-navy-900 mb-6">Send a Message</h3>

                                            {status === 'error' && (
                                                <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-center text-sm">
                                                    <AlertCircle size={16} className="mr-2" />
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="John Doe"
                                                />
                                                <Input
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="john@company.com"
                                                />
                                            </div>

                                            <Input
                                                label="Company (Optional)"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Organization Name"
                                            />

                                            <Input
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                placeholder="Inquiry about..."
                                            />

                                            <Textarea
                                                label="Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                placeholder="How can I help you?"
                                            />

                                            <div className="pt-2">
                                                <Button
                                                    type="submit"
                                                    loading={status === 'loading'}
                                                    fullWidth
                                                    size="lg"
                                                >
                                                    Send Message
                                                </Button>
                                            </div>
                                        </form>
                                    )}
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
