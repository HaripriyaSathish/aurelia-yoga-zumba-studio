from rest_framework import serializers
from .models import (
    SiteSettings, HeroContent, HeroStat, AboutSection, Trainer,
    YogaProgram, FitnessProgram, WhyChooseFeature, ScheduleSlot,
    GalleryItem, VideoReel, Testimonial, MembershipPlan, CTASection, Enquiry,
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.CharField(source='get_logo_url', read_only=True)
    favicon_url = serializers.CharField(source='get_favicon_url', read_only=True)
    og_image_url = serializers.CharField(source='get_og_image_url', read_only=True)

    class Meta:
        model = SiteSettings
        fields = [
            'site_name', 'tagline', 'logo_url', 'favicon_url',
            'phone_number', 'whatsapp_number', 'whatsapp_message', 'email',
            'address', 'opening_hours',
            'google_map_embed_url', 'google_map_direct_url', 'latitude', 'longitude',
            'facebook_url', 'instagram_url', 'youtube_url', 'twitter_url',
            'seo_title', 'seo_description', 'seo_keywords', 'og_image_url',
        ]


class HeroContentSerializer(serializers.ModelSerializer):
    background_video_url = serializers.CharField(source='get_video_url', read_only=True)
    poster_image_url = serializers.CharField(source='get_poster_url', read_only=True)

    class Meta:
        model = HeroContent
        fields = [
            'headline', 'subtitle', 'background_video_url', 'poster_image_url',
            'primary_cta_text', 'primary_cta_link', 'secondary_cta_text', 'secondary_cta_link',
        ]


class HeroStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroStat
        fields = ['id', 'icon', 'label', 'value', 'order']


class TrainerSerializer(serializers.ModelSerializer):
    photo_url = serializers.CharField(source='get_photo_url', read_only=True)

    class Meta:
        model = Trainer
        fields = [
            'id', 'name', 'role', 'photo_url', 'bio', 'experience_years',
            'instagram_url', 'facebook_url', 'linkedin_url', 'order',
        ]


class AboutSectionSerializer(serializers.ModelSerializer):
    image_1_url = serializers.CharField(source='get_image_1_url', read_only=True)
    image_2_url = serializers.CharField(source='get_image_2_url', read_only=True)
    image_3_url = serializers.CharField(source='get_image_3_url', read_only=True)

    class Meta:
        model = AboutSection
        fields = [
            'eyebrow', 'title', 'description', 'image_1_url', 'image_2_url', 'image_3_url',
            'years_experience', 'happy_members', 'certified_trainers', 'success_rate',
        ]


class YogaProgramSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)
    trainer_name = serializers.CharField(read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = YogaProgram
        fields = [
            'id', 'name', 'slug', 'image_url', 'description', 'duration', 'level',
            'level_display', 'schedule', 'price', 'trainer_name',
        ]


class FitnessProgramSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)
    video_url = serializers.CharField(source='get_video_url', read_only=True)
    trainer_name = serializers.CharField(read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = FitnessProgram
        fields = [
            'id', 'name', 'slug', 'image_url', 'video_url', 'description', 'duration', 'level',
            'level_display', 'schedule', 'price', 'trainer_name',
        ]


class WhyChooseFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseFeature
        fields = ['id', 'icon', 'title', 'description', 'order']


class ScheduleSlotSerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(source='get_day_display', read_only=True)
    trainer_name = serializers.CharField(read_only=True)

    class Meta:
        model = ScheduleSlot
        fields = [
            'id', 'day', 'day_display', 'class_name', 'category', 'time',
            'trainer_name', 'total_seats', 'available_seats',
        ]


class GalleryItemSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)
    video_url = serializers.CharField(source='get_video_url', read_only=True)
    thumbnail_url = serializers.CharField(source='get_thumbnail_url', read_only=True)

    class Meta:
        model = GalleryItem
        fields = [
            'id', 'media_type', 'category', 'caption', 'image_url', 'video_url', 'thumbnail_url',
        ]


class VideoReelSerializer(serializers.ModelSerializer):
    video_url = serializers.CharField(source='get_video_url', read_only=True)
    poster_image_url = serializers.CharField(source='get_poster_url', read_only=True)

    class Meta:
        model = VideoReel
        fields = ['id', 'title', 'video_url', 'poster_image_url', 'duration_label']


class TestimonialSerializer(serializers.ModelSerializer):
    photo_url = serializers.CharField(source='get_photo_url', read_only=True)

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'photo_url', 'rating', 'review', 'program_joined']


class MembershipPlanSerializer(serializers.ModelSerializer):
    features = serializers.ListField(source='feature_list', read_only=True, child=serializers.CharField())

    class Meta:
        model = MembershipPlan
        fields = ['id', 'name', 'price', 'duration', 'features', 'is_highlighted', 'cta_text']


class CTASectionSerializer(serializers.ModelSerializer):
    background_image_url = serializers.CharField(source='get_background_image_url', read_only=True)
    background_video_url = serializers.CharField(source='get_background_video_url', read_only=True)

    class Meta:
        model = CTASection
        fields = [
            'title', 'subtitle', 'background_image_url', 'background_video_url',
            'primary_button_text', 'primary_button_link',
        ]


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['id', 'name', 'email', 'phone', 'program_interested', 'message', 'created_at']
        read_only_fields = ['created_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Please provide your name.")
        return value.strip()

    def validate_phone(self, value):
        if not value.strip():
            raise serializers.ValidationError("Please provide your phone number.")
        return value.strip()

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Please enter your message.")
        return value.strip()
