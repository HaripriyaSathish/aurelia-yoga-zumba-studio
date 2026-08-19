import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function CTASection({ cta, settings }) {
  if (!cta) return null;
  const phone = settings?.phone_number || '';
  const whatsapp = (settings?.whatsapp_number || '').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(settings?.whatsapp_message || 'Hi, I am interested in joining your Yoga/Zumba classes.')}`;

  return (
    <section id="contact-cta" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={cta.background_image_url} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D0C]/80 via-[#0B0D0C]/70 to-[#0B0D0C]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#FBF7F0] text-balance leading-[1.08]"
        >
          {cta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base sm:text-lg text-[#FBF7F0]/75 max-w-xl mx-auto"
        >
          {cta.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={cta.primary_button_link || '#contact'}
            className="px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white gradient-coral shadow-[0_10px_30px_rgba(255,107,74,0.35)] hover-glow-strong hover:-translate-y-0.5 transition-all duration-300"
          >
            {cta.primary_button_text || 'Book Free Trial'}
          </a>
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-[#FBF7F0] glass hover:bg-white/15 transition-all duration-300"
          >
            <Phone className="w-4 h-4" /> Call Us
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
