from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from shop.models import Cart, Favorite


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
        if request.data.get("favorites") or request.data.get("cart"):
            request.user = user
            # Call sync function with the cookie data
            sync_user_data(request)
        return JsonResponse({"message": "Login success"}, status=status.HTTP_200_OK)
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
@login_required
def get_user(request):
    if request.user.is_authenticated:
        return JsonResponse(
            {
                "username": request.user.username,
                "isAuthenticated": True,
            }
        )
    return JsonResponse({"isAuthenticated": False}, status=status.HTTP_403_FORBIDDEN)


@csrf_protect
@api_view(["POST"])
def sync_user_data(request):
    """
    Sync data from browser cookies to registered user
    """
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"message": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )

    # Get favorites and cart data from request
    favorites = request.data.get("favorites", [])
    cart = request.data.get("cart", [])

    # Sync favorites
    favorite_ids = [item["shoe_id"] for item in favorites]
    existing_favorites = set(
        Favorite.objects.filter(user=user, shoe_id__in=favorite_ids).values_list(
            "shoe_id", flat=True
        )
    )

    # Add new favorites
    for shoe_id in favorite_ids:
        if shoe_id not in existing_favorites:
            Favorite.objects.create(user=user, shoe_id=shoe_id)

    # Remove any favorites no longer in the updated list
    Favorite.objects.filter(user=user).exclude(shoe_id__in=favorite_ids).delete()

    # Sync cart items
    cart_items = Cart.objects.filter(user=user)
    cart_item_dict = {item.shoe_id: item for item in cart_items}

    for item in cart:
        shoe_id = item["shoe_id"]
        quantity = item["quantity"]
        if shoe_id in cart_item_dict:
            cart_item = cart_item_dict[shoe_id]
            cart_item.quantity = quantity  # Update quantity
            cart_item.save()
        else:
            # Create new cart item if it doesn't exist
            Cart.objects.create(user=user, shoe_id=shoe_id, quantity=quantity)

    # Remove cart items not present in the updated list
    Cart.objects.filter(user=user).exclude(
        shoe_id__in=[item["shoe_id"] for item in cart]
    ).delete()

    return Response({"message": "Sync successful"}, status=status.HTTP_200_OK)
