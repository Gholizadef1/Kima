# Generated by Django 3.1.2 on 2020-12-10 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0005_myquote_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myquote',
            name='Likes',
            field=models.IntegerField(),
        ),
    ]