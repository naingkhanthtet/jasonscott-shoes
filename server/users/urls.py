from django.urls import path
from .views import register_view, login_view, logout_view, get_user, sync_user_data

urlpatterns = [
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("user/", get_user, name="get_user"),
    path("sync/", sync_user_data, name="sync_user_data"),
]
