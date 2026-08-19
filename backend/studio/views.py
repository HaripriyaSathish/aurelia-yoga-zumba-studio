from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    SiteSettings, HeroContent, HeroStat, AboutSection, Trainer,
    YogaProgram, FitnessProgram, WhyChooseFeature, ScheduleSlot,
    GalleryItem, VideoReel, Testimonial, MembershipPlan, CTASection,
)
from .serializers import (
    SiteSettingsSerializer, HeroContentSerializer, HeroStatSerializer, AboutSectionSerializer,
    TrainerSerializer, YogaProgramSerializer, FitnessProgramSerializer, WhyChooseFeatureSerializer,
    ScheduleSlotSerializer, GalleryItemSerializer, VideoReelSerializer, TestimonialSerializer,
    MembershipPlanSerializer, CTASectionSerializer, EnquirySerializer,
)
from .emails import send_enquiry_emails


class SiteSettingsView(APIView):
    def get(self, request):
        obj = SiteSettings.load()
        return Response(SiteSettingsSerializer(obj).data)


class HeroContentView(APIView):
    def get(self, request):
        obj = HeroContent.load()
        return Response(HeroContentSerializer(obj).data)


class HeroStatListView(generics.ListAPIView):
    queryset = HeroStat.objects.filter(is_active=True)
    serializer_class = HeroStatSerializer


class AboutSectionView(APIView):
    def get(self, request):
        obj = AboutSection.load()
        return Response(AboutSectionSerializer(obj).data)


class TrainerListView(generics.ListAPIView):
    queryset = Trainer.objects.filter(is_active=True)
    serializer_class = TrainerSerializer


class YogaProgramListView(generics.ListAPIView):
    queryset = YogaProgram.objects.filter(is_active=True).select_related('trainer')
    serializer_class = YogaProgramSerializer


class FitnessProgramListView(generics.ListAPIView):
    queryset = FitnessProgram.objects.filter(is_active=True).select_related('trainer')
    serializer_class = FitnessProgramSerializer


class WhyChooseFeatureListView(generics.ListAPIView):
    queryset = WhyChooseFeature.objects.filter(is_active=True)
    serializer_class = WhyChooseFeatureSerializer


class ScheduleSlotListView(generics.ListAPIView):
    queryset = ScheduleSlot.objects.filter(is_active=True).select_related('trainer')
    serializer_class = ScheduleSlotSerializer


class GalleryItemListView(generics.ListAPIView):
    serializer_class = GalleryItemSerializer

    def get_queryset(self):
        qs = GalleryItem.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs


class VideoReelListView(generics.ListAPIView):
    queryset = VideoReel.objects.filter(is_active=True)
    serializer_class = VideoReelSerializer


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer


class MembershipPlanListView(generics.ListAPIView):
    queryset = MembershipPlan.objects.filter(is_active=True)
    serializer_class = MembershipPlanSerializer


class CTASectionView(APIView):
    def get(self, request):
        obj = CTASection.load()
        return Response(CTASectionSerializer(obj).data)


class EnquiryCreateView(APIView):
    def post(self, request):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            enquiry = serializer.save()
            send_enquiry_emails(enquiry)
            return Response(
                {
                    "success": True,
                    "message": "Thank you for reaching out to AURELIA. Our team will connect with you shortly to confirm your free trial.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )
