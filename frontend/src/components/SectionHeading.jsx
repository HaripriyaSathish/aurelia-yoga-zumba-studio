import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  return (
    <div className={`flex flex-col ${alignClass} max-w-2xl ${align === 'left' ? '' : 'mx-auto'} mb-12 md:mb-16`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#1FBF8F] mb-4"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={`font-display font-extrabold text-balance leading-[1.08] text-3xl sm:text-4xl md:text-5xl ${light ? 'text-[#0A1614]' : 'text-[#FBF7F0]'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className={`mt-5 text-base md:text-lg leading-relaxed ${light ? 'text-[#0A1614]/70' : 'text-[#B9C7C2]'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
