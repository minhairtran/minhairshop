from rest_framework.response import Response
from rest_framework import viewsets, status, views
from base.serializers import UserSerializer, UserSerializerWithToken, ChangePasswordSerializer, UserLoginSerializer, UserNameSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.password_validation import password_validators_help_texts, validate_password
from django.core.exceptions import (
    ValidationError, BadRequest
)
from base.pagination import StandardResultsSetPagination
from rest_framework.renderers import JSONRenderer
from django_filters import rest_framework as filters
from rest_framework.parsers import JSONParser
from rest_framework.decorators import permission_classes as permission_classes_decorators, renderer_classes as renderer_classes_decorators, parser_classes as parser_classes_decorators, api_view


class UserFilter(filters.FilterSet):

    class Meta:
        model = User
        
        fields = {
            'id': ['exact'],
        }
        ordering_fields = ['-id']

@api_view(["GET"])
@permission_classes_decorators([IsAuthenticated])
@renderer_classes_decorators([JSONRenderer])
@parser_classes_decorators([JSONParser])
def get_user_name(request, *args, **kwargs):
    user = request.user
    serializer = UserNameSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Create your views here.
class UserView(views.APIView):
    permission_classes = [AllowAny]
    renderer_classes = [JSONRenderer]
    parser_classes = [JSONParser]
    
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Register
    def post(self, request, *args, **kwargs):
        try:
            user = request.data
            user['email'] = user["username"]
            serializer = UserSerializerWithToken(data=user)
            if(serializer.is_valid(raise_exception=True)):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as error:
            return Response({"error": error.messages}, status=status.HTTP_400_BAD_REQUEST)
        except BadRequest as error:
            return Response({"error": error.messages}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "Something wrong"}, status=status.HTTP_400_BAD_REQUEST)

       

    def put(self, request, *args, **kwargs):
        try:
            updated_user = request.user
            updated_info = request.data
            serializer = UserSerializerWithToken(data=updated_info, instance=updated_user, partial=True)
            if(serializer.is_valid(raise_exception=True)):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except ValidationError as error:
            return Response({"error": error.messages}, status=status.HTTP_400_BAD_REQUEST)
        except BadRequest as error:
            return Response({"error": error.messages}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "Something wrong"}, status=status.HTTP_400_BAD_REQUEST)


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

        serializer = UserLoginSerializer(self.user).data

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
        permission_classes = (IsAuthenticated,)

        def update(self, request, *args, **kwargs):
            user = request.user
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not user.check_password(serializer.data.get("old_password")):
                    return Response({"Wrong old password."}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                try:
                    validate_password(serializer.data.get("new_password"), user=user)
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
            return Response(password_validators_help_texts(), status=status.HTTP_200_OK)