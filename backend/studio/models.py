from django.db import models
from django.utils.text import slugify


class SingletonModel(models.Model):
    """Base class for models that should only ever have a single row."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class SiteSettings(SingletonModel):
    """Global, admin-editable website settings: branding, contact, social, map & SEO."""

    # Branding
    site_name = models.CharField(max_length=120, default="AURELIA Yoga & Zumba Studio")
    tagline = models.CharField(max_length=220, default="Move Your Body. Elevate Your Energy.")
    logo = models.ImageField(upload_to='branding/', blank=True, null=True)
    logo_url = models.URLField(max_length=500, blank=True)
    favicon = models.ImageField(upload_to='branding/', blank=True, null=True)
    favicon_url = models.URLField(max_length=500, blank=True)

    # Contact
    phone_number = models.CharField(max_length=40, default="+91 98765 43210")
    whatsapp_number = models.CharField(max_length=40, default="+91 98765 43210")
    whatsapp_message = models.TextField(
        default="Hi, I am interested in joining your Yoga/Zumba classes. Please share more details."
    )
    email = models.EmailField(default="hello@aureliawellness.com")
    address = models.CharField(max_length=255, default="42 Wellness Avenue, ECR Road, Chennai, Tamil Nadu, India")
    opening_hours = models.CharField(max_length=255, default="Mon – Sat: 5:30 AM – 9:30 PM | Sun: 7:00 AM – 12:00 PM")

    # Map
    google_map_embed_url = models.TextField(
        default="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.589139886364!2d80.2452!3d13.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266497f1f9e53%3A0x6b4f7b21e8d6411!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
    )
    google_map_direct_url = models.URLField(max_length=500, default="https://maps.google.com/?q=Chennai+Tamil+Nadu")
    latitude = models.DecimalField(max_digits=10, decimal_places=6, default=13.0475)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, default=80.2452)

    # Social
    facebook_url = models.URLField(default="https://facebook.com/aureliawellness", blank=True)
    instagram_url = models.URLField(default="https://instagram.com/aureliawellness", blank=True)
    youtube_url = models.URLField(default="https://youtube.com/@aureliawellness", blank=True)
    twitter_url = models.URLField(blank=True)

    # SEO
    seo_title = models.CharField(max_length=200, default="AURELIA — Premium Yoga & Zumba Studio in Chennai")
    seo_description = models.TextField(
        default="Join AURELIA Yoga & Zumba Studio for premium yoga, Zumba dance fitness, certified trainers, flexible timings and a free trial class."
    )
    seo_keywords = models.CharField(
        max_length=400,
        default="yoga studio, zumba classes, fitness centre, wellness studio, yoga near me, zumba near me"
    )
    og_image = models.ImageField(upload_to='branding/', blank=True, null=True)
    og_image_url = models.URLField(max_length=500, blank=True)

    class Meta:
        verbose_name = 'Website Settings'
        verbose_name_plural = 'Website Settings'

    @property
    def get_logo_url(self):
        return self.logo.url if self.logo else (self.logo_url or '')

    @property
    def get_favicon_url(self):
        return self.favicon.url if self.favicon else (self.favicon_url or '')

    @property
    def get_og_image_url(self):
        return self.og_image.url if self.og_image else (self.og_image_url or '')

    def __str__(self):
        return self.site_name


class HeroContent(SingletonModel):
    headline = models.CharField(max_length=200, default="Move Your Body. Elevate Your Energy.")
    subtitle = models.TextField(
        default="Premium yoga, energetic Zumba and holistic wellness programs designed by certified experts to transform your mind, body and spirit."
    )
    background_video = models.FileField(upload_to='hero/videos/', blank=True, null=True)
    background_video_url = models.URLField(
        max_length=500,
        blank=True,
        default="https://cdn.coverr.co/videos/coverr-yoga-practice-at-sunrise-2633/1080p.mp4",
    )
    poster_image = models.ImageField(upload_to='hero/', blank=True, null=True)
    poster_image_url = models.URLField(
        max_length=500,
        blank=True,
        default="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop",
    )
    primary_cta_text = models.CharField(max_length=60, default="Book a Free Trial")
    primary_cta_link = models.CharField(max_length=120, default="#contact")
    secondary_cta_text = models.CharField(max_length=60, default="Explore Classes")
    secondary_cta_link = models.CharField(max_length=120, default="#yoga-programs")

    class Meta:
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Section'

    @property
    def get_video_url(self):
        return self.background_video.url if self.background_video else (self.background_video_url or '')

    @property
    def get_poster_url(self):
        return self.poster_image.url if self.poster_image else (self.poster_image_url or '')

    def __str__(self):
        return self.headline


ICON_CHOICES = [
    ('heart-pulse', 'Heart Pulse'), ('flower-2', 'Flower'), ('users', 'Users'),
    ('clock', 'Clock'), ('award', 'Award'), ('smile', 'Smile'),
    ('sparkles', 'Sparkles'), ('shield-check', 'Shield Check'), ('dumbbell', 'Dumbbell'),
    ('music-4', 'Music'), ('sun', 'Sun'), ('leaf', 'Leaf'), ('trophy', 'Trophy'),
    ('badge-check', 'Badge Check'), ('calendar-check', 'Calendar Check'), ('gem', 'Gem'),
    ('target', 'Target'), ('wallet', 'Wallet'), ('handshake', 'Handshake'), ('gift', 'Gift'),
    ('activity', 'Activity'), ('play-circle', 'Play Circle'),
]


class HeroStat(models.Model):
    """Floating glass stat cards shown in the hero section."""
    icon = models.CharField(max_length=40, choices=ICON_CHOICES, default='heart-pulse')
    label = models.CharField(max_length=80, default="Yoga Classes")
    value = models.CharField(max_length=20, default="25+")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Hero Stat Card'
        verbose_name_plural = 'Hero Stat Cards'
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.value} {self.label}"


class AboutSection(SingletonModel):
    eyebrow = models.CharField(max_length=80, default="OUR STORY")
    title = models.CharField(max_length=200, default="A Sanctuary for Movement & Mindfulness")
    description = models.TextField(
        default=(
            "Founded with a passion for holistic wellbeing, AURELIA brings together the ancient discipline of "
            "yoga and the electrifying energy of Zumba under one roof. Our state-of-the-art studio is designed "
            "to help you build strength, flexibility and calm — guided every step of the way by certified, "
            "internationally trained instructors in a warm, welcoming community."
        )
    )
    image_1 = models.ImageField(upload_to='about/', blank=True, null=True)
    image_1_url = models.URLField(
        max_length=500, blank=True,
        default="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop",
    )
    image_2 = models.ImageField(upload_to='about/', blank=True, null=True)
    image_2_url = models.URLField(
        max_length=500, blank=True,
        default="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    )
    image_3 = models.ImageField(upload_to='about/', blank=True, null=True)
    image_3_url = models.URLField(
        max_length=500, blank=True,
        default="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    )
    years_experience = models.PositiveIntegerField(default=12)
    happy_members = models.PositiveIntegerField(default=3200)
    certified_trainers = models.PositiveIntegerField(default=18)
    success_rate = models.PositiveIntegerField(default=98, help_text="Positive results, shown as a percentage")

    class Meta:
        verbose_name = 'About Section'
        verbose_name_plural = 'About Section'

    @property
    def get_image_1_url(self):
        return self.image_1.url if self.image_1 else (self.image_1_url or '')

    @property
    def get_image_2_url(self):
        return self.image_2.url if self.image_2 else (self.image_2_url or '')

    @property
    def get_image_3_url(self):
        return self.image_3.url if self.image_3 else (self.image_3_url or '')

    def __str__(self):
        return self.title


LEVEL_CHOICES = [
    ('beginner', 'Beginner'), ('intermediate', 'Intermediate'),
    ('advanced', 'Advanced'), ('all-levels', 'All Levels'),
]


class Trainer(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=150, default="Yoga & Wellness Instructor")
    photo = models.ImageField(upload_to='trainers/', blank=True, null=True)
    photo_url = models.URLField(max_length=500, blank=True)
    bio = models.TextField(blank=True)
    experience_years = models.PositiveIntegerField(default=5)
    instagram_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Trainer'
        verbose_name_plural = 'Trainers'
        ordering = ['order', 'name']

    @property
    def get_photo_url(self):
        return self.photo.url if self.photo else (self.photo_url or '')

    def __str__(self):
        return f"{self.name} ({self.role})"


class YogaProgram(models.Model):
    name = models.CharField(max_length=150, default="Hatha Yoga")
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    image = models.ImageField(upload_to='programs/yoga/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=60, default="60 mins")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='all-levels')
    schedule = models.CharField(max_length=150, default="Mon, Wed, Fri — 6:00 AM")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=1999)
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, blank=True, related_name='yoga_programs')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Yoga Program'
        verbose_name_plural = 'Yoga Programs'
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            i = 1
            while YogaProgram.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                i += 1
                slug = f"{base_slug}-{i}"
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def get_image_url(self):
        return self.image.url if self.image else (self.image_url or '')

    @property
    def trainer_name(self):
        return self.trainer.name if self.trainer else ''

    def __str__(self):
        return self.name


class FitnessProgram(models.Model):
    """Zumba & fitness programs."""
    name = models.CharField(max_length=150, default="Zumba Fitness")
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    image = models.ImageField(upload_to='programs/fitness/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True)
    preview_video = models.FileField(upload_to='programs/fitness/videos/', blank=True, null=True)
    preview_video_url = models.URLField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=60, default="45 mins")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='all-levels')
    schedule = models.CharField(max_length=150, default="Tue, Thu, Sat — 7:00 PM")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=1799)
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, blank=True, related_name='fitness_programs')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Zumba / Fitness Program'
        verbose_name_plural = 'Zumba / Fitness Programs'
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            i = 1
            while FitnessProgram.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                i += 1
                slug = f"{base_slug}-{i}"
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def get_image_url(self):
        return self.image.url if self.image else (self.image_url or '')

    @property
    def get_video_url(self):
        return self.preview_video.url if self.preview_video else (self.preview_video_url or '')

    @property
    def trainer_name(self):
        return self.trainer.name if self.trainer else ''

    def __str__(self):
        return self.name


class WhyChooseFeature(models.Model):
    icon = models.CharField(max_length=40, choices=ICON_CHOICES, default='award')
    title = models.CharField(max_length=120, default="Certified Trainers")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Why Choose Us Feature'
        verbose_name_plural = 'Why Choose Us Features'
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


DAY_CHOICES = [
    ('monday', 'Monday'), ('tuesday', 'Tuesday'), ('wednesday', 'Wednesday'),
    ('thursday', 'Thursday'), ('friday', 'Friday'), ('saturday', 'Saturday'), ('sunday', 'Sunday'),
]

CATEGORY_CHOICES = [('yoga', 'Yoga'), ('zumba', 'Zumba / Fitness'), ('other', 'Other')]


class ScheduleSlot(models.Model):
    day = models.CharField(max_length=12, choices=DAY_CHOICES, default='monday')
    class_name = models.CharField(max_length=150, default="Hatha Yoga")
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='yoga')
    time = models.CharField(max_length=60, default="6:00 AM – 7:00 AM")
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, blank=True, related_name='schedule_slots')
    total_seats = models.PositiveIntegerField(default=20)
    available_seats = models.PositiveIntegerField(default=8)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Weekly Schedule Slot'
        verbose_name_plural = 'Weekly Schedule'
        ordering = ['order', 'day', 'id']

    @property
    def trainer_name(self):
        return self.trainer.name if self.trainer else 'TBA'

    def __str__(self):
        return f"{self.get_day_display()} — {self.class_name} ({self.time})"


GALLERY_TYPE_CHOICES = [('image', 'Image'), ('video', 'Video')]
GALLERY_CATEGORY_CHOICES = [
    ('studio', 'Studio'), ('yoga', 'Yoga Session'), ('zumba', 'Zumba Session'), ('event', 'Event'),
]


class GalleryItem(models.Model):
    media_type = models.CharField(max_length=10, choices=GALLERY_TYPE_CHOICES, default='image')
    category = models.CharField(max_length=20, choices=GALLERY_CATEGORY_CHOICES, default='studio')
    caption = models.CharField(max_length=180, blank=True)
    image = models.ImageField(upload_to='gallery/images/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True)
    video = models.FileField(upload_to='gallery/videos/', blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True)
    thumbnail = models.ImageField(upload_to='gallery/thumbs/', blank=True, null=True)
    thumbnail_url = models.URLField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Gallery Item'
        verbose_name_plural = 'Studio Gallery'
        ordering = ['order', '-created_at']

    @property
    def get_image_url(self):
        return self.image.url if self.image else (self.image_url or '')

    @property
    def get_video_url(self):
        return self.video.url if self.video else (self.video_url or '')

    @property
    def get_thumbnail_url(self):
        if self.thumbnail:
            return self.thumbnail.url
        if self.thumbnail_url:
            return self.thumbnail_url
        return self.get_image_url

    def __str__(self):
        return self.caption or f"Gallery {self.media_type} #{self.pk}"


class VideoReel(models.Model):
    """Short 10-30 second preview / reel videos."""
    title = models.CharField(max_length=150, default="Morning Flow")
    video = models.FileField(upload_to='reels/', blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True)
    poster_image = models.ImageField(upload_to='reels/posters/', blank=True, null=True)
    poster_image_url = models.URLField(max_length=500, blank=True)
    duration_label = models.CharField(max_length=20, default="0:20")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Short Video Reel'
        verbose_name_plural = 'Short Video Reels'
        ordering = ['order', 'id']

    @property
    def get_video_url(self):
        return self.video.url if self.video else (self.video_url or '')

    @property
    def get_poster_url(self):
        return self.poster_image.url if self.poster_image else (self.poster_image_url or '')

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    name = models.CharField(max_length=120)
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    photo_url = models.URLField(max_length=500, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    review = models.TextField()
    program_joined = models.CharField(max_length=150, blank=True, default="Yoga & Zumba Combo")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
        ordering = ['order', '-created_at']

    @property
    def get_photo_url(self):
        return self.photo.url if self.photo else (self.photo_url or '')

    def __str__(self):
        return f"{self.name} ({self.rating}★)"


class MembershipPlan(models.Model):
    name = models.CharField(max_length=120, default="Monthly Plan")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=2999)
    duration = models.CharField(max_length=60, default="1 Month")
    features = models.TextField(
        default="Unlimited Yoga Classes\nUnlimited Zumba Sessions\nLocker Access\nFree Nutrition Guide",
        help_text="One feature per line."
    )
    is_highlighted = models.BooleanField(default=False, help_text="Mark as the Popular / Recommended plan")
    cta_text = models.CharField(max_length=60, default="Join Now")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Membership Plan'
        verbose_name_plural = 'Membership Plans'
        ordering = ['order', 'price']

    @property
    def feature_list(self):
        return [f.strip() for f in self.features.splitlines() if f.strip()]

    def __str__(self):
        return f"{self.name} — ₹{self.price}"


class CTASection(SingletonModel):
    title = models.CharField(max_length=200, default="Your Wellness Journey Starts Today.")
    subtitle = models.TextField(
        default="Take the first step towards a stronger, calmer, healthier you. Book your free trial class now."
    )
    background_image = models.ImageField(upload_to='cta/', blank=True, null=True)
    background_image_url = models.URLField(
        max_length=500, blank=True,
        default="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1920&auto=format&fit=crop",
    )
    background_video = models.FileField(upload_to='cta/videos/', blank=True, null=True)
    background_video_url = models.URLField(max_length=500, blank=True)
    primary_button_text = models.CharField(max_length=60, default="Book Free Trial")
    primary_button_link = models.CharField(max_length=120, default="#contact")

    class Meta:
        verbose_name = 'Call To Action Section'
        verbose_name_plural = 'Call To Action Section'

    @property
    def get_background_image_url(self):
        return self.background_image.url if self.background_image else (self.background_image_url or '')

    @property
    def get_background_video_url(self):
        return self.background_video.url if self.background_video else (self.background_video_url or '')

    def __str__(self):
        return self.title


class Enquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    program_interested = models.CharField(max_length=150, blank=True, default="General Enquiry")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Enquiry'
        verbose_name_plural = 'Enquiries'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.program_interested} ({self.created_at.strftime('%d %b %Y')})"
