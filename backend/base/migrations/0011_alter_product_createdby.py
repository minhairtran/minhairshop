# Generated by Django 4.1 on 2022-09-06 09:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0010_alter_product__id_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='createdBy',
            field=models.ForeignKey(default=1, limit_choices_to={'is_staff': True}, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]