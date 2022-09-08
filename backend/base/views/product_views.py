from base.models import Product
from rest_framework import viewsets, status
from base.serializers import ProductFullInfoSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from django_filters import rest_framework as filters
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes
from rest_framework.throttling import AnonRateThrottle
from base.pagination import StandardResultsSetPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

# Create your views here.

class ProductFilter(filters.FilterSet):
    # price = filters.NumberFilter()
    # price__gt = filters.NumberFilter(field_name='price', lookup_expr='gt')
    # price__lt = filters.NumberFilter(field_name='price', lookup_expr='lt')

    class Meta:
        model = Product
        # start with name
        # fields = ['createdBy', 'countInStock', 'price']
        fields = {
            'price': ['lt', 'gt'],
            'createdBy': ['exact'],
            'countInStock': ['lt', 'gt'],
            'name': ['startswith'],
        }
        ordering_fields = ['price', 'countInStock', 'updateAt']

class ProductFullInfoViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductFullInfoSerializer
    permission_classes = [AllowAny]
    filterset_class = ProductFilter
    # throttle_classes = [AnonRateThrottle]
    pagination_class = StandardResultsSetPagination
    renderer_classes = [JSONRenderer]
    # parser_classes = [JSONParser]

    # @action(detail=True, methods=['post'])
    @authentication_classes([SessionAuthentication, BasicAuthentication])
    def create(self, request, *args, **kwargs):
        try:
            user = request.user
            user = get_object_or_404(User.objects.all(), username=user.username)
            data = request.data.dict()
            data['createdBy'] = user.id
            product_serializer = self.get_serializer(data=data)
            product_serializer.is_valid(raise_exception=True)
            product_serializer.save()
            return Response(product_serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as error:
            return Response(error.__dict__, status=status.HTTP_400_BAD_REQUEST)
