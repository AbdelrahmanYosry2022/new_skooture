import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-zinc-50 font-sans selection:bg-[#00a86b]/30 transition-colors duration-300">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Traction />
        <div id="company">
          <Legacy />
          <WhySection />
        </div>
        <div id="features">
          <BentoFeatures />
          <GlobalPresence />
          <AICore />
          <TopFeatures />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
