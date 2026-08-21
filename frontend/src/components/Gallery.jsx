import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'studio', label: 'Studio' },
  { key: 'yoga', label: 'Yoga' },
  { key: 'zumba', label: 'Zumba' },
  { key: 'event', label: 'Events' },
];

export default function Gallery({ gallery }) {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const items = (gallery || []).filter((g) => filter === 'all' || g.category === filter);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nav = (dir) => setLightboxIndex((prev) => (prev + dir + items.length) % items.length);

  return (
    <section id="gallery" className="relative py-16 md:py-20 bg-[#0A1614]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Studio Gallery"
          title="A Glimpse Inside AURELIA"
          subtitle="Explore our studio, sessions and community events through our curated photo & video gallery."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f.key ? 'gradient-coral text-white' : 'glass text-[#FBF7F0]/70 hover:text-[#FBF7F0]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              onClick={() => openLightbox(i)}
              className={`relative w-full block break-inside-avoid rounded-2xl overflow-hidden group hover-glow ${i % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}
            >
              <img
                src={item.thumbnail_url || item.image_url}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white text-sm font-medium text-left">{item.caption}</span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-3.5 h-3.5 text-white" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && items[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 right-5 w-11 h-11 rounded-full glass flex items-center justify-center text-white z-10" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nav(-1); }}
              className="absolute left-3 sm:left-6 w-11 h-11 rounded-full glass flex items-center justify-center text-white z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nav(1); }}
              className="absolute right-3 sm:right-6 w-11 h-11 rounded-full glass flex items-center justify-center text-white z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <motion.img
              key={items[lightboxIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              src={items[lightboxIndex].image_url}
              alt={items[lightboxIndex].caption}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
