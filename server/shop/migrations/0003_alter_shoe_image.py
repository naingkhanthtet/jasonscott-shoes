# Generated by Django 5.1.1 on 2024-11-29 08:35

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_rename_favorites_favorite_rename_shoes_shoe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoe',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
    ]
