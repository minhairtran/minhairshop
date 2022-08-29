from rest_framework import serializers
from .models import Product, Review, Order, OrderItem, ShippingAddress
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    fullName = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    lastLogin = serializers.SerializerMethodField(read_only=True)
    isActive = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username', 'password', 'fullName', 'isAdmin', 'lastLogin', 'isActive']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

    def get_lastLogin(self, obj):
        return obj.last_login
        
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_isActive(self, obj):
        return obj.is_active
    
    def get_fullName(self, obj):
        fullName = "Unknown"

        if obj.first_name != '':
            if obj.last_name != '':
                fullName = obj.first_name + obj.last_name
            else:
                fullName = obj.first_name
        return fullName

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username', 'password', 'fullName', 'isAdmin', 'lastLogin', 'isActive', 'token']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)

class ProductFullInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # exclude = ['updateAt']
        fields = ["_id", 'name', 'image', 'numReviews', 'ratingAvg', 'brand', 'category', 
        'description', 'price', 'countInStock', 'createdAt', 'updateAt', 'user']