# Generated by Django 4.1 on 2022-09-01 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_rename_user_product_createdby_alter_order_createdat_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/null.png', null=True, upload_to=''),
        ),
    ]
