import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0D0C]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-16 h-16 mb-6"
          >
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#FF6B4A]/30"
            />
            <motion.span
              className="absolute inset-0 rounded-full border-t-2 border-[#FF6B4A]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-2xl">🧘</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-sm tracking-[0.3em] uppercase text-[#FBF7F0]/70"
          >
            AURELIA
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
