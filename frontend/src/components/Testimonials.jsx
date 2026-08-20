import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

export default function Testimonials({ testimonials }) {
  const [index, setIndex] = useState(0);
  const list = testimonials || [];

  useEffect(() => {
    if (list.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % list.length), 6000);
    return () => clearInterval(timer);
  }, [list.length]);

  if (list.length === 0) return null;
  const t = list[index];

  const go = (dir) => setIndex((i) => (i + dir + list.length) % list.length);

  return (
    <section className="relative py-16 md:py-20 bg-[#0B0D0C] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B4A]/5 blur-[120px]" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Stories From Our Community"
          subtitle="Real transformations, real energy — hear what our members have to say about their AURELIA journey."
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center"
            >
              <Quote className="w-9 h-9 text-[#FF6B4A]/50 mb-4" />
              <p className="text-lg sm:text-xl text-[#FBF7F0] leading-relaxed text-balance max-w-2xl">
                "{t.review}"
              </p>

              <div className="flex items-center gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-[#FF6B4A] text-[#FF6B4A]' : 'text-[#3A3530]'}`} />
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6B4A]/40" />
                <div className="text-left">
                  <p className="font-display font-semibold text-[#FBF7F0]">{t.name}</p>
                  <p className="text-xs text-[#A8A29A]">{t.program_joined}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {list.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => go(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#FBF7F0] hover:bg-white/15 transition-colors" aria-label="Previous">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {list.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#FF6B4A]' : 'w-1.5 bg-white/20'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={() => go(1)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#FBF7F0] hover:bg-white/15 transition-colors" aria-label="Next">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
