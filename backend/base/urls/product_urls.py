from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from base.views.product_views import ProductFullInfoViewSet
from django.urls import path
router = routers.DefaultRouter()
router.register('products-full-info', ProductFullInfoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]