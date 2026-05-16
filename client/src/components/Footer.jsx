const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:row justify-between items-center gap-8">
        <div className="text-xl font-bold tracking-tighter">THE REAL</div>
        <div className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} Aryan Shah. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
