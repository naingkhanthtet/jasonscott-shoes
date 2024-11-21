from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Shoe, Favorite, Cart
from .serializers import ShoeSerializer, CartSerialzer, FavoriteSerializer


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


class FavoriteView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartView(CreateAPIView, DestroyAPIView):
    """Create and delete shoes in the cart (authenticated users only)."""

    serializer_class = CartSerialzer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
