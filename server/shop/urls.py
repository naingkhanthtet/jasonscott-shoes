from django.urls import path
from .views import (
    ShoeListView,
    ShoeDetailView,
    CheckoutView,
    fetch_user_data,
)

urlpatterns = [
    path("shoes/", ShoeListView.as_view(), name="shoe-list"),
    path("shoes/<int:pk>/", ShoeDetailView.as_view(), name="shoe-detail"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("user-data/", fetch_user_data, name="fetch-data"),
]
