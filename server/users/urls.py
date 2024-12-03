from django.urls import path
from .views import (
    register_view,
    login_view,
    get_user,
    sync_user_data,
    fetch_user_data,
    change_password,
    delete_user,
)

urlpatterns = [
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("user/", get_user, name="get_user"),
    path("sync/", sync_user_data, name="sync_user_data"),
    path("user-data/", fetch_user_data, name="fetch_user_data"),
    path("change-pw/", change_password, name="change_password"),
    path("delete-user/", delete_user, name="delete_user"),
]
