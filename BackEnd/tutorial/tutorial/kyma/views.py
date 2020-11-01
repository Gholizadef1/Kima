from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . models import book
from . serializers import bookSerializer

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

