from django.db import models
from django.conf import settings
from django.db.models import Q
from django.utils import timezone
from django.db.models import Avg
#from tutorial.quickstart.models import Account,Ratinguser

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
    avgrating = models.FloatField(blank=True, null=True)

    #rating count
    ratecount = models.IntegerField(blank=True, null=True)

    #author
    author = models.TextField(blank=True,null=True)

    #about book
    description = models.TextField(blank=True, null=True)

    #comment count
    comment_count = models.IntegerField(default=0)

    @property
    def average_rating(self):
        value=self.ratinguser_set.all().aggregate(Avg('userrate'))['userrate__avg']
        if value==None:
            return 0
        return value
    @property
    def average_rating_count(self):
        return self.ratinguser_set.all().count()
    
    def __str__(self):
        return self.title

    




    

    


    

