from unicodedata import category
from django.db import models
from datetimeutc.fields import DateTimeUTCField
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200)
    image = models.ImageField(blank=True, null=True)
    brand = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(max_length=5000)
    price = models.DecimalField(max_digits=14, decimal_places=2)
    countInStock = models.IntegerField(default=0)
    createdAt = DateTimeUTCField(auto_now_add=True)
    updateAt = DateTimeUTCField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.name) 

    def numReviews(self):
        reviews = Review.objects.filter(product=self)
        return len(reviews)

    def ratingAvg(self):
        reviews = Review.objects.filter(product=self)
        if len(reviews) != 0:
            return sum(reviews.rating)/len(reviews)
        else:
            return 0

class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    rating = models.IntegerField(default=0)
    comment = models.TextField(max_length=5000, blank=True, null=True)
    createdAt = DateTimeUTCField(auto_now_add=True)
    updateAt = DateTimeUTCField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.rating) 

# Create your models here.
class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    payentMethod = models.CharField(max_length=50, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=14, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=14, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=14, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = DateTimeUTCField(auto_now_add=False, null=True, blank=True)
    createdAt = DateTimeUTCField(auto_now_add=True)
    updateAt = DateTimeUTCField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, blank=True, null=True)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    qty = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=14, decimal_places=2)
    image = models.ImageField(blank=True, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def name(self):
        product = Product.objects.filter(product=self)
        return product.name

    def __str__(self):
        return str(self.name())

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postalCode = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    shippingPrice = models.DecimalField(max_digits=14, decimal_places=2)
    image = models.ImageField(blank=True, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def name(self):
        product = Product.objects.filter(product=self)
        return product.name

    def __str__(self):
        return str(self.name())
    