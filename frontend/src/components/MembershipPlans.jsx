import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

export default function MembershipPlans({ plans, settings }) {
  const whatsapp = (settings?.whatsapp_number || '').replace(/[^0-9]/g, '');

  return (
    <section id="membership" className="relative py-16 md:py-20 bg-[#0F211D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Membership Plans"
          title="Simple, Transparent Pricing"
          subtitle="Choose a plan that fits your goals — every membership includes access to our certified trainers and premium studio."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(plans || []).map((plan, i) => {
            const price = Number(plan.price);
            const message = `Hi, I would like to join the "${plan.name}" membership plan. Please share the next steps.`;
            const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-7 flex flex-col hover-glow ${
                  plan.is_highlighted
                    ? 'gradient-coral text-white shadow-[0_20px_50px_rgba(31,191,143,0.35)] scale-[1.03]'
                    : 'glass border border-white/10 text-[#FBF7F0]'
                }`}
              >
                {plan.is_highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#1FBF8F] text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-4xl">
                    {price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}
                  </span>
                  {price > 0 && <span className={`text-sm ${plan.is_highlighted ? 'text-white/80' : 'text-[#B9C7C2]'}`}>/{plan.duration}</span>}
                </div>
                {price === 0 && <p className={`text-sm mt-1 ${plan.is_highlighted ? 'text-white/80' : 'text-[#B9C7C2]'}`}>{plan.duration}</p>}

                <ul className="mt-6 space-y-3 flex-1">
                  {(plan.features || []).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.is_highlighted ? 'text-white' : 'text-[#1FBF8F]'}`} />
                      <span className={plan.is_highlighted ? 'text-white/95' : 'text-[#B9C7C2]'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 w-full text-center py-3 rounded-full text-sm font-semibold hover-glow-strong transition-all duration-300 ${
                    plan.is_highlighted
                      ? 'bg-white text-[#1FBF8F] hover:shadow-xl'
                      : 'gradient-coral text-white hover:shadow-[0_8px_24px_rgba(31,191,143,0.4)]'
                  }`}
                >
                  {plan.cta_text || 'Join Now'}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
