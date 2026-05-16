import { motion } from 'framer-motion';
import HeroScene from '../components/HeroScene';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <main className="relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-bold tracking-tighter glow-text"
          >
            THE REAL
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-neutral-400 mt-4 tracking-widest uppercase"
          >
            By Aryan Shah
          </motion.p>
        </div>
      </section>

      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default LandingPage;
