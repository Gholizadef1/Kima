from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from . models import book
from . serializers import *
from rest_framework import filters
from rest_framework import generics
from django.conf import settings
from tutorial.quickstart.models import *
from tutorial.quickstart.serializers import *
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import render, get_object_or_404, redirect


class BookView(APIView):
    """
    A view that can accept GET requests with JSON content.
    """

    def get(self, request, format=None):
        filter = self.request.query_params.get('filter', None)
        if filter is not None:

            if filter=='rate':
                books=sorted(book.objects.all(),  key=lambda m: -m.average_rating)
                serializer = bookSerializer(books,many=True)
                return Response(serializer.data)

            if filter=='comment':
                books=book.objects.order_by('-comment_count')
                serializer = bookSerializer(books, many=True)
                return Response(serializer.data)

        books = book.objects.all()
        serializer = bookSerializer(books,many=True)
        return Response(serializer.data)
 
    parser_classes = [JSONParser]

    def post(self, request, format=None):

        serializer = bookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])

class BookListView(generics.ListAPIView):
    queryset = book.objects.all()
    serializer_class = bookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title','author']

class DynamicBookAPIView(generics.ListCreateAPIView):
    filter_backends = (DynamicSearchFilter,)
    queryset = book.objects.all()
    serializer_class = bookSerializer

class BookViewPage(APIView):
    def get_object(self, pk):
        try:
            return book.objects.get(pk=pk)
        except book.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user=request.user
        wantedbook = self.get_object(pk)
        bookcheck=self.checkbook(user,wantedbook)
        serializer = bookSerializer(wantedbook)
        if(bookcheck==None):
            return Response({"data" : serializer.data ,'book_state': 'none'})
        else:
            return Response({"data" : serializer.data ,'book_state': bookcheck.state})

    def checkbook(self,user,book2):
        try:
            return MyBook.objects.get(account=user,book1=book2)
        except MyBook.DoesNotExist:
            return None
    def put(self, request, pk):
        wantedbook = get_object_or_404(book.objects.all(),pk=pk)
        data = self.request.data.get('userrating')
        serializer = UpdateRatingSerializer(wantedbook,data={'userrating':data},partial=True)
        if serializer.is_valid(raise_exception=True):
            newratingbook = serializer.save()
        return Response({"success": "Rating '{}' updated successfully".format(newratingbook.avgrating)})

class BookCollectionView(APIView):
    
    def post(self,request,pk):
        user=Account.objects.get(id=pk)
        book_id=request.data.get("book_id")
        book2=book.objects.get(id=book_id)
        bookcheck=self.checkbook(user,book2)
        state = self.request.query_params.get('type', None)
        if state is not None:
            st=state
        else:
            st="none"
        if(bookcheck==None):
            b=MyBook(account=user,book1=book2,state=st)
            b.save()
            return Response("successfully added")
        else:
            if(bookcheck.state==st):
                return Response("this book is already here")
            else:
                if(st=="none"):
                    bookcheck.delete()
                    return Response("successfully deleted from collection")
                else:
                    bookcheck.state=st
                    bookcheck.save()
                    return Response("successfully changed state")
    def checkbook(self,user,book2):
        try:
            return MyBook.objects.get(account=user,book1=book2)
        except MyBook.DoesNotExist:
            return None
    
    serializer_class=MyBookSerializer

    def get_queryset(self,pk):
        state = self.request.query_params.get('type', None)
        user=Account.objects.get(pk=pk)
        return MyBook.objects.filter(state=state,account=user)
        


    def get(self, request,pk):
        state = self.request.query_params.get('type', None)
        if state is not None:
            queryset = self.get_queryset(pk=pk)
            serializer = MyBookSerializer(queryset, many=True)
            return Response({'data': serializer.data, 'Count': queryset.count()})

        user=Account.objects.get(pk=pk)
        Read = MyBook.objects.filter(state="Read",account=user)
        Read_c = MyBookSerializer(Read, many=True)
        Reading = MyBook.objects.filter(state="Reading",account=user)
        Reading_c = MyBookSerializer(Reading, many=True)
        ToRead = MyBook.objects.filter(state="ToRead",account=user)
        ToRead_c = MyBookSerializer(ToRead, many=True)
        return Response({"Read":Read_c.data,"Reading":Reading_c.data,"ToRead":ToRead_c.data})
