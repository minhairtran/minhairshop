# Generated by Django 4.1 on 2022-08-16 07:23

import datetimeutc.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_product_createdat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='createdAt',
            field=datetimeutc.fields.DateTimeUTCField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='updateAt',
            field=datetimeutc.fields.DateTimeUTCField(auto_now=True),
        ),
    ]
