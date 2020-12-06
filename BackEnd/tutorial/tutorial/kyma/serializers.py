from rest_framework import serializers
from . models import book

class bookSerializer(serializers.ModelSerializer):

    class Meta:
        model = book
        fields = ['average_rating','title','imgurl','smallimgurl','numpages','publisher','avgrating','ratecount','author','description']

   



class UpdateRatingSerializer(serializers.Serializer):

    userrating = serializers.IntegerField()

    def create(self, validated_data):
        return book.objects.create(**validated_data)

    def update(self, instance, validated_data):
        newrating = ((instance.avgrating*instance.ratecount) + validated_data.get('userrating',instance))/(instance.ratecount+1)
        instance.avgrating = newrating
        instance.ratecount += 1
        instance.save()
        return instance