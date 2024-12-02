from django.conf import settings
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from shop.models import Cart, Favorite, Shoe
from decouple import config


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
            {"message": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects.filter(username=username).exists():
        return Response({"message": "user exists"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response(
            {"message": "user with this email already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(email=email, username=username, password=password)
    login(request._request, user)

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
    # if request.user.is_authenticated:
    #     request.session.flush()

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
        response.set_cookie("csrftoken", csrf_token, httponly=True)

        print(request.session.items())
        print(response.cookies)
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
@permission_classes([AllowAny])
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
    cart_item_ids = [
        item["id"] for item in cart_data
    ]  # Get only IDs for deletion check

    for item in cart_data:
        shoe_id = item["id"]
        quantity = item.get("quantity", 1)

        # Update quantity if item exists, else create it
        if shoe_id in cart_item_dict:
            cart_item = cart_item_dict[shoe_id]
            if cart_item.quantity != quantity:
                cart_item.quantity = quantity
                cart_item.save()
        else:
            Cart.objects.create(user=user, shoe_id=shoe_id, quantity=quantity)

    # Delete items in backend that aren't in the incoming `cart_data`
    items_to_delete = Cart.objects.filter(user=user).exclude(shoe_id__in=cart_item_ids)
    print("Items to be deleted from cart:", items_to_delete)  # Debug print statement
    items_to_delete.delete()  # Perform the deletion

    favorite_shoes = Shoe.objects.filter(id__in=favorite_ids).values(
        "id", "name", "price", "image"
    )
    favorite_shoes = [
        {
            **shoe,
            "image": (
                shoe["image"].url if hasattr(shoe["image"], "url") else shoe["image"]
            ),
        }
        for shoe in favorite_shoes
    ]

    cart_shoes = Shoe.objects.filter(id__in=cart_item_ids).values(
        "id", "name", "price", "image", "brand", "color", "type"
    )
    cart_shoes = [
        {
            **shoe,
            "image": (
                shoe["image"].url if hasattr(shoe["image"], "url") else shoe["image"]
            ),
        }
        for shoe in cart_shoes
    ]

    return Response(
        {
            "message": "Sync successful",
            "favorites": favorite_shoes,
            "cart": cart_shoes,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def fetch_user_data(request):
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"message": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )

    # Get user's favorites
    favorites = Shoe.objects.filter(favorite__user=user)
    favorites_data = [
        {
            "id": shoe.id,
            "name": shoe.name,
            "price": shoe.price,
            "image": request.build_absolute_uri(shoe.image.url),
        }
        for shoe in favorites
    ]

    # Get user's cart items
    cart_items = Cart.objects.filter(user=user).select_related("shoe")
    cart_data = [
        {
            "id": item.shoe.id,
            "name": item.shoe.name,
            "price": item.shoe.price,
            "image": item.shoe.image.url,
            "quantity": item.quantity,
            "brand": item.shoe.brand,
            "color": item.shoe.color,
            "type": item.shoe.type,
            "image": request.build_absolute_uri(item.shoe.image.url),
        }
        for item in cart_items
    ]

    return Response(
        {"favorites": favorites_data, "cart": cart_data}, status=status.HTTP_200_OK
    )


@csrf_protect
@api_view(["POST"])
def change_password(request):
    try:
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        user = request.user

        if not user.check_password(old_password):
            return JsonResponse(
                {"error": "Old password is not correct"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if old_password == new_password:
            return JsonResponse(
                {"error": "You cannot use old password to change"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)
        return JsonResponse(
            {"message": "Password changed successfully"}, status=status.HTTP_200_OK
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_protect
@api_view(["DELETE"])
def delete_user(request):
    try:
        user = request.user
        user.delete()
        return JsonResponse(
            {"message": "Account deleted successfully"}, status=status.HTTP_200_OK
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
