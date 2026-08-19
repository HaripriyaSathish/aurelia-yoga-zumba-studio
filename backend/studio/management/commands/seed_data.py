from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from studio.models import (
    SiteSettings, HeroContent, HeroStat, AboutSection, Trainer,
    YogaProgram, FitnessProgram, WhyChooseFeature, ScheduleSlot,
    GalleryItem, VideoReel, Testimonial, MembershipPlan, CTASection,
)


class Command(BaseCommand):
    help = 'Seeds initial premium content for AURELIA Yoga & Zumba Studio'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Seeding AURELIA Yoga & Zumba Studio database...'))

        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@aureliawellness.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Created superuser: admin (password: admin123)'))
        else:
            self.stdout.write(self.style.WARNING('Superuser "admin" already exists.'))

        # --- Site Settings ---
        settings = SiteSettings.load()
        settings.site_name = "AURELIA Yoga & Zumba Studio"
        settings.tagline = "Move Your Body. Elevate Your Energy."
        settings.phone_number = "+91 98765 43210"
        settings.whatsapp_number = "+91 98765 43210"
        settings.whatsapp_message = "Hi, I am interested in joining your Yoga/Zumba classes. Please share more details."
        settings.email = "hello@aureliawellness.com"
        settings.address = "42 Wellness Avenue, ECR Road, Chennai, Tamil Nadu 600041"
        settings.opening_hours = "Mon – Sat: 5:30 AM – 9:30 PM | Sun: 7:00 AM – 12:00 PM"
        settings.save()

        # --- Hero Content ---
        hero = HeroContent.load()
        hero.headline = "Move Your Body. Elevate Your Energy."
        hero.subtitle = "Premium yoga, energetic Zumba and holistic wellness programs guided by certified experts — designed to transform your mind, body and spirit."
        hero.background_video_url = "https://cdn.coverr.co/videos/coverr-yoga-practice-at-sunrise-2633/1080p.mp4"
        hero.poster_image_url = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop"
        hero.primary_cta_text = "Book a Free Trial"
        hero.primary_cta_link = "#contact"
        hero.secondary_cta_text = "Explore Classes"
        hero.secondary_cta_link = "#yoga-programs"
        hero.save()

        HeroStat.objects.all().delete()
        for icon, label, value, order in [
            ('flower-2', 'Yoga Classes', '25+', 1),
            ('music-4', 'Zumba Sessions', '18+', 2),
            ('award', 'Expert Trainers', '18', 3),
            ('clock', 'Flexible Timings', '7 Days', 4),
        ]:
            HeroStat.objects.create(icon=icon, label=label, value=value, order=order)
        self.stdout.write(self.style.SUCCESS('Hero content & stats seeded.'))

        # --- About Section ---
        about = AboutSection.load()
        about.eyebrow = "OUR STORY"
        about.title = "A Sanctuary for Movement & Mindfulness"
        about.description = (
            "Founded with a passion for holistic wellbeing, AURELIA brings together the ancient discipline of "
            "yoga and the electrifying energy of Zumba under one roof. Our state-of-the-art studio is designed "
            "to help you build strength, flexibility and calm — guided every step of the way by certified, "
            "internationally trained instructors in a warm, welcoming community."
        )
        about.image_1_url = "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop"
        about.image_2_url = "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
        about.image_3_url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop"
        about.years_experience = 12
        about.happy_members = 3200
        about.certified_trainers = 18
        about.success_rate = 98
        about.save()
        self.stdout.write(self.style.SUCCESS('About section seeded.'))

        # --- Trainers ---
        Trainer.objects.all().delete()
        trainers_data = [
            ("Aanya Krishnan", "Founder & Lead Yoga Instructor",
             "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
             "500-hr certified Hatha & Vinyasa teacher with over a decade of experience guiding students toward strength and stillness.",
             12),
            ("Rhea Fernandes", "Zumba & Dance Fitness Lead",
             "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
             "Licensed ZIN instructor bringing Latin rhythms and high-energy choreography to every session.",
             8),
            ("Vikram Rao", "Power Yoga & Strength Coach",
             "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
             "Former athlete specializing in power yoga, mobility and functional strength training.",
             9),
            ("Meera Iyer", "Meditation & Breathwork Guide",
             "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
             "Mindfulness coach helping members find calm through breathwork, pranayama and guided meditation.",
             6),
            ("Karan Malhotra", "Bollywood & Cardio Dance Coach",
             "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=800&auto=format&fit=crop",
             "High-energy choreographer blending Bollywood beats with cardio dance fitness routines.",
             7),
            ("Sanya Kapoor", "Prenatal & Beginner Yoga Specialist",
             "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
             "Gentle, encouraging guidance for prenatal wellness and first-time yoga practitioners.",
             5),
        ]
        trainers = {}
        for name, role, photo_url, bio, exp in trainers_data:
            t = Trainer.objects.create(
                name=name, role=role, photo_url=photo_url, bio=bio, experience_years=exp,
                instagram_url="https://instagram.com/aureliawellness",
            )
            trainers[name] = t
        self.stdout.write(self.style.SUCCESS(f'{len(trainers)} trainers seeded.'))

        # --- Yoga Programs ---
        YogaProgram.objects.all().delete()
        yoga_data = [
            ("Hatha Yoga", "A slow-paced, foundational practice combining postures and breathing to build strength and flexibility.",
             "60 mins", "beginner", "Mon, Wed, Fri — 6:00 AM", 1999,
             "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", "Aanya Krishnan"),
            ("Power Yoga", "A dynamic, fitness-based approach to yoga that builds heat, strength and endurance.",
             "60 mins", "intermediate", "Tue, Thu, Sat — 7:00 AM", 2499,
             "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop", "Vikram Rao"),
            ("Vinyasa Flow", "A flowing, breath-synchronized sequence linking postures for a moving meditation.",
             "60 mins", "intermediate", "Mon, Wed, Fri — 8:00 AM", 2299,
             "https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=1000&auto=format&fit=crop", "Aanya Krishnan"),
            ("Meditation & Breathwork", "Guided pranayama and meditation sessions to calm the mind and reduce stress.",
             "45 mins", "all-levels", "Daily — 7:00 PM", 1499,
             "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop", "Meera Iyer"),
            ("Prenatal Yoga", "A gentle, safe practice designed to support expecting mothers through every trimester.",
             "50 mins", "beginner", "Tue, Thu — 10:00 AM", 1999,
             "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop", "Sanya Kapoor"),
            ("Beginner Yoga", "An approachable introduction to yoga fundamentals, alignment and breathing.",
             "45 mins", "beginner", "Mon to Sat — 9:00 AM", 1699,
             "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=1000&auto=format&fit=crop", "Sanya Kapoor"),
        ]
        for i, (name, desc, dur, level, sched, price, img, trainer_name) in enumerate(yoga_data):
            YogaProgram.objects.create(
                name=name, description=desc, duration=dur, level=level, schedule=sched,
                price=price, image_url=img, trainer=trainers.get(trainer_name), order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'{len(yoga_data)} yoga programs seeded.'))

        # --- Fitness / Zumba Programs ---
        FitnessProgram.objects.all().delete()
        fitness_data = [
            ("Zumba Fitness", "High-energy, dance-based cardio workout set to international beats — burn calories while having fun.",
             "50 mins", "all-levels", "Mon, Wed, Fri — 6:30 PM", 1799,
             "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop", "Rhea Fernandes"),
            ("Zumba Dance", "A choreography-focused Zumba class blending Latin, hip-hop and pop dance styles.",
             "50 mins", "intermediate", "Tue, Thu — 7:00 PM", 1899,
             "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1000&auto=format&fit=crop", "Rhea Fernandes"),
            ("Bollywood Fitness", "A vibrant cardio-dance workout inspired by Bollywood choreography and music.",
             "45 mins", "all-levels", "Mon, Wed — 8:00 PM", 1699,
             "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1000&auto=format&fit=crop", "Karan Malhotra"),
            ("Cardio Dance", "A fast-paced, full-body dance cardio class designed to torch calories and boost stamina.",
             "45 mins", "intermediate", "Tue, Thu, Sat — 6:00 PM", 1799,
             "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop", "Karan Malhotra"),
            ("Kids Zumba", "A fun, safe introduction to dance fitness designed specifically for children aged 6–14.",
             "40 mins", "beginner", "Sat, Sun — 10:00 AM", 1299,
             "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop", "Rhea Fernandes"),
            ("Evening Fitness", "A well-rounded strength and cardio circuit to close out your day with energy to spare.",
             "50 mins", "all-levels", "Mon to Fri — 7:30 PM", 1999,
             "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1000&auto=format&fit=crop", "Vikram Rao"),
        ]
        for i, (name, desc, dur, level, sched, price, img, trainer_name) in enumerate(fitness_data):
            FitnessProgram.objects.create(
                name=name, description=desc, duration=dur, level=level, schedule=sched,
                price=price, image_url=img, trainer=trainers.get(trainer_name), order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'{len(fitness_data)} zumba/fitness programs seeded.'))

        # --- Why Choose Us ---
        WhyChooseFeature.objects.all().delete()
        features = [
            ('badge-check', 'Certified Trainers', 'Every instructor is internationally certified with years of hands-on teaching experience.'),
            ('sparkles', 'Modern Studio', 'A premium, climate-controlled studio equipped with the latest fitness technology.'),
            ('clock', 'Flexible Timings', 'Morning, afternoon and evening slots designed to fit around your schedule.'),
            ('smile', 'Beginner Friendly', 'Structured onboarding and beginner tracks so anyone can start with confidence.'),
            ('target', 'Personalized Guidance', 'Trainers tailor every session to your fitness level and personal goals.'),
            ('gift', 'Free Trial Class', 'Experience a full class on us before you commit to a membership.'),
            ('wallet', 'Affordable Membership', 'Transparent, flexible pricing plans with no hidden costs.'),
            ('handshake', 'Positive Community', 'Join a warm, motivating community that celebrates every milestone with you.'),
        ]
        for i, (icon, title, desc) in enumerate(features):
            WhyChooseFeature.objects.create(icon=icon, title=title, description=desc, order=i)
        self.stdout.write(self.style.SUCCESS(f'{len(features)} "Why Choose Us" features seeded.'))

        # --- Weekly Schedule ---
        ScheduleSlot.objects.all().delete()
        schedule_data = [
            ('monday', 'Hatha Yoga', 'yoga', '6:00 AM – 7:00 AM', 'Aanya Krishnan', 20, 6),
            ('monday', 'Zumba Fitness', 'zumba', '6:30 PM – 7:20 PM', 'Rhea Fernandes', 25, 9),
            ('tuesday', 'Power Yoga', 'yoga', '7:00 AM – 8:00 AM', 'Vikram Rao', 18, 4),
            ('tuesday', 'Zumba Dance', 'zumba', '7:00 PM – 7:50 PM', 'Rhea Fernandes', 25, 11),
            ('wednesday', 'Vinyasa Flow', 'yoga', '8:00 AM – 9:00 AM', 'Aanya Krishnan', 20, 7),
            ('wednesday', 'Bollywood Fitness', 'zumba', '8:00 PM – 8:45 PM', 'Karan Malhotra', 22, 10),
            ('thursday', 'Meditation & Breathwork', 'yoga', '7:00 PM – 7:45 PM', 'Meera Iyer', 15, 5),
            ('thursday', 'Cardio Dance', 'zumba', '6:00 PM – 6:45 PM', 'Karan Malhotra', 22, 8),
            ('friday', 'Hatha Yoga', 'yoga', '6:00 AM – 7:00 AM', 'Aanya Krishnan', 20, 9),
            ('friday', 'Zumba Fitness', 'zumba', '6:30 PM – 7:20 PM', 'Rhea Fernandes', 25, 6),
            ('saturday', 'Beginner Yoga', 'yoga', '9:00 AM – 9:45 AM', 'Sanya Kapoor', 18, 12),
            ('saturday', 'Kids Zumba', 'zumba', '10:00 AM – 10:40 AM', 'Rhea Fernandes', 16, 5),
            ('sunday', 'Prenatal Yoga', 'yoga', '10:00 AM – 10:50 AM', 'Sanya Kapoor', 12, 4),
            ('sunday', 'Evening Fitness', 'zumba', '5:30 PM – 6:20 PM', 'Vikram Rao', 20, 13),
        ]
        for i, (day, cname, cat, time, trainer_name, total, avail) in enumerate(schedule_data):
            ScheduleSlot.objects.create(
                day=day, class_name=cname, category=cat, time=time,
                trainer=trainers.get(trainer_name), total_seats=total, available_seats=avail, order=i,
            )
        self.stdout.write(self.style.SUCCESS(f'{len(schedule_data)} weekly schedule slots seeded.'))

        # --- Gallery ---
        GalleryItem.objects.all().delete()
        gallery_data = [
            ('image', 'studio', 'Our sun-lit yoga studio', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'yoga', 'Morning Hatha flow', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'zumba', 'Zumba dance floor energy', 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'yoga', 'Power yoga session', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'event', 'Annual Wellness Retreat', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'zumba', 'Bollywood fitness class', 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'studio', 'Meditation lounge', 'https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'yoga', 'Vinyasa flow at sunset', 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'event', 'Community wellness day', 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop'),
            ('image', 'studio', 'Fully equipped fitness floor', 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop'),
        ]
        for i, (mtype, cat, caption, url) in enumerate(gallery_data):
            GalleryItem.objects.create(media_type=mtype, category=cat, caption=caption, image_url=url, order=i)
        self.stdout.write(self.style.SUCCESS(f'{len(gallery_data)} gallery items seeded.'))

        # --- Video Reels ---
        VideoReel.objects.all().delete()
        reels_data = [
            ("Sunrise Yoga Flow", "https://cdn.coverr.co/videos/coverr-yoga-practice-at-sunrise-2633/1080p.mp4",
             "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", "0:22"),
            ("Zumba High Energy", "https://cdn.coverr.co/videos/coverr-zumba-dance-class-6349/1080p.mp4",
             "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop", "0:18"),
            ("Power Stretch Series", "https://cdn.coverr.co/videos/coverr-stretching-before-workout-4491/1080p.mp4",
             "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", "0:25"),
            ("Studio Tour", "https://cdn.coverr.co/videos/coverr-fitness-studio-interior-8291/1080p.mp4",
             "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", "0:30"),
        ]
        for i, (title, video_url, poster_url, duration) in enumerate(reels_data):
            VideoReel.objects.create(title=title, video_url=video_url, poster_image_url=poster_url, duration_label=duration, order=i)
        self.stdout.write(self.style.SUCCESS(f'{len(reels_data)} video reels seeded.'))

        # --- Testimonials ---
        Testimonial.objects.all().delete()
        testimonials_data = [
            ("Priya Sundaram", 5, "AURELIA completely transformed my relationship with fitness. The trainers are attentive and the studio feels like a second home.",
             "Yoga & Zumba Combo", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"),
            ("Arjun Mehta", 5, "I joined for the Power Yoga classes and within three months my flexibility and strength improved dramatically. Highly recommend!",
             "Power Yoga", "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"),
            ("Divya Nair", 5, "The Zumba sessions are the highlight of my week — so much fun, and I've lost 6kg in two months without it ever feeling like a chore.",
             "Zumba Fitness", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"),
            ("Rohan Kapoor", 4, "Great community, flexible timings and the free trial made it an easy decision to sign up for the annual membership.",
             "Beginner Yoga", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"),
            ("Ananya Rao", 5, "As a new mother, the prenatal yoga classes gave me so much comfort and strength through my pregnancy. Forever grateful.",
             "Prenatal Yoga", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop"),
        ]
        for i, (name, rating, review, program, photo) in enumerate(testimonials_data):
            Testimonial.objects.create(name=name, rating=rating, review=review, program_joined=program, photo_url=photo, order=i)
        self.stdout.write(self.style.SUCCESS(f'{len(testimonials_data)} testimonials seeded.'))

        # --- Membership Plans ---
        MembershipPlan.objects.all().delete()
        plans_data = [
            ("Trial Class", 0, "1 Class", "1 Free Yoga or Zumba Class\nMeet Our Trainers\nStudio Tour\nNo Commitment", False, "Book Free Trial", 0),
            ("Monthly Plan", 2999, "1 Month", "Unlimited Yoga Classes\nUnlimited Zumba Sessions\nLocker Access\nFree Nutrition Guide", False, "Join Now", 1),
            ("Quarterly Plan", 7999, "3 Months", "Everything in Monthly\nPriority Booking\n2 Personal Training Sessions\n10% Off Merchandise", True, "Join Now", 2),
            ("Premium Membership", 24999, "12 Months", "Everything in Quarterly\nUnlimited Personal Training\nFree Guest Passes (4/month)\nExclusive Wellness Workshops\nComplimentary Merchandise Kit", False, "Join Now", 3),
        ]
        for name, price, duration, features, highlighted, cta, order in plans_data:
            MembershipPlan.objects.create(
                name=name, price=price, duration=duration, features=features,
                is_highlighted=highlighted, cta_text=cta, order=order,
            )
        self.stdout.write(self.style.SUCCESS(f'{len(plans_data)} membership plans seeded.'))

        # --- CTA Section ---
        cta = CTASection.load()
        cta.title = "Your Wellness Journey Starts Today."
        cta.subtitle = "Take the first step towards a stronger, calmer, healthier you. Book your free trial class now."
        cta.background_image_url = "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1920&auto=format&fit=crop"
        cta.primary_button_text = "Book Free Trial"
        cta.primary_button_link = "#contact"
        cta.save()
        self.stdout.write(self.style.SUCCESS('CTA section seeded.'))

        self.stdout.write(self.style.SUCCESS('\nAURELIA Yoga & Zumba Studio database seeding complete!'))
