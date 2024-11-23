from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Shoe, Favorite, Cart
from .serializers import ShoeSerializer
from django.conf import settings


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


class ShoeListView(ListAPIView):
    """Return all available shoes for authenticated and unauthenticated users."""

    permission_classes = [AllowAny]
    queryset = Shoe.objects.all()
    serializer_class = ShoeSerializer


class ShoeDetailView(RetrieveAPIView):
    """Return shoe details by ID for authenticated and unauthenticated users."""

    permission_classes = [AllowAny]
    queryset = Shoe.objects.all()
    serializer_class = ShoeSerializer


class CheckoutView(APIView):
    """Proceed to checkout (authenticated users only)."""

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return Response({"message": "Proceeding to checkout"})
