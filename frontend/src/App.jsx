import React, { useEffect, useState } from 'react';
import { apiService, fallbackData } from './services/api';

import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import YogaPrograms from './components/YogaPrograms.jsx';
import FitnessPrograms from './components/FitnessPrograms.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Trainers from './components/Trainers.jsx';
import Schedule from './components/Schedule.jsx';
import Gallery from './components/Gallery.jsx';
import VideoExperience from './components/VideoExperience.jsx';
import Testimonials from './components/Testimonials.jsx';
import MembershipPlans from './components/MembershipPlans.jsx';
import CTASection from './components/CTASection.jsx';
import ContactSection from './components/ContactSection.jsx';
import MapSection from './components/MapSection.jsx';
import FloatingContactButtons from './components/FloatingContactButtons.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState(fallbackData.settings);
  const [hero, setHero] = useState(fallbackData.hero);
  const [heroStats, setHeroStats] = useState(fallbackData.heroStats);
  const [about, setAbout] = useState(fallbackData.about);
  const [trainers, setTrainers] = useState(fallbackData.trainers);
  const [yogaPrograms, setYogaPrograms] = useState(fallbackData.yogaPrograms);
  const [fitnessPrograms, setFitnessPrograms] = useState(fallbackData.fitnessPrograms);
  const [whyChooseUs, setWhyChooseUs] = useState(fallbackData.whyChooseUs);
  const [schedule, setSchedule] = useState(fallbackData.schedule);
  const [gallery, setGallery] = useState(fallbackData.gallery);
  const [videoReels, setVideoReels] = useState(fallbackData.videoReels);
  const [testimonials, setTestimonials] = useState(fallbackData.testimonials);
  const [membershipPlans, setMembershipPlans] = useState(fallbackData.membershipPlans);
  const [cta, setCta] = useState(fallbackData.cta);

  useEffect(() => {
    async function loadData() {
      const results = await Promise.allSettled([
        apiService.getSettings(), apiService.getHero(), apiService.getHeroStats(), apiService.getAbout(),
        apiService.getTrainers(), apiService.getYogaPrograms(), apiService.getFitnessPrograms(),
        apiService.getWhyChooseUs(), apiService.getSchedule(), apiService.getGallery(),
        apiService.getVideoReels(), apiService.getTestimonials(), apiService.getMembershipPlans(), apiService.getCTA(),
      ]);

      const setters = [
        setSettings, setHero, setHeroStats, setAbout, setTrainers, setYogaPrograms, setFitnessPrograms,
        setWhyChooseUs, setSchedule, setGallery, setVideoReels, setTestimonials, setMembershipPlans, setCta,
      ];

      results.forEach((res, i) => {
        if (res.status === 'fulfilled' && res.value && (!Array.isArray(res.value) || res.value.length > 0)) {
          setters[i](res.value);
        }
      });

      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#0A1614] text-[#FBF7F0] selection:bg-[#1FBF8F] selection:text-white font-sans">
      <Loader isLoading={isLoading} />

      <Navbar settings={settings} />

      <main>
        <Hero hero={hero} heroStats={heroStats} settings={settings} />
        <About about={about} />
        <YogaPrograms programs={yogaPrograms} settings={settings} />
        <FitnessPrograms programs={fitnessPrograms} settings={settings} />
        <WhyChooseUs features={whyChooseUs} />
        <Trainers trainers={trainers} />
        <Schedule schedule={schedule} />
        <Gallery gallery={gallery} />
        <VideoExperience reels={videoReels} />
        <Testimonials testimonials={testimonials} />
        <MembershipPlans plans={membershipPlans} settings={settings} />
        <CTASection cta={cta} settings={settings} />
        <ContactSection settings={settings} />
        <MapSection settings={settings} />
      </main>

      <Footer settings={settings} />

      <FloatingContactButtons settings={settings} />
    </div>
  );
}
