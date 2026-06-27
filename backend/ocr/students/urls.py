from django.urls import path
from .views import signup, login, forgot_password, verify_otp, reset_password
 
urlpatterns = [
    path("signup/",         signup),
    path("login/",          login),
    path("forgot-password/", forgot_password),
    path("verify-otp/",     verify_otp),
    path("reset-password/", reset_password),
]
 