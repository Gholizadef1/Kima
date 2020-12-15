from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *
from tutorial.kyma.serializers import bookSerializer
from tutorial.kyma.models import book

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'},write_only=True)
    class Meta:
        model = Account
        fields = ['email', 'username','password','password2']
        extra_kwargs = {
                'password':{'write_only': True}
        }

    def save(self):
        account=Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        account.set_password(password)
        account.save()
        return account





class MyBookSerializer(serializers.ModelSerializer):
    book_info = serializers.RelatedField(source='book1',read_only=True)
    class Meta:
        model = MyBook
        fields = ['book_info']

    def to_representation(self,value):
        return bookSerializer(book.objects.get(pk=value.book1.id)).data


        
class ChangePasswordSerializer(serializers.Serializer):

    model = Account
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UpdateUserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['username','profile_photo']


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['username','profile_photo','email','id']

class PostCommentSerializer(serializers.Serializer):
    
    textcomment = serializers.CharField(required=True)

class CommentSerializer(serializers.ModelSerializer):

    account = UserProfileSerializer(read_only=True)
    current_book = bookSerializer(read_only=True)
    
    class Meta:
        model = MyComment
        fields = "__all__"


