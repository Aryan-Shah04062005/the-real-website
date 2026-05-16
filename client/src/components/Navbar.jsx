import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-[#050505] to-transparent">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold tracking-tighter"
      >
        THE REAL
      </motion.div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400 uppercase tracking-widest">
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm"
        onClick={() => window.location.href = '#contact'}
      >
        LET'S TALK
      </motion.button>
    </nav>
  );
};

export default Navbar;
