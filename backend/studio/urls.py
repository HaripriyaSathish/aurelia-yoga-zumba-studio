from django.urls import path
from .views import (
    SiteSettingsView, HeroContentView, HeroStatListView, AboutSectionView,
    TrainerListView, YogaProgramListView, FitnessProgramListView, WhyChooseFeatureListView,
    ScheduleSlotListView, GalleryItemListView, VideoReelListView, TestimonialListView,
    MembershipPlanListView, CTASectionView, EnquiryCreateView,
)

urlpatterns = [
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('hero/', HeroContentView.as_view(), name='hero-content'),
    path('hero-stats/', HeroStatListView.as_view(), name='hero-stats'),
    path('about/', AboutSectionView.as_view(), name='about-section'),
    path('trainers/', TrainerListView.as_view(), name='trainer-list'),
    path('yoga-programs/', YogaProgramListView.as_view(), name='yoga-programs'),
    path('fitness-programs/', FitnessProgramListView.as_view(), name='fitness-programs'),
    path('why-choose-us/', WhyChooseFeatureListView.as_view(), name='why-choose-us'),
    path('schedule/', ScheduleSlotListView.as_view(), name='schedule'),
    path('gallery/', GalleryItemListView.as_view(), name='gallery'),
    path('videos/', VideoReelListView.as_view(), name='video-reels'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonials'),
    path('membership-plans/', MembershipPlanListView.as_view(), name='membership-plans'),
    path('cta/', CTASectionView.as_view(), name='cta-section'),
    path('enquiry/', EnquiryCreateView.as_view(), name='enquiry-create'),
]
