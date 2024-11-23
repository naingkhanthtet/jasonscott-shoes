from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from shop.models import Cart, Favorite, Shoe


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"csrfToken": get_token(request)})


@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")
    re_password = request.data.get("re_password")

    if password != re_password:
        return Response(
            {"message": "Passwords do not match"}, status=status.HTTP_400_BADE_RQUEST
        )
    if User.objects.filter(username=username).exists():
        return Response({"message": "user exists"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response(
            {"message": "user with this email already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(email=email, username=username, password=password)
    # Sync data after registration if cookies data is available
    if request.data.get("favorites") or request.data.get("cart"):
        request.user = user
        # Call sync function with the cookie data
        sync_user_data(request)
    return Response(
        {"message": "Registration successful"}, status=status.HTTP_201_CREATED
    )


@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    # clear existing session data
    if request.user.is_authenticated:
        request.session.flush()

    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        csrf_token = get_token(request)

        if request.data.get("favorites") or request.data.get("cart"):
            request.user = user
            # Call sync function with the cookie data
            sync_user_data(request)
        response = JsonResponse({"message": "Login success"}, status=status.HTTP_200_OK)
        response.set_cookie("csrftoken", csrf_token, httponly=True, samesite="Lax")
        return response
    else:
        return JsonResponse(
            {"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


@csrf_protect
@api_view(["GET"])
def logout_view(request):
    if request.user.is_authenticated:
        # request.user.auth_token.delete()
        request.session.flush()
        logout(request)
        response = JsonResponse(
            {"message": "Logout successful"}, status=status.HTTP_200_OK
        )
        response.delete_cookie("sessionid", samesite="Lax")
        response.delete_cookie("csrftoken", samesite="Lax")
        return response
    return JsonResponse(
        {"message": "Not logged in"}, status=status.HTTP_400_BAD_REQUEST
    )


@csrf_protect
@api_view(["GET"])
def get_user(request):
    return JsonResponse(
        {
            "username": request.user.username if request.user.is_authenticated else "",
            "userid": request.user.id if request.user.is_authenticated else "",
            "isAuthenticated": request.user.is_authenticated,
        }
    )


@csrf_protect
@api_view(["POST"])
def sync_user_data(request):
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"message": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )

    # Get favorites and cart data from request
    favorites_data = request.data.get("favorites", [])
    cart_data = request.data.get("cart", [])

    # Sync favorites
    favorite_ids = [item["id"] for item in favorites_data]
    existing_favorites = set(
        Favorite.objects.filter(user=user, shoe_id__in=favorite_ids).values_list(
            "shoe_id", flat=True
        )
    )

    for shoe_id in favorite_ids:
        if shoe_id not in existing_favorites:
            Favorite.objects.create(user=user, shoe_id=shoe_id)

    Favorite.objects.filter(user=user).exclude(shoe_id__in=favorite_ids).delete()

    # Sync cart items
    cart_item_dict = {item.shoe_id: item for item in Cart.objects.filter(user=user)}

    for item in cart_data:
        shoe_id = item["id"]
        quantity = item.get("quantity", 1)

        if shoe_id in cart_item_dict:
            cart_item = cart_item_dict[shoe_id]
            if cart_item.quantity != quantity:
                cart_item.quantity = quantity
                cart_item.save()
        else:
            Cart.objects.create(user=user, shoe_id=shoe_id, quantity=quantity)

    Cart.objects.filter(user=user).exclude(
        shoe_id__in=[item["id"] for item in cart_data]
    ).delete()

    # Get full URLs for images
    def get_full_image_url(image_path):
        return request.build_absolute_uri(settings.MEDIA_URL + image_path)

    # Fetch shoe details and ensure image URLs are complete
    favorite_shoes = Shoe.objects.filter(id__in=favorite_ids).values(
        "id", "name", "price", "image"
    )
    favorite_shoes = [
        {**shoe, "image": get_full_image_url(shoe["image"])} for shoe in favorite_shoes
    ]

    cart_shoes = Shoe.objects.filter(id__in=[item["id"] for item in cart_data]).values(
        "id", "name", "price", "image", "brand", "color", "type"
    )
    cart_shoes = [
        {**shoe, "image": get_full_image_url(shoe["image"])} for shoe in cart_shoes
    ]

    return Response(
        {
            "message": "Sync successful",
            "favorites": favorite_shoes,
            "cart": cart_shoes,
        },
        status=status.HTTP_200_OK,
    )
