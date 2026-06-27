from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SignupSerializer
from .models import Student
from django.core.mail import send_mail
from django.conf import settings
import random
import time

# In-memory OTP store: { email: { otp, expires_at } }
# For production use Django cache or a DB model instead
otp_store = {}

# ─── Signup ───
@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Signup Successful"})
    return Response(serializer.errors, status=400)

# ─── Login ───
@api_view(["POST"])
def login(request):
    email    = request.data.get("email")
    password = request.data.get("password")
    try:
        Student.objects.get(email=email, password=password)
        return Response({"success": True})
    except Student.DoesNotExist:
        return Response({"success": False})

# ─── Forgot Password: send OTP ───
@api_view(["POST"])
def forgot_password(request):
    email = request.data.get("email")

    if not email:
        return Response({"success": False, "message": "Email is required."}, status=400)

    # Check student exists
    try:
        Student.objects.get(email=email)
    except Student.DoesNotExist:
        return Response({"success": False, "message": "No account found with this email."}, status=404)

    # Generate 5-digit OTP
    otp_code = str(random.randint(10000, 99999))

    # Store OTP with 10-minute expiry
    otp_store[email] = {
        "otp": otp_code,
        "expires_at": time.time() + 600   # 10 minutes
    }

    # Send email
    try:
        send_mail(
            subject="OCRCheck — Password Reset Code",
            message=(
                f"Your password reset code is: {otp_code}\n\n"
                f"This code expires in 10 minutes.\n\n"
                f"If you did not request this, please ignore this email."
            ),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
    except Exception as e:
        return Response({"success": False, "message": f"Failed to send email: {str(e)}"}, status=500)

    return Response({"success": True, "message": "OTP sent successfully."})

# ─── Verify OTP ───
@api_view(["POST"])
def verify_otp(request):
    email = request.data.get("email")
    otp   = request.data.get("otp")

    if not email or not otp:
        return Response({"success": False, "message": "Email and OTP are required."}, status=400)

    record = otp_store.get(email)

    if not record:
        return Response({"success": False, "message": "No OTP found. Please request a new one."}, status=400)

    # Check expiry
    if time.time() > record["expires_at"]:
        del otp_store[email]
        return Response({"success": False, "message": "OTP has expired. Please request a new one."}, status=400)

    # Check OTP value
    if record["otp"] != str(otp):
        return Response({"success": False, "message": "Invalid OTP."}, status=400)

    # OTP valid — mark as verified (extend expiry for reset step)
    otp_store[email]["verified"] = True

    return Response({"success": True, "message": "OTP verified."})

# ─── Reset Password ───
@api_view(["POST"])
def reset_password(request):
    email    = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"success": False, "message": "Email and password are required."}, status=400)

    record = otp_store.get(email)

    # Must have gone through OTP verification
    if not record or not record.get("verified"):
        return Response({"success": False, "message": "OTP not verified."}, status=403)

    # Check not expired (still within 10-min window)
    if time.time() > record["expires_at"]:
        del otp_store[email]
        return Response({"success": False, "message": "Session expired. Please start again."}, status=400)

    try:
        student = Student.objects.get(email=email)
        student.password = password
        student.save()
        # Clean up OTP record
        del otp_store[email]
        return Response({"success": True, "message": "Password updated successfully."})
    except Student.DoesNotExist:
        return Response({"success": False, "message": "Student not found."}, status=404)