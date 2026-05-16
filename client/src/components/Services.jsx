import { motion } from 'framer-motion';
import { Code, Globe, Cpu, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: <Code />, title: "Web Architecture", desc: "Scalable, high-performance web systems." },
    { icon: <Globe />, title: "3D Experiences", desc: "Interactive Three.js immersive worlds." },
    { icon: <Cpu />, title: "AI Integration", desc: "Smart assistants and predictive logic." },
    { icon: <Zap />, title: "Brand Identity", desc: "Digital luxury and professional design." }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-neutral-500 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
