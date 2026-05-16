import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-5xl font-medium tracking-tight leading-tight"
        >
          "Aryan delivers code that isn't just functional—it's a work of digital art."
        </motion.div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full" />
          <div className="text-left">
            <div className="font-bold">Tech Industry Leader</div>
            <div className="text-sm text-neutral-500">Managing Director</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
