from rest_framework import serializers
from .models import Product, Review, Order, OrderItem, ShippingAddress
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    last_login = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'is_staff', 'is_active','username', 'password', 'date_joined', 'last_login']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        validated_data['email'] = validated_data['username']
        validate_password(validated_data['password'], user=User(email=validated_data['email'], username=validated_data['username']))
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
    
    def get_last_login(self, obj):
        return obj.last_login

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['id', 'is_active','username', 'password']

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    is_active = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'is_admin', 'last_login', 'email', 'is_active', 'token', 'username', 'password', 'date_joined']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    
    def get_last_login(self, obj):
        return obj.last_login
        
    def get_is_admin(self, obj):
        return obj.is_staff

    def get_is_active(self, obj):
        return obj.is_active

    def get_token(self, obj):
        token = AccessToken.for_user(obj)
        return str(token)

class UserNameSerializer(serializers.Serializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username']
    
    def get_username(self, obj):
        return obj.username

class UserLoginSerializer(serializers.ModelSerializer):
    access_token = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    is_active = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'is_admin', 'is_active', 'access_token', 'username']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
    def get_is_admin(self, obj):
        return obj.is_staff

    def get_is_active(self, obj):
        return obj.is_active

    def get_access_token(self, obj):
        token = AccessToken.for_user(obj)
        return str(token)

class ProductFullInfoSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        createdBy = validated_data.get('createdBy', None)
        # my code
        product = Product.objects.create(**validated_data)  # saving product object
        return product

    class Meta:
        model = Product
        # exclude = ['updateAt']
        fields = ["_id", 'name', 'image', 'numReviews', 'ratingAvg', 'brand', 'category', 
        'description', 'price', 'countInStock', 'createdAt', 'updateAt', 'createdBy']
        extra_kwargs = {'name': {
            'help_text': "Name of the product"
        }}