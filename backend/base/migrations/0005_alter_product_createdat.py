# Generated by Django 4.1 on 2022-08-16 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_product_createdat_alter_product_updateat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
