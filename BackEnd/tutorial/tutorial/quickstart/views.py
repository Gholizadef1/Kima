from rest_framework.mixins import UpdateModelMixin,RetrieveModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
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
from .pagination import PaginationHandlerMixin
from rest_framework.settings import api_settings
from tutorial.kyma.models import book
from tutorial.kyma.serializers import bookSerializer
from rest_framework import generics
from .serializers import * 



class BasicPagination(PageNumberPagination):
    page_size_query_param = 'page_size'

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


class MyQuoteView(generics.ListAPIView,PaginationHandlerMixin):
    serializer_class=QuoteSerializer
    pagination_class = BasicPagination

    def get_queryset(self,pk):
        user=Account.objects.get(pk=pk)
        return MyQuote.objects.filter(account=user)


    def list(self, request,pk):
        queryset = self.get_queryset(pk=pk)
        serializer = QuoteSerializer(queryset, many=True)
        page = self.paginate_queryset(serializer.data)
        print(page.count)
        return self.get_paginated_response(page)

    

class QuoteView(APIView,PaginationHandlerMixin):

    model = MyQuote
    pagination_class = BasicPagination

    def get_object(self, pk):
        try:
            return MyQuote.objects.get(pk=pk)
        except MyQuote.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        this_book=book.objects.get(id=pk)
        if MyQuote.objects.filter(current_book=this_book).exists():
            quote_list = self.paginate_queryset(MyQuote.objects.filter(current_book=this_book))
            serilalizer = QuoteSerializer(quote_list,many=True)
            return Response(serilalizer.data)
        response = {'message' : 'No Quote!',}
        return Response(response)

    def post(self,request,pk):
        user=request.user
        this_book=book.objects.get(id=pk)
        serializer = PostQuoteSerializer(data=request.data)
        if serializer.is_valid():
            quote_text = serializer.data.get("textquote")
            new_quote = MyQuote(account=user,current_book=this_book,quote_text=quote_text)
            new_quote.save()
            response = {
                'status' : 'success',
                'code' : 'status.HTTP_200_OK',
                'message' : 'Quote Saved!!',
                'data' : quote_text,
            }
            return Response(response)
        return Response(serializer.errors,
                        status=HTTP_404_NOT_FOUND)

    def delete(self,request,pk):
        current_quote = MyQuote.objects.get(id=pk)
        current_user = request.user
        quote_user = current_quote.account
        if quote_user == current_user:
            current_quote.delete()
            return Response({'message':'Your Quote successfully delleted!'})
        else:
            return Response({'message':'You dont have permission to delete this quote!'})


class LikeQuoteView(APIView):

    def get(self, request, pk):
        user=request.user
        quote = MyQuote.objects.get(id=pk)
        if LikeQuote.objects.filter(account=user,quote=quote).exists():
            return Response({'message' : "True",})
        return Response({'message' : "False",})


    def post(self,request,pk):
        user=request.user
        quote = MyQuote.objects.get(id=pk)
        if LikeQuote.objects.filter(account=user,quote=quote).exists():
            userlike = LikeQuote.objects.filter(account=user,quote=quote)
            userlike.delete()
            quote.Likes-=1
            quote.save()
            return Response({'message':"unlike success!",
                             'data':quote.Likes,})
        else:
            newlike = LikeQuote(account=user,quote=quote)
            newlike.save()
            quote.Likes+=1
            quote.save()
            return Response({'message':"like success!",
                            'data':quote.Likes,})




