from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . models import book
from . serializers import bookSerializer
from rest_framework import filters
from rest_framework import generics

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
