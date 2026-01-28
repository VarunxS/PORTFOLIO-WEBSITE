import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getLeadership } from '@/lib/data';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations/Animations';
import { cn } from '@/lib/utils';

export const metadata = {
    title: 'Leadership | Varun Singla',
    description: 'Positions of responsibility and leadership roles.',
};

export default function LeadershipPage() {
    const positions = getLeadership();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-16 bg-navy-900 text-white">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h1 className="font-heading text-5xl md:text-6xl mb-6">
                            Leadership
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl font-body leading-relaxed">
                            Driving impact through strategic initiatives, team management, and
                            organizational development across academic and technical domains.
                        </p>
                    </FadeIn>

                    {/* Aggregate Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-12">
                        <FadeIn delay={0.2}>
                            <div className="text-4xl lg:text-5xl font-light text-gold-500 mb-2">₹20L+</div>
                            <div className="text-sm uppercase tracking-widest text-white/60">Funds Raised</div>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="text-4xl lg:text-5xl font-light text-gold-500 mb-2">800+</div>
                            <div className="text-sm uppercase tracking-widest text-white/60">Students Impacted</div>
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <div className="text-4xl lg:text-5xl font-light text-gold-500 mb-2">15+</div>
                            <div className="text-sm uppercase tracking-widest text-white/60">Events Led</div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <StaggerChildren className="max-w-4xl mx-auto space-y-12 relative before:absolute before:left-[28px] md:before:left-[-40px] before:top-4 before:bottom-4 before:w-px before:bg-gray-200">

                    {positions.map((pos) => (
                        <StaggerItem key={pos.id} className="relative pl-20 md:pl-0">
                            {/* Dot */}
                            <div className="absolute left-[24px] md:left-[-44px] top-6 w-[9px] h-[9px] rounded-full bg-gold-500 border border-white ring-4 ring-white" />

                            <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-heading text-2xl text-navy-900 font-bold">{pos.title}</h3>
                                        <p className="text-gold-600 font-medium text-lg">{pos.organization}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 text-right">
                                        <span className="inline-block bg-navy-50 text-navy-700 text-xs font-bold uppercase px-3 py-1 rounded mb-1">
                                            {pos.type}
                                        </span>
                                        <div className="text-gray-500 text-sm">
                                            {new Date(pos.startDate).getFullYear()} - {pos.current ? 'Present' : (pos.endDate ? new Date(pos.endDate).getFullYear() : '')}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {pos.description}
                                </p>

                                {pos.achievements && pos.achievements.length > 0 && (
                                    <div className="bg-gray-50 rounded-md p-5 border border-gray-100">
                                        <h4 className="text-sm font-bold uppercase text-gray-500 mb-3 tracking-wider">Key Achievements</h4>
                                        <ul className="space-y-3">
                                            {pos.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-gold-500 mr-2">•</span>
                                                    <span className="text-gray-700 text-sm">
                                                        {achievement.text}
                                                        {achievement.metric && (
                                                            <span className="ml-1 font-semibold text-navy-800">
                                                                ({achievement.metric})
                                                            </span>
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </StaggerItem>
                    ))}

                </StaggerChildren>
            </div>

            <Footer />
        </main>
    );
}
