from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import ProductFullInfoViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('products-full-info', ProductFullInfoViewSet)

urlpatterns = [
    path('', include(router.urls))
]