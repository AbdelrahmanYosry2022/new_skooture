import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import TrustedBy from '../components/landing/TrustedBy';
import Traction from '../components/landing/Traction';
import Legacy from '../components/landing/Legacy';
import WhySection from '../components/landing/WhySection';
import BentoFeatures from '../components/landing/BentoFeatures';
import GlobalPresence from '../components/landing/GlobalPresence';
import AICore from '../components/landing/AICore';
import TopFeatures from '../components/landing/TopFeatures';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import Contact from '../components/landing/Contact';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import BottomNav from '../components/landing/BottomNav';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-500/30 transition-colors duration-300 pb-24 md:pb-0">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Traction />
        <Legacy />
        <WhySection />
        <BentoFeatures />
        <GlobalPresence />
        <AICore />
        <TopFeatures />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <CTASection />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
