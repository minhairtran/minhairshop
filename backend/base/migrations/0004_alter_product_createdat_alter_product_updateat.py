# Generated by Django 4.1 on 2022-08-15 15:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_orderitem_image_product_image_shippingaddress_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='createdAt',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='product',
            name='updateAt',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
