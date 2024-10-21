from django.urls import path
from .views import (
    ShoeListView,
    ShoeDetailView,
    CheckoutView,
    FavoriteView,
    UnfavoriteView,
    SyncFavoriteView,
    CartView,
    SyncCartView,
)

urlpatterns = [
    path("shoes/", ShoeListView.as_view(), name="shoe-list"),
    path("shoes/<int:pk>/", ShoeDetailView.as_view(), name="shoe-detail"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("favorite/", FavoriteView.as_view(), name="favorite"),
    path("favorite/<int:pk>/", UnfavoriteView.as_view(), name="unfavorite"),
    path("sync/favorite/", SyncFavoriteView.as_view(), name="sync-favorite"),
    path("cart/", CartView.as_view(), name="cart"),
    path("sync/cart/", SyncCartView.as_view(), name="sync-cart"),
]
