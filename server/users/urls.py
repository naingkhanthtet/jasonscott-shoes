from django.urls import path
from .views import register_view, login_view, logout_view, check_authentication

urlpatterns = [
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("check-authentication/", check_authentication, name="check_authentication"),
]
