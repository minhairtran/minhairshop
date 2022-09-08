from rest_framework.response import Response
from rest_framework import viewsets, status, views
from base.serializers import UserSerializer, UserSerializerWithToken, ChangePasswordSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.contrib.auth.password_validation import password_validators_help_texts, validate_password
from django.core.exceptions import (
    ValidationError,
)
from base.pagination import StandardResultsSetPagination
from rest_framework.renderers import JSONRenderer
from django_filters import rest_framework as filters

class UserFilter(filters.FilterSet):

    class Meta:
        model = User
        
        fields = {
            'id': ['exact'],
        }
        ordering_fields = ['-id']

# Create your views here.
class UserView(views.APIView):
    permission_classes = [AllowAny]
    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    # Register
    def post(self, request, *args, **kwargs):
        try:
            user = request.data.dict()
            user['email'] = user['username']
            serializer = UserSerializerWithToken(data=user)
            if(serializer.is_valid(raise_exception=True)):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as error:
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
       

    def put(self, request, *args, **kwargs):
        user = request.user
        updated_user = get_object_or_404(User.objects.all(), username=user.username)
        updated_info = request.data.dict()
        serializer = UserSerializerWithToken(data=updated_info, instance=updated_user, partial=True)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response({"data": serializer.data}, status=status.HTTP_202_ACCEPTED)


# Create your views here.
class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filterset_class = UserFilter
    pagination_class = StandardResultsSetPagination
    renderer_classes = [JSONRenderer]


    # def list(self, request, *args, **kwargs):
    #     queryset = User.objects.all()
    #     serializer = UserSerializer(queryset, many=True)
    #     return Response({"data": serializer.data, "count": len(serializer.data)}, status=status.HTTP_200_OK)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class PasswordView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (AllowAny,)

        def update(self, request, *args, **kwargs):
            user = request.user
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not user.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                try:
                    validate_password(serializer.data.get("new_password"), user=User(email=user['email'], username=user['username']))
                except ValidationError as error:
                    return Response(error, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(serializer.data.get("new_password"))
                user.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordInfoView(views.APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
            return Response({"data": password_validators_help_texts()}, status=status.HTTP_200_OK)