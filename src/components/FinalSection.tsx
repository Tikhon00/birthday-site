import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { siteConfig } from '@/config/content';
import { Heart } from 'lucide-react';

export const FinalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      {/* Фоновое сияние */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(43 96% 56% / 0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 space-y-8 max-w-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 text-primary mx-auto mb-8" fill="currentColor" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
          {siteConfig.final.message}
        </h2>

        <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
          {siteConfig.final.note}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm text-muted-foreground pt-8"
        >
          С любовью, 2025
        </motion.p>
      </motion.div>
    </section>
  );
};
