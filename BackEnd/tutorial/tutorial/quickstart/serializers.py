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

class RateByUserSerializer(serializers.Serializer):

    rate = serializers.IntegerField(required=True,min_value=1,max_value=5)

class BookrateSerializer(serializers.ModelSerializer):

    account = UserProfileSerializer(read_only=True)

    class Meta:
        model = Ratinguser
        fields = fields = "__all__"

class PostQuoteSerializer(serializers.Serializer):
    
    textquote = serializers.CharField(required=True)

class QuoteSerializer(serializers.ModelSerializer):

    account = UserProfileSerializer(read_only=True)
    isliked = serializers.SerializerMethodField()
    
    class Meta:
        model = MyQuote
        fields = ['account', 'quote_text','sendtime','Likes','isliked','id']
    
    def get_isliked(self, obj):
        user =  self.context['request'].user
        if LikeQuote.objects.filter(account=user,quote=obj).exists():
            return True
        return False

class QuoteProfSerializer(serializers.ModelSerializer):

    account = UserProfileSerializer(read_only=True)
    current_book = bookSerializer(read_only=True)
    isliked = serializers.SerializerMethodField()
    
    class Meta:
        model = MyQuote
        fields = ['account', 'current_book', 'quote_text','sendtime','Likes','isliked','id']

    def get_isliked(self, obj):
        user =  Account.objects.get(pk=self.context['user'])
        if LikeQuote.objects.filter(account=user,quote=obj).exists():
            return True
        return False

class PostCommentSerializer(serializers.Serializer):
    
    textcomment = serializers.CharField(required=True)

class CommentSerializer(serializers.ModelSerializer):

    account = UserProfileSerializer(read_only=True)
    isliked = serializers.SerializerMethodField()
    isdisliked = serializers.SerializerMethodField()
    
    class Meta:
        model = MyComment
        fields = ['account', 'comment_text','sendtime','LikeCount','DislikeCount','isliked','isdisliked','id']
    
    def get_isliked(self, obj):
        user =  self.context['request'].user
        if LikeComment.objects.filter(account=user,comment=obj).exists():
            return True
        return False
    
    def get_isdisliked(self, obj):
        user =  self.context['request'].user
        if DislikeComment.objects.filter(account=user,comment=obj).exists():
            return True
        return False

class CreateGroupSerializer(serializers.Serializer):

    title = serializers.CharField(max_length=100,required=True)
    summary = serializers.CharField(required=True)
    #photo = serializers.ImageField(max_length=500, allow_empty_file=False, use_url=False)

class GroupSerializer(serializers.ModelSerializer):

    owner = UserProfileSerializer(read_only=True)
    is_member = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ['title','owner','group_photo','summary','id','members_count','is_owner','is_member']

    def get_is_owner(self, obj):
        user =  self.context['request'].user
        if obj.owner == user:
            return True
        return False
    
    def get_is_member(self, obj):
        user =  self.context['request'].user
        if Member.objects.filter(user=user,group=obj).exists():
            return True
        return False

class GroupDetSerializer(serializers.ModelSerializer):

    owner = UserProfileSerializer(read_only=True)

    class Meta:
        model = Group
        fields = ['title','owner','group_photo','summary','id','members_count','create_time']

class MemberSerializer(serializers.ModelSerializer):

    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Member
        fields = ['user']

class CreateDiscussionSerializer(serializers.Serializer):

    title = serializers.CharField(max_length=100,required=True)
    description = serializers.CharField(required=True)

class DiscussionSerializer(serializers.ModelSerializer):

    creator = UserProfileSerializer(read_only=True)

    class Meta:
        model = Discussion
        fields = "__all__"

class CreateChatSerializer(serializers.Serializer):

    chat_text = serializers.CharField(required=True)

class DiscussionChatSerializer(serializers.ModelSerializer):

    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = ['user','chat_text','send_time','id']

class CommentProfSerializer(serializers.ModelSerializer):
    account = UserProfileSerializer(read_only=True)
    current_book = bookSerializer(read_only=True)
    isliked = serializers.SerializerMethodField()
    isdisliked = serializers.SerializerMethodField()
    
    class Meta:
        model = MyComment
        fields = ['account', 'current_book', 'comment_text','sendtime','LikeCount','DislikeCount','isliked','isdisliked','id']
    
    def get_isliked(self, obj):
        user =  Account.objects.get(pk=self.context['user'])
        if LikeComment.objects.filter(account=user,comment=obj).exists():
            return True
        return False
    
    def get_isdisliked(self, obj):
        user =  Account.objects.get(pk=self.context['user'])
        if DislikeComment.objects.filter(account=user,comment=obj).exists():
            return True
        return False
        
class MyGroupSerializer(serializers.ModelSerializer):
    group_info = serializers.RelatedField(source='group',read_only=True)
    class Meta:
        model = Member
        fields = ['group_info']

    def to_representation(self,value):

        return GroupDetSerializer(Group.objects.get(pk=value.group.id),).data

class QuizSerializer(serializers.ModelSerializer):

    creator = UserProfileSerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = ['id','title','description','question_count','creator','quiz_photo','create_time']

class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['question_num','question_text','a_text','b_text','c_text','d_text','key']

class MyQuizSerializer(serializers.ModelSerializer):
    creator = UserProfileSerializer(read_only=True)
    is_taken = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()
    is_none = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['title','creator','quiz_photo','description','id','question_count','is_owner','is_taken','is_none']

    def get_is_owner(self, obj):
        if self.context['user'] =="":
            user =  self.context['request'].user
        if self.context['request'] == "":
            user =  self.context['user']
        if obj.creator == user:
            return True
        return False
    
    def get_is_taken(self, obj):
        if self.context['user'] =="":
            user =  self.context['request'].user
        if self.context['request'] == "":
            user =  self.context['user']
        if TakeQuiz.objects.filter(user=user,quiz=obj.id).exists():
            return True
        return False

    def get_is_none(self,obj):
        if self.context['user'] =="":
            user =  self.context['request'].user
        if self.context['request'] == "":
            user =  self.context['user']
        if (obj.creator != user) and (not TakeQuiz.objects.filter(user=user,quiz=obj.id).exists()):
            return True
        return False

class MyQuizSer(serializers.ModelSerializer):
    quiz_info = serializers.RelatedField(source='quiz',read_only=True)
    class Meta:
        model = TakeQuiz
        fields = ['quiz_info']

    def to_representation(self,value):

        return QuizSerializer(Quiz.objects.get(pk=value.quiz.id),).data

class SetQuizPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = ['quiz_photo']

