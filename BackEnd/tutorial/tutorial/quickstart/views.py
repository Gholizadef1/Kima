from django.shortcuts import render
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
from .models import Account,MyBook
from .serializers import RegistrationSerializer,MyBookSerializer
from tutorial.kyma.models import book
from tutorial.kyma.serializers import bookSerializer
import json

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
    return Response({'token': token.key, 'username' : user.username},
                    status=HTTP_200_OK)

        


@api_view(["GET"])
def Readcollec(request,pk):
    user=Account.objects.get(pk=pk)
    readc=MyBook.objects.get(state="Read",account=user)
    return readc


@api_view(["GET"])
def ToReadcollec(request,pk):
    user=Account.objects.get(pk=pk)
    toreadc=MyBook.objects.get(state="ToRead",account=user)
    return toreadc



@api_view(["GET"])
def Readingcollec(request,pk):
    user=Account.objects.get(pk=pk)
    readingc=MyBook.objects.get(state="Reading",account=user)
    return readingc
    
