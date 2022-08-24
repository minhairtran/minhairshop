from rest_framework import serializers
from .models import Product, Review, Order, OrderItem, ShippingAddress
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class ProductFullInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # exclude = ['updateAt']
        fields = ["_id", 'name', 'image', 'numReviews', 'ratingAvg', 'brand', 'category', 
        'description', 'price', 'countInStock', 'createdAt', 'updateAt', 'user']