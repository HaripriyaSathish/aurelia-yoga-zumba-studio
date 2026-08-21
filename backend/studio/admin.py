from django.contrib import admin
from django.utils.html import format_html
from .models import (
    SiteSettings, HeroContent, HeroStat, AboutSection, Trainer,
    YogaProgram, FitnessProgram, WhyChooseFeature, ScheduleSlot,
    GalleryItem, VideoReel, Testimonial, MembershipPlan, CTASection, Enquiry,
)


def img_preview(url, size=48, radius=6):
    if url:
        return format_html(
            '<img src="{}" style="width:{}px;height:{}px;object-fit:cover;border-radius:{}px;border:1px solid #1FBF8F55;" />',
            url, size, size, radius
        )
    return "—"


class SingletonAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonAdmin):
    list_display = ['site_name', 'phone_number', 'email', 'address']
    fieldsets = (
        ('Branding', {'fields': ('site_name', 'tagline', 'logo', 'logo_url', 'favicon', 'favicon_url')}),
        ('Contact', {'fields': ('phone_number', 'whatsapp_number', 'whatsapp_message', 'email', 'address', 'opening_hours')}),
        ('Google Maps', {'fields': ('google_map_embed_url', 'google_map_direct_url', 'latitude', 'longitude')}),
        ('Social Media Links', {'fields': ('facebook_url', 'instagram_url', 'youtube_url', 'twitter_url')}),
        ('SEO Settings', {'fields': ('seo_title', 'seo_description', 'seo_keywords', 'og_image', 'og_image_url')}),
    )


@admin.register(HeroContent)
class HeroContentAdmin(SingletonAdmin):
    list_display = ['headline', 'primary_cta_text', 'secondary_cta_text', 'preview']
    fieldsets = (
        ('Hero Text', {'fields': ('headline', 'subtitle')}),
        ('Hero Media', {'fields': ('background_video', 'background_video_url', 'poster_image', 'poster_image_url')}),
        ('Call To Actions', {'fields': (
            'primary_cta_text', 'primary_cta_link', 'secondary_cta_text', 'secondary_cta_link'
        )}),
    )

    def preview(self, obj):
        return img_preview(obj.get_poster_url, 64, 8)


@admin.register(HeroStat)
class HeroStatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'icon', 'order', 'is_active']
    list_editable = ['value', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['label']
    ordering = ['order']


@admin.register(AboutSection)
class AboutSectionAdmin(SingletonAdmin):
    list_display = ['title', 'years_experience', 'happy_members', 'certified_trainers', 'success_rate']
    fieldsets = (
        ('Content', {'fields': ('eyebrow', 'title', 'description')}),
        ('Collage Images', {'fields': ('image_1', 'image_1_url', 'image_2', 'image_2_url', 'image_3', 'image_3_url')}),
        ('Stats', {'fields': ('years_experience', 'happy_members', 'certified_trainers', 'success_rate')}),
    )


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'experience_years', 'is_active', 'order', 'thumb']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active', 'role']
    search_fields = ['name', 'role', 'bio']
    fieldsets = (
        ('Profile', {'fields': ('name', 'role', 'bio', 'experience_years', 'photo', 'photo_url')}),
        ('Social Links', {'fields': ('instagram_url', 'facebook_url', 'linkedin_url')}),
        ('Display', {'fields': ('is_active', 'order')}),
    )

    def thumb(self, obj):
        return img_preview(obj.get_photo_url, 44, 22)


@admin.register(YogaProgram)
class YogaProgramAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'duration', 'price', 'trainer', 'is_active', 'order', 'thumb']
    list_editable = ['price', 'order', 'is_active']
    list_filter = ['level', 'is_active', 'trainer']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Program Info', {'fields': ('name', 'slug', 'description', 'level', 'duration', 'schedule', 'trainer')}),
        ('Pricing', {'fields': ('price',)}),
        ('Media', {'fields': ('image', 'image_url')}),
        ('Display', {'fields': ('is_active', 'order')}),
    )

    def thumb(self, obj):
        return img_preview(obj.get_image_url)


@admin.register(FitnessProgram)
class FitnessProgramAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'duration', 'price', 'trainer', 'is_active', 'order', 'thumb']
    list_editable = ['price', 'order', 'is_active']
    list_filter = ['level', 'is_active', 'trainer']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Program Info', {'fields': ('name', 'slug', 'description', 'level', 'duration', 'schedule', 'trainer')}),
        ('Pricing', {'fields': ('price',)}),
        ('Media', {'fields': ('image', 'image_url', 'preview_video', 'preview_video_url')}),
        ('Display', {'fields': ('is_active', 'order')}),
    )

    def thumb(self, obj):
        return img_preview(obj.get_image_url)


@admin.register(WhyChooseFeature)
class WhyChooseFeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    ordering = ['order']


@admin.register(ScheduleSlot)
class ScheduleSlotAdmin(admin.ModelAdmin):
    list_display = ['day', 'class_name', 'category', 'time', 'trainer', 'available_seats', 'total_seats', 'is_active']
    list_editable = ['available_seats', 'is_active']
    list_filter = ['day', 'category', 'is_active', 'trainer']
    search_fields = ['class_name']
    ordering = ['order', 'day']


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['caption', 'media_type', 'category', 'is_active', 'order', 'thumb']
    list_editable = ['order', 'is_active']
    list_filter = ['media_type', 'category', 'is_active']
    search_fields = ['caption']
    fieldsets = (
        ('Details', {'fields': ('caption', 'media_type', 'category')}),
        ('Image', {'fields': ('image', 'image_url')}),
        ('Video', {'fields': ('video', 'video_url', 'thumbnail', 'thumbnail_url')}),
        ('Display', {'fields': ('is_active', 'order')}),
    )

    def thumb(self, obj):
        return img_preview(obj.get_thumbnail_url)


@admin.register(VideoReel)
class VideoReelAdmin(admin.ModelAdmin):
    list_display = ['title', 'duration_label', 'is_active', 'order', 'thumb']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title']

    def thumb(self, obj):
        return img_preview(obj.get_poster_url)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'program_joined', 'rating', 'is_active', 'order', 'thumb']
    list_editable = ['order', 'is_active']
    list_filter = ['rating', 'is_active']
    search_fields = ['name', 'review']

    def thumb(self, obj):
        return img_preview(obj.get_photo_url, 40, 20)


@admin.register(MembershipPlan)
class MembershipPlanAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'duration', 'is_highlighted', 'is_active', 'order']
    list_editable = ['price', 'is_highlighted', 'order', 'is_active']
    list_filter = ['is_highlighted', 'is_active']
    search_fields = ['name']


@admin.register(CTASection)
class CTASectionAdmin(SingletonAdmin):
    list_display = ['title', 'primary_button_text']
    fieldsets = (
        ('Content', {'fields': ('title', 'subtitle', 'primary_button_text', 'primary_button_link')}),
        ('Media', {'fields': ('background_image', 'background_image_url', 'background_video', 'background_video_url')}),
    )


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'program_interested', 'created_at', 'status_badge']
    list_filter = ['is_read', 'program_interested', 'created_at']
    search_fields = ['name', 'email', 'phone', 'message']
    readonly_fields = ['name', 'email', 'phone', 'program_interested', 'message', 'created_at']
    actions = ['mark_as_read', 'mark_as_unread']

    def status_badge(self, obj):
        if obj.is_read:
            return format_html('<span style="background:#22c55e;color:#fff;padding:3px 8px;border-radius:12px;font-size:11px;">Read</span>')
        return format_html('<span style="background:#1FBF8F;color:#fff;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:bold;">NEW</span>')
    status_badge.short_description = "Status"

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected enquiries as Read"

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Mark selected enquiries as Unread"
