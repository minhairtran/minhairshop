from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.response import Response
from .models import Product
from rest_framework import viewsets, status
from .serializers import ProductFullInfoSerializer
from django.contrib.auth.models import User

# Create your views here.
class ProductFullInfoViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductFullInfoSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = User.objects.all()

