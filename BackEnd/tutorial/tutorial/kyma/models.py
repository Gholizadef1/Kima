from django.db import models
from django.conf import settings
from django.db.models import Q
from django.utils import timezone

# Create your models here.
class book(models.Model):

    # title of book
    title = models.TextField(blank=True,null=True)

    #big image
    imgurl = models.TextField(blank=True,null=True)

    #small image
    smallimgurl = models.TextField(blank=True,null=True)

    #number of pages
    numpages = models.IntegerField(blank=True, null=True)

    #book publisher
    publisher = models.TextField(blank=True,null=True)

    #rating
    avgrating = models.IntegerField(blank=True, null=True)

    #rating count
    ratecount = models.IntegerField(blank=True, null=True)

    #author
    author = models.TextField(blank=True,null=True)

    #about book
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.title




    

    


    

