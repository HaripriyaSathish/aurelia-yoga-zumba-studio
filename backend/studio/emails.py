import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


def send_enquiry_emails(enquiry):
    """Sends a notification email to the studio admin and a confirmation email to the customer."""

    admin_subject = f"[AURELIA Enquiry] New message from {enquiry.name}: {enquiry.program_interested}"
    admin_message = f"""
New Enquiry Received — AURELIA Yoga & Zumba Studio
---------------------------------------------------
Date: {enquiry.created_at.strftime('%B %d, %Y at %I:%M %p') if enquiry.created_at else ''}
Name: {enquiry.name}
Email: {enquiry.email}
Phone: {enquiry.phone}
Program Interested In: {enquiry.program_interested}

Message:
{enquiry.message}

---------------------------------------------------
Manage this enquiry in the Django Admin Dashboard.
"""
    try:
        send_mail(
            subject=admin_subject,
            message=admin_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=False,
        )
    except Exception as e:
        logger.warning(f"Admin email notification could not be sent: {e}")

    customer_subject = "Thank you for reaching out to AURELIA Yoga & Zumba Studio"
    customer_message = f"""
Dear {enquiry.name},

Thank you for your interest in AURELIA Yoga & Zumba Studio.

We have received your enquiry regarding: "{enquiry.program_interested}"

Our wellness team will review your request and reach out to you within 24 hours to help you book your
free trial class. If you need immediate assistance, feel free to call or WhatsApp us directly.

With warm regards,
The AURELIA Wellness Team
"""
    try:
        send_mail(
            subject=customer_subject,
            message=customer_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[enquiry.email],
            fail_silently=False,
        )
    except Exception as e:
        logger.warning(f"Customer acknowledgement email could not be sent: {e}")
