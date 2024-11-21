from django.urls import path
from .views import (
    ShoeListView,
    ShoeDetailView,
    CheckoutView,
    FavoriteView,
    CartView,
)

urlpatterns = [
    path("shoes/", ShoeListView.as_view(), name="shoe-list"),
    path("shoes/<int:pk>/", ShoeDetailView.as_view(), name="shoe-detail"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("favorite/", FavoriteView.as_view(), name="favorite"),
    path("cart/", CartView.as_view(), name="cart"),
]
