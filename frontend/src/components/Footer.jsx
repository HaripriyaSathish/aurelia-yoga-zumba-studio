import React from 'react';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../utils/socialIcons.jsx';

export default function Footer({ settings }) {
  const siteName = settings?.site_name || 'AURELIA Yoga & Zumba Studio';
  const address = settings?.address || '42 Wellness Avenue, ECR Road, Chennai, Tamil Nadu';
  const phone = settings?.phone_number || '+91 98765 43210';
  const email = settings?.email || 'hello@aureliawellness.com';
  const instagram = settings?.instagram_url || '#';
  const facebook = settings?.facebook_url || '#';
  const youtube = settings?.youtube_url || '#';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const columns = [
    {
      title: 'Classes',
      links: [
        { label: 'Yoga Programs', href: '#yoga-programs' },
        { label: 'Zumba & Fitness', href: '#fitness-programs' },
        { label: 'Weekly Schedule', href: '#schedule' },
        { label: 'Membership Plans', href: '#membership' },
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'Our Story', href: '#about' },
        { label: 'Trainers', href: '#trainers' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact Us', href: '#contact' },
      ],
    },
  ];

  return (
    <footer id="site-footer" className="bg-[#0B0D0C] text-[#FBF7F0] border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧘</span>
              <span className="font-display font-extrabold text-lg">AURELIA</span>
            </div>
            <p className="text-sm text-[#A8A29A] leading-relaxed max-w-xs">
              Premium yoga & Zumba studio dedicated to helping you move your body and elevate your energy.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-[#FF6B4A] hover-glow transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-[#FF6B4A] hover-glow transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-[#FF6B4A] hover-glow transition-colors" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <button onClick={scrollToTop} className="w-9 h-9 rounded-full gradient-coral flex items-center justify-center ml-1 hover:-translate-y-0.5 transition-transform" aria-label="Back to top">
                <ArrowUp className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-[#A8A29A] hover:text-[#FF6B4A] transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-[#A8A29A]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B4A] shrink-0 mt-0.5" /> <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B4A] shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FF6B4A]">{phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B4A] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#FF6B4A]">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A29A]/70 gap-3">
          <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
