import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import SectionHeading from './SectionHeading.jsx';

const PROGRAM_OPTIONS = [
  'General Enquiry', 'Hatha Yoga', 'Power Yoga', 'Vinyasa Flow', 'Meditation & Breathwork',
  'Prenatal Yoga', 'Beginner Yoga', 'Zumba Fitness', 'Zumba Dance', 'Bollywood Fitness',
  'Cardio Dance', 'Kids Zumba', 'Evening Fitness', 'Membership Plans',
];

export default function ContactSection({ settings }) {
  const phone = settings?.phone_number || '+91 98765 43210';
  const whatsapp = settings?.whatsapp_number || '+91 98765 43210';
  const email = settings?.email || 'hello@aureliawellness.com';
  const address = settings?.address || '42 Wellness Avenue, ECR Road, Chennai, Tamil Nadu';

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = settings?.whatsapp_message || 'Hi, I am interested in joining your Yoga/Zumba classes. Please share more details.';
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', program_interested: 'General Enquiry', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);
    try {
      await apiService.submitEnquiry(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', program_interested: 'General Enquiry', message: '' });
    } catch (err) {
      if (err.errors) {
        const firstErr = Object.values(err.errors)[0];
        setErrorMsg(Array.isArray(firstErr) ? firstErr[0] : String(firstErr));
      } else {
        setErrorMsg(err.message || 'We were unable to process your request. Please call or WhatsApp us directly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 bg-[#0B0D0C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Book Your Free Trial Class"
          subtitle="Have questions or ready to start? Reach out and our wellness team will help you find the perfect class."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: quick contact */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="glass rounded-3xl p-7 sm:p-8">
              <h3 className="font-display font-bold text-xl text-[#FBF7F0] mb-6">Contact Details</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full glass-coral flex items-center justify-center text-[#FF6B4A] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A8A29A] uppercase tracking-wider block">Call Us</span>
                    <a href={`tel:${cleanPhone}`} className="text-sm font-medium text-[#FBF7F0] hover:text-[#FF6B4A] transition-colors">{phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A8A29A] uppercase tracking-wider block">WhatsApp</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#FBF7F0] hover:text-[#25D366] transition-colors">{whatsapp}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full glass-coral flex items-center justify-center text-[#FF6B4A] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A8A29A] uppercase tracking-wider block">Email</span>
                    <a href={`mailto:${email}`} className="text-sm font-medium text-[#FBF7F0] hover:text-[#FF6B4A] transition-colors">{email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full glass-coral flex items-center justify-center text-[#FF6B4A] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A8A29A] uppercase tracking-wider block">Studio Address</span>
                    <span className="text-sm font-medium text-[#FBF7F0]">{address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a href={`tel:${cleanPhone}`} className="py-3 rounded-full glass text-center text-xs font-semibold text-[#FBF7F0] hover:bg-white/15 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> Call Us
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-center text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 glass rounded-3xl p-7 sm:p-9"
          >
            {success && (
              <div className="mb-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Enquiry received!</h4>
                  <p className="text-xs text-[#A8A29A] mt-0.5 leading-relaxed">We've sent you a confirmation email. Our team will reach out within 24 hours.</p>
                </div>
              </div>
            )}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A8A29A] mb-1.5">Full Name *</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FBF7F0] placeholder-[#A8A29A]/50 focus:outline-none focus:border-[#FF6B4A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A8A29A] mb-1.5">Email Address *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FBF7F0] placeholder-[#A8A29A]/50 focus:outline-none focus:border-[#FF6B4A] transition-colors"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#A8A29A] mb-1.5">Phone Number *</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FBF7F0] placeholder-[#A8A29A]/50 focus:outline-none focus:border-[#FF6B4A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A8A29A] mb-1.5">Program Interested In</label>
                  <select
                    name="program_interested" value={formData.program_interested} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FBF7F0] focus:outline-none focus:border-[#FF6B4A] transition-colors"
                  >
                    {PROGRAM_OPTIONS.map((opt) => <option key={opt} value={opt} className="bg-[#141715]">{opt}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A8A29A] mb-1.5">Message *</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows="4"
                  placeholder="Tell us about your fitness goals or any questions you have..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FBF7F0] placeholder-[#A8A29A]/50 focus:outline-none focus:border-[#FF6B4A] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full text-sm font-semibold text-white gradient-coral hover-glow-strong transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Sending...' : (<><Send className="w-4 h-4" /> Send Enquiry</>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
