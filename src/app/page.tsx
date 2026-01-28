import { Hero } from '@/components/sections/Hero';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { CaseStudyShowcase } from '@/components/sections/CaseStudyShowcase';
import { LeadershipTimeline } from '@/components/sections/LeadershipTimeline';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProjects, getCaseStudies, getLeadership } from '@/lib/data';

export const revalidate = 3600; // Revalidate every hour or use dynamic imports

export default function Home() {
  // Fetch data
  const projects = getProjects({ featured: true, status: 'published' }).slice(0, 4);
  const featuredCaseStudies = getCaseStudies({ featured: true, status: 'published' });
  const featuredCaseStudy = featuredCaseStudies.length > 0 ? featuredCaseStudies[0] : null;
  const leadership = getLeadership();

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <FeaturedWork projects={projects} />

      {featuredCaseStudy && (
        <CaseStudyShowcase caseStudy={featuredCaseStudy} />
      )}

      <LeadershipTimeline positions={leadership} />


      <Footer />
    </main>
  );
}
