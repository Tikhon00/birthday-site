import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { siteConfig } from '@/config/content';
import { Sparkles } from 'lucide-react';

export const WishesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gradient mb-16 text-center"
      >
        Мои пожелания
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        {/* Горизонтальный скролл на мобильных */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {siteConfig.wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
              animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex-shrink-0 w-72 md:w-auto snap-center"
            >
              <div className="bg-card rounded-3xl p-8 card-glow h-full flex flex-col justify-between transition-smooth hover:scale-105 hover:rotate-1 min-h-[180px]">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {wish}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
