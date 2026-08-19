import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Fallback data mirrors the Django API shape so the site always renders,
// even before the backend / seed data is available.
export const fallbackData = {
  settings: {
    site_name: "AURELIA Yoga & Zumba Studio",
    tagline: "Move Your Body. Elevate Your Energy.",
    phone_number: "+91 98765 43210",
    whatsapp_number: "+91 98765 43210",
    whatsapp_message: "Hi, I am interested in joining your Yoga/Zumba classes. Please share more details.",
    email: "hello@aureliawellness.com",
    address: "42 Wellness Avenue, ECR Road, Chennai, Tamil Nadu 600041",
    opening_hours: "Mon – Sat: 5:30 AM – 9:30 PM | Sun: 7:00 AM – 12:00 PM",
    google_map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.589139886364!2d80.2452!3d13.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266497f1f9e53%3A0x6b4f7b21e8d6411!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000",
    google_map_direct_url: "https://maps.google.com/?q=Chennai+Tamil+Nadu",
    latitude: 13.0475,
    longitude: 80.2452,
    facebook_url: "https://facebook.com/aureliawellness",
    instagram_url: "https://instagram.com/aureliawellness",
    youtube_url: "https://youtube.com/@aureliawellness",
  },
  hero: {
    headline: "Move Your Body. Elevate Your Energy.",
    subtitle: "Premium yoga, energetic Zumba and holistic wellness programs guided by certified experts — designed to transform your mind, body and spirit.",
    background_video_url: "https://cdn.coverr.co/videos/coverr-yoga-practice-at-sunrise-2633/1080p.mp4",
    poster_image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop",
    primary_cta_text: "Book a Free Trial",
    primary_cta_link: "#contact",
    secondary_cta_text: "Explore Classes",
    secondary_cta_link: "#yoga-programs",
  },
  heroStats: [
    { id: 1, icon: 'flower-2', label: 'Yoga Classes', value: '25+' },
    { id: 2, icon: 'music-4', label: 'Zumba Sessions', value: '18+' },
    { id: 3, icon: 'award', label: 'Expert Trainers', value: '18' },
    { id: 4, icon: 'clock', label: 'Flexible Timings', value: '7 Days' },
  ],
  about: {
    eyebrow: "OUR STORY",
    title: "A Sanctuary for Movement & Mindfulness",
    description: "Founded with a passion for holistic wellbeing, AURELIA brings together the ancient discipline of yoga and the electrifying energy of Zumba under one roof. Our state-of-the-art studio is designed to help you build strength, flexibility and calm — guided every step of the way by certified, internationally trained instructors in a warm, welcoming community.",
    image_1_url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop",
    image_2_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    image_3_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    years_experience: 12,
    happy_members: 3200,
    certified_trainers: 18,
    success_rate: 98,
  },
  trainers: [
    { id: 1, name: "Aanya Krishnan", role: "Founder & Lead Yoga Instructor", photo_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop", bio: "500-hr certified Hatha & Vinyasa teacher with over a decade of experience.", experience_years: 12, instagram_url: "#" },
    { id: 2, name: "Rhea Fernandes", role: "Zumba & Dance Fitness Lead", photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", bio: "Licensed ZIN instructor bringing Latin rhythms to every session.", experience_years: 8, instagram_url: "#" },
    { id: 3, name: "Vikram Rao", role: "Power Yoga & Strength Coach", photo_url: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop", bio: "Former athlete specializing in power yoga and functional strength.", experience_years: 9, instagram_url: "#" },
    { id: 4, name: "Meera Iyer", role: "Meditation & Breathwork Guide", photo_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop", bio: "Mindfulness coach helping members find calm through breathwork.", experience_years: 6, instagram_url: "#" },
  ],
  yogaPrograms: [
    { id: 1, name: "Hatha Yoga", slug: "hatha-yoga", image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", description: "A slow-paced, foundational practice combining postures and breathing.", duration: "60 mins", level: "beginner", level_display: "Beginner", schedule: "Mon, Wed, Fri — 6:00 AM", price: "1999.00", trainer_name: "Aanya Krishnan" },
    { id: 2, name: "Power Yoga", slug: "power-yoga", image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop", description: "A dynamic, fitness-based approach that builds heat, strength and endurance.", duration: "60 mins", level: "intermediate", level_display: "Intermediate", schedule: "Tue, Thu, Sat — 7:00 AM", price: "2499.00", trainer_name: "Vikram Rao" },
    { id: 3, name: "Vinyasa Flow", slug: "vinyasa-flow", image_url: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=1000&auto=format&fit=crop", description: "A flowing, breath-synchronized sequence — a moving meditation.", duration: "60 mins", level: "intermediate", level_display: "Intermediate", schedule: "Mon, Wed, Fri — 8:00 AM", price: "2299.00", trainer_name: "Aanya Krishnan" },
    { id: 4, name: "Meditation & Breathwork", slug: "meditation-breathwork", image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", description: "Guided pranayama and meditation to calm the mind.", duration: "45 mins", level: "all-levels", level_display: "All Levels", schedule: "Daily — 7:00 PM", price: "1499.00", trainer_name: "Meera Iyer" },
    { id: 5, name: "Prenatal Yoga", slug: "prenatal-yoga", image_url: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop", description: "A gentle, safe practice for expecting mothers.", duration: "50 mins", level: "beginner", level_display: "Beginner", schedule: "Tue, Thu — 10:00 AM", price: "1999.00", trainer_name: "Sanya Kapoor" },
    { id: 6, name: "Beginner Yoga", slug: "beginner-yoga", image_url: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=1000&auto=format&fit=crop", description: "An approachable introduction to yoga fundamentals.", duration: "45 mins", level: "beginner", level_display: "Beginner", schedule: "Mon to Sat — 9:00 AM", price: "1699.00", trainer_name: "Sanya Kapoor" },
  ],
  fitnessPrograms: [
    { id: 1, name: "Zumba Fitness", slug: "zumba-fitness", image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop", video_url: "", description: "High-energy dance cardio set to international beats.", duration: "50 mins", level: "all-levels", level_display: "All Levels", schedule: "Mon, Wed, Fri — 6:30 PM", price: "1799.00", trainer_name: "Rhea Fernandes" },
    { id: 2, name: "Zumba Dance", slug: "zumba-dance", image_url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1000&auto=format&fit=crop", video_url: "", description: "Choreography-focused Zumba blending Latin, hip-hop and pop.", duration: "50 mins", level: "intermediate", level_display: "Intermediate", schedule: "Tue, Thu — 7:00 PM", price: "1899.00", trainer_name: "Rhea Fernandes" },
    { id: 3, name: "Bollywood Fitness", slug: "bollywood-fitness", image_url: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1000&auto=format&fit=crop", video_url: "", description: "Vibrant cardio-dance inspired by Bollywood choreography.", duration: "45 mins", level: "all-levels", level_display: "All Levels", schedule: "Mon, Wed — 8:00 PM", price: "1699.00", trainer_name: "Karan Malhotra" },
    { id: 4, name: "Cardio Dance", slug: "cardio-dance", image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop", video_url: "", description: "Fast-paced full-body dance cardio to torch calories.", duration: "45 mins", level: "intermediate", level_display: "Intermediate", schedule: "Tue, Thu, Sat — 6:00 PM", price: "1799.00", trainer_name: "Karan Malhotra" },
    { id: 5, name: "Kids Zumba", slug: "kids-zumba", image_url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop", video_url: "", description: "A fun, safe intro to dance fitness for children aged 6–14.", duration: "40 mins", level: "beginner", level_display: "Beginner", schedule: "Sat, Sun — 10:00 AM", price: "1299.00", trainer_name: "Rhea Fernandes" },
    { id: 6, name: "Evening Fitness", slug: "evening-fitness", image_url: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1000&auto=format&fit=crop", video_url: "", description: "A well-rounded strength and cardio circuit to end your day.", duration: "50 mins", level: "all-levels", level_display: "All Levels", schedule: "Mon to Fri — 7:30 PM", price: "1999.00", trainer_name: "Vikram Rao" },
  ],
  whyChooseUs: [
    { id: 1, icon: 'badge-check', title: 'Certified Trainers', description: 'Every instructor is internationally certified with years of hands-on teaching experience.' },
    { id: 2, icon: 'sparkles', title: 'Modern Studio', description: 'A premium, climate-controlled studio equipped with the latest fitness technology.' },
    { id: 3, icon: 'clock', title: 'Flexible Timings', description: 'Morning, afternoon and evening slots designed to fit around your schedule.' },
    { id: 4, icon: 'smile', title: 'Beginner Friendly', description: 'Structured onboarding and beginner tracks so anyone can start with confidence.' },
    { id: 5, icon: 'target', title: 'Personalized Guidance', description: 'Trainers tailor every session to your fitness level and personal goals.' },
    { id: 6, icon: 'gift', title: 'Free Trial Class', description: 'Experience a full class on us before you commit to a membership.' },
    { id: 7, icon: 'wallet', title: 'Affordable Membership', description: 'Transparent, flexible pricing plans with no hidden costs.' },
    { id: 8, icon: 'handshake', title: 'Positive Community', description: 'Join a warm, motivating community that celebrates every milestone with you.' },
  ],
  schedule: [
    { id: 1, day: 'monday', day_display: 'Monday', class_name: 'Hatha Yoga', category: 'yoga', time: '6:00 AM – 7:00 AM', trainer_name: 'Aanya Krishnan', total_seats: 20, available_seats: 6 },
    { id: 2, day: 'monday', day_display: 'Monday', class_name: 'Zumba Fitness', category: 'zumba', time: '6:30 PM – 7:20 PM', trainer_name: 'Rhea Fernandes', total_seats: 25, available_seats: 9 },
    { id: 3, day: 'tuesday', day_display: 'Tuesday', class_name: 'Power Yoga', category: 'yoga', time: '7:00 AM – 8:00 AM', trainer_name: 'Vikram Rao', total_seats: 18, available_seats: 4 },
    { id: 4, day: 'tuesday', day_display: 'Tuesday', class_name: 'Zumba Dance', category: 'zumba', time: '7:00 PM – 7:50 PM', trainer_name: 'Rhea Fernandes', total_seats: 25, available_seats: 11 },
    { id: 5, day: 'wednesday', day_display: 'Wednesday', class_name: 'Vinyasa Flow', category: 'yoga', time: '8:00 AM – 9:00 AM', trainer_name: 'Aanya Krishnan', total_seats: 20, available_seats: 7 },
    { id: 6, day: 'wednesday', day_display: 'Wednesday', class_name: 'Bollywood Fitness', category: 'zumba', time: '8:00 PM – 8:45 PM', trainer_name: 'Karan Malhotra', total_seats: 22, available_seats: 10 },
    { id: 7, day: 'thursday', day_display: 'Thursday', class_name: 'Meditation & Breathwork', category: 'yoga', time: '7:00 PM – 7:45 PM', trainer_name: 'Meera Iyer', total_seats: 15, available_seats: 5 },
    { id: 8, day: 'thursday', day_display: 'Thursday', class_name: 'Cardio Dance', category: 'zumba', time: '6:00 PM – 6:45 PM', trainer_name: 'Karan Malhotra', total_seats: 22, available_seats: 8 },
    { id: 9, day: 'friday', day_display: 'Friday', class_name: 'Hatha Yoga', category: 'yoga', time: '6:00 AM – 7:00 AM', trainer_name: 'Aanya Krishnan', total_seats: 20, available_seats: 9 },
    { id: 10, day: 'friday', day_display: 'Friday', class_name: 'Zumba Fitness', category: 'zumba', time: '6:30 PM – 7:20 PM', trainer_name: 'Rhea Fernandes', total_seats: 25, available_seats: 6 },
    { id: 11, day: 'saturday', day_display: 'Saturday', class_name: 'Beginner Yoga', category: 'yoga', time: '9:00 AM – 9:45 AM', trainer_name: 'Sanya Kapoor', total_seats: 18, available_seats: 12 },
    { id: 12, day: 'saturday', day_display: 'Saturday', class_name: 'Kids Zumba', category: 'zumba', time: '10:00 AM – 10:40 AM', trainer_name: 'Rhea Fernandes', total_seats: 16, available_seats: 5 },
    { id: 13, day: 'sunday', day_display: 'Sunday', class_name: 'Prenatal Yoga', category: 'yoga', time: '10:00 AM – 10:50 AM', trainer_name: 'Sanya Kapoor', total_seats: 12, available_seats: 4 },
    { id: 14, day: 'sunday', day_display: 'Sunday', class_name: 'Evening Fitness', category: 'zumba', time: '5:30 PM – 6:20 PM', trainer_name: 'Vikram Rao', total_seats: 20, available_seats: 13 },
  ],
  gallery: [
    { id: 1, media_type: 'image', category: 'studio', caption: 'Our sun-lit yoga studio', image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop' },
    { id: 2, media_type: 'image', category: 'yoga', caption: 'Morning Hatha flow', image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop' },
    { id: 3, media_type: 'image', category: 'zumba', caption: 'Zumba dance floor energy', image_url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop' },
    { id: 4, media_type: 'image', category: 'yoga', caption: 'Power yoga session', image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop' },
    { id: 5, media_type: 'image', category: 'event', caption: 'Annual Wellness Retreat', image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop' },
    { id: 6, media_type: 'image', category: 'zumba', caption: 'Bollywood fitness class', image_url: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1200&auto=format&fit=crop' },
    { id: 7, media_type: 'image', category: 'studio', caption: 'Meditation lounge', image_url: 'https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=1200&auto=format&fit=crop' },
    { id: 8, media_type: 'image', category: 'yoga', caption: 'Vinyasa flow at sunset', image_url: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=1200&auto=format&fit=crop' },
    { id: 9, media_type: 'image', category: 'event', caption: 'Community wellness day', image_url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop' },
    { id: 10, media_type: 'image', category: 'studio', caption: 'Fully equipped fitness floor', image_url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop' },
  ],
  videoReels: [
    { id: 1, title: 'Sunrise Yoga Flow', video_url: 'https://cdn.coverr.co/videos/coverr-yoga-practice-at-sunrise-2633/1080p.mp4', poster_image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', duration_label: '0:22' },
    { id: 2, title: 'Zumba High Energy', video_url: 'https://cdn.coverr.co/videos/coverr-zumba-dance-class-6349/1080p.mp4', poster_image_url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop', duration_label: '0:18' },
    { id: 3, title: 'Power Stretch Series', video_url: 'https://cdn.coverr.co/videos/coverr-stretching-before-workout-4491/1080p.mp4', poster_image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop', duration_label: '0:25' },
    { id: 4, title: 'Studio Tour', video_url: 'https://cdn.coverr.co/videos/coverr-fitness-studio-interior-8291/1080p.mp4', poster_image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop', duration_label: '0:30' },
  ],
  testimonials: [
    { id: 1, name: "Priya Sundaram", rating: 5, review: "AURELIA completely transformed my relationship with fitness. The trainers are attentive and the studio feels like a second home.", program_joined: "Yoga & Zumba Combo", photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Arjun Mehta", rating: 5, review: "I joined for Power Yoga and within three months my flexibility and strength improved dramatically. Highly recommend!", program_joined: "Power Yoga", photo_url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "Divya Nair", rating: 5, review: "The Zumba sessions are the highlight of my week — so much fun, and I've lost 6kg in two months without it feeling like a chore.", program_joined: "Zumba Fitness", photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
    { id: 4, name: "Rohan Kapoor", rating: 4, review: "Great community, flexible timings and the free trial made it an easy decision to sign up for the annual membership.", program_joined: "Beginner Yoga", photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
    { id: 5, name: "Ananya Rao", rating: 5, review: "As a new mother, the prenatal yoga classes gave me so much comfort and strength through my pregnancy. Forever grateful.", program_joined: "Prenatal Yoga", photo_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop" },
  ],
  membershipPlans: [
    { id: 1, name: "Trial Class", price: "0.00", duration: "1 Class", features: ["1 Free Yoga or Zumba Class", "Meet Our Trainers", "Studio Tour", "No Commitment"], is_highlighted: false, cta_text: "Book Free Trial" },
    { id: 2, name: "Monthly Plan", price: "2999.00", duration: "1 Month", features: ["Unlimited Yoga Classes", "Unlimited Zumba Sessions", "Locker Access", "Free Nutrition Guide"], is_highlighted: false, cta_text: "Join Now" },
    { id: 3, name: "Quarterly Plan", price: "7999.00", duration: "3 Months", features: ["Everything in Monthly", "Priority Booking", "2 Personal Training Sessions", "10% Off Merchandise"], is_highlighted: true, cta_text: "Join Now" },
    { id: 4, name: "Premium Membership", price: "24999.00", duration: "12 Months", features: ["Everything in Quarterly", "Unlimited Personal Training", "Free Guest Passes (4/month)", "Exclusive Wellness Workshops"], is_highlighted: false, cta_text: "Join Now" },
  ],
  cta: {
    title: "Your Wellness Journey Starts Today.",
    subtitle: "Take the first step towards a stronger, calmer, healthier you. Book your free trial class now.",
    background_image_url: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1920&auto=format&fit=crop",
    primary_button_text: "Book Free Trial",
    primary_button_link: "#contact",
  },
};

async function safeGet(path, fallback) {
  try {
    const res = await apiClient.get(path);
    return res.data;
  } catch (error) {
    console.warn(`API ${path} fallback:`, error.message);
    return fallback;
  }
}

export const apiService = {
  getSettings: () => safeGet('/settings/', fallbackData.settings),
  getHero: () => safeGet('/hero/', fallbackData.hero),
  getHeroStats: () => safeGet('/hero-stats/', fallbackData.heroStats),
  getAbout: () => safeGet('/about/', fallbackData.about),
  getTrainers: () => safeGet('/trainers/', fallbackData.trainers),
  getYogaPrograms: () => safeGet('/yoga-programs/', fallbackData.yogaPrograms),
  getFitnessPrograms: () => safeGet('/fitness-programs/', fallbackData.fitnessPrograms),
  getWhyChooseUs: () => safeGet('/why-choose-us/', fallbackData.whyChooseUs),
  getSchedule: () => safeGet('/schedule/', fallbackData.schedule),
  getGallery: () => safeGet('/gallery/', fallbackData.gallery),
  getVideoReels: () => safeGet('/videos/', fallbackData.videoReels),
  getTestimonials: () => safeGet('/testimonials/', fallbackData.testimonials),
  getMembershipPlans: () => safeGet('/membership-plans/', fallbackData.membershipPlans),
  getCTA: () => safeGet('/cta/', fallbackData.cta),

  async submitEnquiry(data) {
    try {
      const response = await apiClient.post('/enquiry/', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw { success: false, message: 'Something went wrong. Please try again or reach out via WhatsApp.' };
    }
  },
};

export default apiService;
