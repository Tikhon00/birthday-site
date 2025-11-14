import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/content';

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-12">
      {/* Большая цифра 50 на фоне */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute text-[30vw] font-bold text-gradient pointer-events-none select-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        50
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center relative z-10 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
          {siteConfig.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 max-w-xl mx-auto">
          {siteConfig.hero.subtitle}
        </p>
      </motion.div>

      {/* Стрелка вниз */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-muted-foreground">
          {siteConfig.hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
