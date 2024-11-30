from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Shoe
from .serializers import ShoeSerializer


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
