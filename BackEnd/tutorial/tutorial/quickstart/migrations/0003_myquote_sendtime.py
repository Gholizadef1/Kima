# Generated by Django 3.1.2 on 2020-12-09 16:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0002_myquote'),
    ]

    operations = [
        migrations.AddField(
            model_name='myquote',
            name='sendtime',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]
