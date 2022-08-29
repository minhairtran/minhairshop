from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import ProductFullInfoViewSet, MyTokenObtainPairView, getUserProfile, registerUser, UserViewSet
from django.urls import path
router = routers.DefaultRouter()
router.register('all-users', UserViewSet)
router.register('products-full-info', ProductFullInfoViewSet)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', include(router.urls)),
    path('user/profile/', getUserProfile, name='users-profile'),
    path('user/register/', registerUser, name='register'),
    path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]