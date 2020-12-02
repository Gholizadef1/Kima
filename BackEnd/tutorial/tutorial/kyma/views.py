from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from . models import book
from . serializers import bookSerializer
from rest_framework import filters
from rest_framework import generics
from tutorial.quickstart.models import MyBook
from django.shortcuts import render, get_object_or_404, redirect


class BookView(APIView):
    """
    A view that can accept GET requests with JSON content.
    """

    def get(self, request, format=None):
        
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
        wantedbook = self.get_object(pk)
        serializer = bookSerializer(wantedbook)
        return Response(serializer.data)

    def post(self,request,pk):
        user=request.user
        book2=book.objects.get(id=pk)
        bookcheck=self.checkbook(user,book2)
        st=request.data.get("book_state")
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
                    bookcheck.state=request.data.get("book_state")
                    bookcheck.save()
                    return Response("successfully changed state")

    def checkbook(self,user,book2):
        try:
            return MyBook.objects.get(account=user,book1=book2)
        except MyBook.DoesNotExist:
            return None