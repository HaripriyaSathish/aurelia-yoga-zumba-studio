import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, Plus, X } from 'lucide-react';

export default function FloatingContactButtons({ settings }) {
  const [bottomOffset, setBottomOffset] = useState(24);
  const [expanded, setExpanded] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const phone = settings?.phone_number || '+91 98765 43210';
  const whatsapp = settings?.whatsapp_number || '+91 98765 43210';
  const email = settings?.email || 'hello@aureliawellness.com';

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = settings?.whatsapp_message || 'Hi, I am interested in joining your Yoga/Zumba classes. Please share more details.';
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;
  const callUrl = `tel:${cleanPhone}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent('Enquiry — AURELIA Yoga & Zumba Studio')}`;

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('site-footer');
      if (!footer) {
        setBottomOffset(24);
        return;
      }
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const defaultGap = 24;
      if (footerRect.top < windowHeight) {
        setBottomOffset(windowHeight - footerRect.top + defaultGap);
      } else {
        setBottomOffset(defaultGap);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const buttons = [
    { id: 'whatsapp', name: 'WhatsApp Us', icon: MessageCircle, href: whatsappUrl, target: '_blank', rel: 'noopener noreferrer', bgClass: 'bg-[#25D366] hover:bg-[#20ba59]', tooltip: 'Chat on WhatsApp' },
    { id: 'phone', name: 'Call Us', icon: Phone, href: callUrl, bgClass: 'gradient-coral', tooltip: `Call: ${phone}` },
    { id: 'email', name: 'Email Us', icon: Mail, href: mailtoUrl, bgClass: 'bg-[#1D211E] border border-white/15', tooltip: `Email: ${email}` },
  ];

  return (
    <div
      className="fixed right-4 sm:right-6 z-40 flex flex-col-reverse items-end gap-3 transition-[bottom] duration-150 ease-out"
      style={{ bottom: `${bottomOffset}px` }}
      aria-label="Floating Contact Channels"
    >
      {/* Mobile toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="sm:hidden w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.4)] gradient-coral text-white transition-transform duration-300"
        aria-label={expanded ? 'Close contact options' : 'Open contact options'}
        aria-expanded={expanded}
      >
        <motion.span animate={{ rotate: expanded ? 135 : 0 }} transition={{ duration: 0.25 }}>
          <Plus className="w-6 h-6" />
        </motion.span>
      </button>

      {/* Desktop: always visible / Mobile: expandable */}
      <div className="hidden sm:flex flex-col items-end gap-3">
        {buttons.map((btn) => (
          <FabButton key={btn.id} btn={btn} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} />
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden flex flex-col items-end gap-3"
          >
            {buttons.map((btn, i) => (
              <motion.div
                key={btn.id}
                initial={{ opacity: 0, y: 16, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.8 }}
                transition={{ delay: i * 0.06 }}
              >
                <FabButton btn={btn} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} showLabelMobile />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FabButton({ btn, activeTooltip, setActiveTooltip, showLabelMobile = false }) {
  const Icon = btn.icon;
  return (
    <div className="relative flex items-center group">
      <div
        className={`absolute right-full mr-3.5 px-3 py-1.5 glass text-[#FBF7F0] text-[11px] font-medium tracking-wide whitespace-nowrap rounded-full shadow-xl pointer-events-none transition-all duration-200 ${
          activeTooltip === btn.id || showLabelMobile ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
        }`}
      >
        {btn.tooltip}
      </div>
      <a
        href={btn.href}
        target={btn.target}
        rel={btn.rel}
        onMouseEnter={() => setActiveTooltip(btn.id)}
        onMouseLeave={() => setActiveTooltip(null)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:scale-108 hover-glow-strong transition-all duration-300 ${btn.bgClass}`}
        aria-label={btn.name}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
