from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from base.views.user_views import MyTokenObtainPairView, AdminUserViewSet, UserView, PasswordView, PasswordInfoView, get_user_name
from django.urls import path
router = routers.DefaultRouter()
router.register(r'admin/user', AdminUserViewSet)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', include(router.urls)),
    path(r'user/', UserView.as_view(), name='user'),
    path(r'user-name/', get_user_name, name='user_name'),
    path(r'user/change-password/', PasswordView.as_view(), name='change_password'),
    path(r'user/change-password-info/', PasswordInfoView.as_view(), name='change_password_info'),
    path(r'user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]