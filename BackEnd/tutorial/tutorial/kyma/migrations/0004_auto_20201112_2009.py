# Generated by Django 3.1.2 on 2020-11-12 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kyma', '0003_auto_20201030_0504'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='formatbook',
        ),
        migrations.AlterField(
            model_name='book',
            name='imgurl',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='smallimgurl',
            field=models.TextField(blank=True, null=True),
        ),
    ]
