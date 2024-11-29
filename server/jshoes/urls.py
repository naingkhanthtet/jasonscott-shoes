"""
URL configuration for jshoes project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from decouple import config

urlpatterns = [
    path(config("DJANGO_ADMIN_URL"), admin.site.urls),
    path("auth/", include("users.urls")),
    path("shop/", include("shop.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
