from rest_framework.mixins import UpdateModelMixin,RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from tutorial.kyma.models import book
from tutorial.kyma.serializers import bookSerializer
from rest_framework import generics
from rest_framework.parsers import JSONParser
from .serializers import * 

@api_view(['POST','GET'])
def registration_view(request):
    
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "successfully registered a new user."
            data['email'] = account.email
            data['username'] = account.username
            token=Token.objects.get(user=account).key
            data['token']=token

        else:
            data = serializer.errors
        return Response(data)

    if request.method == 'GET':
        Users=Account.objects.all()
        serializer=RegistrationSerializer(Users,many=True)
        return Response(serializer.data)


@api_view(["POST"])
@permission_classes([AllowAny],)
@permission_classes([IsAuthenticated])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username' : user.username, 'userid': user.id},
                    status=HTTP_200_OK)


class Readcollec(generics.ListAPIView):
    serializer_class=MyBookSerializer

    def get_queryset(self,pk):
        user=Account.objects.get(pk=pk)
        return MyBook.objects.filter(state="Read",account=user)


    def list(self, request,pk):
        queryset = self.get_queryset(pk=pk)
        serializer = MyBookSerializer(queryset, many=True)
        return Response(serializer.data)



class ToReadcollec(generics.ListAPIView):
    serializer_class=MyBookSerializer

    def get_queryset(self,pk):
        user=Account.objects.get(pk=pk)
        return MyBook.objects.filter(state="ToRead",account=user)


    def list(self, request,pk):
        queryset = self.get_queryset(pk=pk)
        serializer = MyBookSerializer(queryset, many=True)
        return Response(serializer.data)



class Readingcollec(generics.ListAPIView):
    serializer_class=MyBookSerializer

    def get_queryset(self,pk):
        user=Account.objects.get(pk=pk)
        return MyBook.objects.filter(state="Reading",account=user)


    def list(self, request,pk):
        queryset = self.get_queryset(pk=pk)
        serializer = MyBookSerializer(queryset, many=True)
        return Response(serializer.data)
    
    

class ChangePasswordView(generics.UpdateAPIView):

    serializer_class = ChangePasswordSerializer
    model = Account
    permission_classes = (IsAuthenticated,)

    def get_object(self,queryset=None):
        obj = self.request.user
        return obj

    def update(self,request,*args,**kwargs):

        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password" : ["Wrong Password"]},status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status' : 'success',
                'code' : 'status.HTTP_200_OK',
                'message' : 'Password updated succesfully!',
                'data' : [],
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserProfileView(generics.UpdateAPIView,UpdateModelMixin):
    serializer_class = UpdateUserProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset,pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def put(self,request,*args,**kwargs):
        return self.partial_update(request, *args, **kwargs)


class UserProfileViewwithToken(generics.UpdateAPIView,RetrieveModelMixin):
    serializer_class =  UserProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset,pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class UserProfileView(APIView):
    
    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        userprofile = self.get_object(pk)
        serializer = UserProfileSerializer(userprofile)
        return Response(serializer.data)



class CommentView(APIView):

    model = MyComment
    parser_classes = [JSONParser]

    def get_object(self, pk):
        try:
            return MyComment.objects.get(pk=pk)
        except MyComment.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        this_book=book.objects.get(id=pk)
        if MyComment.objects.filter(current_book=this_book).exists():
            comment_list = MyComment.objects.filter(current_book=this_book)
            serilalizer = CommentSerializer(comment_list,many=True)
            return Response(serilalizer.data)
        response = {'message' : 'No Comment!',}
        return Response(response)

    def post(self,request,pk):
        user=request.user
        this_book=book.objects.get(id=pk)
        comment_text=request.data.get("textcomment")
        new_comment=MyComment(account=user,current_book=this_book,comment_text=comment_text)
        new_comment.save()
        response = {
                'status' : 'success',
                'code' : 'status.HTTP_200_OK',
                'message' : 'Comment Saved!!',
                'data' : [comment_text,],
        }
        return Response(response)


class DeleteCommentView(APIView):

    def delete(self,request,pk):
        current_comment = MyComment.objects.get(id=pk)
        current_user = request.user
        comment_user = current_comment.account
        if comment_user == current_user:
            current_comment.delete()
            return Response({'message':'Your Comment successfully deleted!'})
        else:
            return Response({'message':'You dont have permission to delete this comment!'})


class CommentProfileView(APIView):

    model = MyComment
    parser_classes = [JSONParser]

    def get_object(self, pk):
        try:
            return MyComment.objects.get(pk=pk)
        except MyComment.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        user=Account.objects.get(pk=pk)
        if MyComment.objects.filter(account=user).exists():
            comment_list = MyComment.objects.filter(account=user)
            serilalizer = CommentSerializer(comment_list,many=True)
            return Response(serilalizer.data)
        response = {'message' : 'No Comment!',}
        return Response(response)

class LikeCommentView(APIView):

    def post(self,request,pk):
        user=request.user
        comment = MyComment.objects.get(id=pk)
        if LikeComment.objects.filter(account=user,comment=comment).exists():
            userlike=LikeComment.objects.get(account=user,comment=comment)
            userlike.delete()
            comment.LikeCount-=1
            comment.save()
            return Response({'message':"successfully unliked!",
                             'LikeCount':comment.LikeCount,
                             'DislikeCount':comment.DislikeCount})
        else:
            newlike = LikeComment(account=user,comment=comment)
            
            comment.LikeCount+=1
            comment.save()
            newlike.save()
            return Response({'message':"successfully liked!",
                             'LikeCount':comment.LikeCount,
                             'DislikeCount':comment.DislikeCount})

    def get(self,request,pk):
        user=self.request.user
        comment = MyComment.objects.get(id=pk)
        if LikeComment.objects.filter(account=user,comment=comment).exists():
            return Response({'message' : "True",})
        return Response({'message' : "False",})
        
        

class DislikeCommentView(APIView):

    def post(self,request,pk):
        user=request.user
        comment = MyComment.objects.get(id=pk)
        if (DislikeComment.objects.filter(account=user,comment=comment).exists()):
            userlike=DislikeComment.objects.get(account=user,comment=comment)
            userlike.delete()
            comment.DislikeCount-=1
            comment.save()
            return Response({'message':"successfully undisliked!",
                             'LikeCount':comment.LikeCount,
                             'DislikeCount':comment.DislikeCount})
        else:
            newlike = DislikeComment(account=user,comment=comment)
            
            comment.DislikeCount+=1
            comment.save()
            newlike.save()
            return Response({'message':"successfully disliked!",
                             'LikeCount':comment.LikeCount,
                             'DislikeCount':comment.DislikeCount})

    def get(self,request,pk):
        user=self.request.user
        comment = MyComment.objects.get(id=pk)
        if DislikeComment.objects.filter(account=user,comment=comment).exists():
            return Response({'message' : "True",})
        return Response({'message' : "False",})

class FilterCommentbyTime(APIView):

    def get(self,request,pk):
        bk=book.objects.get(id=pk)
        if MyComment.objects.filter(current_book=bk).exists():
            comment_list = MyComment.objects.filter(current_book=bk).order_by('sendtime')
            serilalizer = CommentSerializer(comment_list,many=True)
            return Response(serilalizer.data)
        response = {'message' : 'No Comment!',}
        return Response(response)

class FilterCommentbyLike(APIView):

    def get(self,request,pk):
        bk=book.objects.get(id=pk)
        if MyComment.objects.filter(current_book=bk).exists():
            comment_list = MyComment.objects.filter(current_book=bk).order_by('LikeCount')
            serilalizer = CommentSerializer(comment_list,many=True)
            return Response(serilalizer.data)
        response = {'message' : 'No Comment!',}
        return Response(response)

# class FilterQuotebyTime(APIView):

#     def get(self,request,pk):
#         bk=book.objects.get(id=pk)
#         if MyQuote.objects.filter(current_book=bk).exists():
#             comment_list = MyComment.objects.filter(current_book=bk).order_by('sendtime')
#             serilalizer = CommentSerializer(comment_list,many=True)
#             return Response(serilalizer.data)
#         response = {'message' : 'No Comment!',}
#         return Response(response)

# class FilterQuotebyLike(APIView):

#     def get(self,request,pk):
#         bk=book.objects.get(id=pk)
#         if MyQuote.objects.filter(current_book=bk).exists():
#             comment_list = MyComment.objects.filter(current_book=bk).order_by('LikeCount')
#             serilalizer = CommentSerializer(comment_list,many=True)
#             return Response(serilalizer.data)
#         response = {'message' : 'No Comment!',}
#         return Response(response)






    
