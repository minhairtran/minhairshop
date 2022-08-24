# Generated by Django 4.1 on 2022-08-14 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_remove_product_numreviews_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]