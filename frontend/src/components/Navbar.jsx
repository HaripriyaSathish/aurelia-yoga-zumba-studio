import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Yoga', href: '#yoga-programs' },
  { label: 'Zumba', href: '#fitness-programs' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phone = settings?.phone_number || '+91 98765 43210';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 glass shadow-[0_8px_30px_rgba(0,0,0,0.35)]' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="text-2xl">🧘</span>
            <span className="font-display font-extrabold text-lg tracking-tight text-[#FBF7F0]">
              AURELIA
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#FBF7F0]/80 hover:text-[#FF6B4A] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 text-sm font-medium text-[#FBF7F0]/80 hover:text-[#FF6B4A] transition-colors"
            >
              <Phone className="w-4 h-4" /> {phone}
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-coral hover:shadow-[0_8px_24px_rgba(255,107,74,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Trial
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-[#FBF7F0]"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0B0D0C]/98 backdrop-blur-xl lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display font-extrabold text-lg text-[#FBF7F0]">AURELIA</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-[#FBF7F0]" aria-label="Close menu">
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-2xl font-display font-semibold text-[#FBF7F0]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-7 py-3 rounded-full text-base font-semibold text-white gradient-coral"
              >
                Book Free Trial
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
