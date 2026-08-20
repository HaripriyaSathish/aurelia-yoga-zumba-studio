import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation, Compass } from 'lucide-react';

export default function MapSection({ settings }) {
  const siteName = settings?.site_name || 'AURELIA Yoga & Zumba Studio';
  const address = settings?.address || '42 Wellness Avenue, ECR Road, Chennai, Tamil Nadu';
  const openingHours = settings?.opening_hours || 'Mon – Sat: 5:30 AM – 9:30 PM | Sun: 7:00 AM – 12:00 PM';

  const embedUrl = settings?.google_map_embed_url ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.589139886364!2d80.2452!3d13.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266497f1f9e53%3A0x6b4f7b21e8d6411!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000';

  const directMapUrl = settings?.google_map_direct_url ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="relative py-16 md:py-20 bg-[#141715]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass rounded-3xl p-7 sm:p-9 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#FF6B4A] mb-3 block">Find Us</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FBF7F0] mb-2">{siteName}</h2>
              <p className="text-sm text-[#A8A29A] mb-6">Visit our studio and experience premium wellness in person.</p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF6B4A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A29A] block mb-0.5">Address</span>
                    <p className="text-sm text-[#FBF7F0]">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF6B4A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A29A] block mb-0.5">Opening Hours</span>
                    <p className="text-sm text-[#FBF7F0]">{openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={directMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-3.5 rounded-full gradient-coral text-white text-sm font-semibold flex items-center justify-center gap-2 hover-glow-strong transition-all duration-300"
            >
              <Navigation className="w-4 h-4" /> Get Directions
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[320px] lg:min-h-[420px] border border-white/10"
          >
            <iframe
              src={embedUrl}
              title={`${siteName} Location`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-[1.05]"
            />
            <div className="absolute top-4 left-4 glass rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#FBF7F0]">
              <Compass className="w-3.5 h-3.5 text-[#FF6B4A]" /> Studio Location
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
