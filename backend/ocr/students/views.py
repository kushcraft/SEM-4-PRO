from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SignupSerializer

@api_view(["POST"])
def signup(request):

    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Signup Successful"})

    return Response(serializer.errors,status=400)
from .models import Student

@api_view(["POST"])
def login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:

        Student.objects.get(
            email=email,
            password=password
        )

        return Response({
            "success": True
        })

    except Student.DoesNotExist:

        return Response({
            "success": False
        })