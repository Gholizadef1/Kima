from rest_framework import serializers
from . models import book

class bookSerializer(serializers.ModelSerializer):

    class Meta:
        model = book
        fields = '__all__'

   



class UpdateRatingSerializer(serializers.ModelSerializer):

    userrating = serializers.IntegerField()
    
    def update(self, instance, validated_data):
        newrating = ((instance.avgrating*instance.ratecount) + validated_data.get('userrating',instance))/(instance.ratecount+1)
        instance.avgrating = newrating
        instance.ratecount += 1
        instance.save()
        return instance