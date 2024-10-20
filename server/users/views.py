from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    re_password = request.data.get("re_password")

    if password != re_password:
        return Response(
            {"message": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects.filter(username=username).exists():
        return Response({"message": "user exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response(
        {"message": "Registration successful"}, status=status.HTTP_201_CREATED
    )


@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"message": "Login success"}, status=status.HTTP_200_OK)
    else:
        return JsonResponse(
            {"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


@csrf_protect
@api_view(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logout successful"}, status=status.HTTP_200_OK)
