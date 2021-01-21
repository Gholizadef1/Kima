from rest_framework.mixins import UpdateModelMixin,RetrieveModelMixin
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import status,generics,filters
from .serializers import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .models import *
from .pagination import PaginationHandlerMixin
from rest_framework.settings import api_settings
from tutorial.kyma.models import book
from tutorial.kyma.serializers import bookSerializer
from django.core.paginator import Paginator

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
            data['id']=account.id

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

class UserRatingview(APIView):

    model = Ratinguser

    def get_object(self, pk):
        try:
            return Ratinguser.objects.get(pk=pk)
        except Ratinguser.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        user=request.user
        this_book=book.objects.get(id=pk)
        if Ratinguser.objects.filter(account=user,current_book=this_book).exists():
            wantedbookrate = get_object_or_404(Ratinguser.objects.all(),account=user,current_book=this_book)
            response = {
                'data' : wantedbookrate.userrate ,
            }
            return Response(response)
        response = {'message' : 'No User Rating!',}
        return Response(response)


    def post(self,request,pk):

        user=request.user
        this_book=book.objects.get(id=pk)
        if Ratinguser.objects.filter(account=user,current_book=this_book).exists():
            response = {
                'status' : 'failure',
                'code' : 'HTTP_400_BAD_REQUEST',
                'message' : 'You rated this book already!!',
                'data' : [],
            }
            return Response(response)

        postrate = RateByUserSerializer(data=request.data)
        if postrate.is_valid():
            new_rating = Ratinguser(account=user,current_book=this_book,userrate=postrate.data.get("rate"))
            new_rating.save()
            response = {
                'status' : 'success',
                'code' : 'status.HTTP_200_OK',
                'message' : 'BookRate is updated!',
                'data' : postrate.data.get("rate"),
            }
            return Response(response)
        return Response(postrate.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,pk):
        user=request.user
        this_book=book.objects.get(id=pk)
        wantedbookrate = get_object_or_404(Ratinguser.objects.all(),account=user,current_book=this_book)
        postrate = RateByUserSerializer(data=request.data)
        if postrate.is_valid():
            newrate = postrate.data.get("rate")
            wantedbookrate.userrate = newrate
            wantedbookrate.save()
            return Response({"message":"update rate"})
        return Response({'error': 'failed'},
                        status=HTTP_404_NOT_FOUND)

class MyQuoteView(generics.ListAPIView,PaginationHandlerMixin):

    serializer_class=QuoteSerializer
    pagination_class = BasicPagination

    def get_queryset(self,pk):
        user=Account.objects.get(pk=pk)
        return MyQuote.objects.filter(account=user)


    def list(self, request,pk):
        queryset = self.get_queryset(pk=pk)
        serializer = QuoteProfSerializer(queryset,context={"user": pk}, many=True)
        return Response(serializer.data)

class QuoteView(APIView,PaginationHandlerMixin):

    model = MyQuote
    pagination_class = BasicPagination

    def get_object(self, pk):
        try:
            return MyQuote.objects.get(pk=pk)
        except MyQuote.DoesNotExist:
          raise Http404
          
    def get(self,request,pk):
        filter = self.request.query_params.get('filter', None)
        this_book=book.objects.get(id=pk)
        if MyQuote.objects.filter(current_book=this_book).exists():
            if filter is not None:
                if filter=="time":
                    q_list = MyQuote.objects.filter(current_book=this_book).order_by('-sendtime')
                    quote_list = self.paginate_queryset(q_list)
                    serializer = QuoteSerializer(quote_list,context={"request": request},many=True)
                    count = Paginator(q_list,10).num_pages
                    return Response({"quotes" : serializer.data, "count": count})

                if filter=="like":
                    q_list = MyQuote.objects.filter(current_book=this_book).order_by('-Likes')
                    quote_list = self.paginate_queryset(q_list)
                    serializer = QuoteSerializer(quote_list,context={"request": request},many=True)
                    count = Paginator(q_list,10).num_pages
                    return Response({"quotes" : serializer.data, "count": count})
        
            mquote = MyQuote.objects.filter(current_book=this_book)
            quote_list = self.paginate_queryset(mquote)
            serilalizer = QuoteSerializer(quote_list,context={"request": request},many=True)
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
    
class LikeQuoteView(APIView):

    def post(self,request,book_pk,quote_pk):
        user=request.user
        quote = MyQuote.objects.get(id=quote_pk)
        feedback=self.request.query_params.get('feedback', None)
        if feedback=="like":
            if LikeQuote.objects.filter(account=user,quote=quote).exists():
                return Response({'message':"You have liked before!",
                                 'data':quote.Likes,})
            else:
                newlike = LikeQuote(account=user,quote=quote)
                newlike.save()
                quote.Likes+=1
                quote.save()
                return Response({'message':"like success!",
                                'data':quote.Likes,})

    def delete(self,request,book_pk,quote_pk):
        current_quote = MyQuote.objects.get(id=quote_pk)
        current_user = request.user

        feedback=self.request.query_params.get('feedback', None)
        if feedback is not None:
            if feedback=="like":
                userlike = LikeQuote.objects.filter(account=current_user,quote=current_quote)
                userlike.delete()
                current_quote.Likes-=1
                current_quote.save()
                return Response({'message':"unlike success!",
                                 'data':current_quote.Likes,})
            
        quote_user = current_quote.account
        if quote_user == current_user:
            current_quote.delete()
            return Response({'message':'Your Quote successfully delleted!'})
        else:
            return Response({'message':'You dont have permission to delete this quote!'})

class CommentView(APIView,PaginationHandlerMixin):

    model = MyComment
    parser_classes = [JSONParser]
    pagination_class = BasicPagination

    def get_object(self, pk):
        try:
            return MyComment.objects.get(pk=pk)
        except MyComment.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        filter = self.request.query_params.get('filter', None)
        this_book=book.objects.get(id=pk)
        if MyComment.objects.filter(current_book=this_book).exists():    
            if filter is not None:

                if filter=='time':
                    com_list = MyComment.objects.filter(current_book=this_book).order_by('-sendtime')
                    comment_list = self.paginate_queryset(com_list)
                    serializer = CommentSerializer(comment_list,context={"request": request},many=True)
                    count = Paginator(com_list,10).num_pages
                    return Response({"comments" : serializer.data, "count": count})

                if filter=='like':
                    com_list = MyComment.objects.filter(current_book=this_book).order_by('-LikeCount')
                    comment_list = self.paginate_queryset(com_list)
                    serializer = CommentSerializer(comment_list,context={"request": request},many=True)
                    count = Paginator(com_list,10).num_pages
                    return Response({"comments" : serializer.data, "count": count})
        
            mcomment = MyComment.objects.filter(current_book=this_book)
            comment_list = self.paginate_queryset(mcomment)
            serilalizer = CommentSerializer(comment_list,context={"request": request},many=True)
            return Response(serilalizer.data)

        response = {'message' : 'No Comment!',}
        return Response(response)

    def post(self,request,pk):
        user=request.user
        this_book=book.objects.get(id=pk)
        serializer = PostCommentSerializer(data=request.data)
        if serializer.is_valid():
            this_book.comment_count+=1
            this_book.save()
            comment_text = serializer.data.get("textcomment")
            new_comment = MyComment(account=user,current_book=this_book,comment_text=comment_text)
            new_comment.save()
            response = {
                'status' : 'success',
                'code' : 'status.HTTP_200_OK',
                'message' : 'Comment Saved!!',
                'data' : comment_text,
            }
            return Response(response)
        return Response(serializer.errors,
                        status=HTTP_404_NOT_FOUND)

class CommentProfileView(APIView,PaginationHandlerMixin):

    model = MyComment
    pagination_class = BasicPagination
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
            serilalizer = CommentProfSerializer(comment_list,context={"user": pk},many=True)
            return Response(serilalizer.data)
        response = {'message' : 'No Comment!',}
        return Response(response)

class CommentFeedView(APIView):

    def post(self,request,book_pk,comment_pk):
        feedback=self.request.query_params.get('feedback', None)
        user=request.user
        comment = MyComment.objects.get(id=comment_pk)
        if feedback is not None:
            if feedback=="like":
                if LikeComment.objects.filter(account=user,comment=comment).exists():
                    return Response({'message':"You have liked before!",
                                     'LikeCount':comment.LikeCount,
                                     'DislikeCount':comment.DislikeCount})
                else:
                    if DislikeComment.objects.filter(account=user,comment=comment).exists():
                        userdislike=DislikeComment.objects.get(account=user,comment=comment)
                        userdislike.delete()
                        comment.DislikeCount-=1
                        comment.save()
                    newlike = LikeComment(account=user,comment=comment)
            
                    comment.LikeCount+=1
                    comment.save()
                    newlike.save()
                    return Response({'message':"successfully liked!",
                                     'LikeCount':comment.LikeCount,
                                     'DislikeCount':comment.DislikeCount})

            if feedback=="dislike":
                if (DislikeComment.objects.filter(account=user,comment=comment).exists()):
                    return Response({'message':"You have disliked before!",
                                     'LikeCount':comment.LikeCount,
                                     'DislikeCount':comment.DislikeCount})
                else:
                    if LikeComment.objects.filter(account=user,comment=comment).exists():
                        userlike=LikeComment.objects.get(account=user,comment=comment)
                        userlike.delete()
                        comment.LikeCount-=1
                        comment.save()

                    newlike = DislikeComment(account=user,comment=comment)
                    comment.DislikeCount+=1
                    comment.save()
                    newlike.save()
                    return Response({'message':"successfully disliked!",
                                     'LikeCount':comment.LikeCount,
                                     'DislikeCount':comment.DislikeCount})
    
    def delete(self,request,book_pk,comment_pk):
        feedback=self.request.query_params.get('feedback', None)
        if feedback is None:
            current_comment = MyComment.objects.get(id=comment_pk)
            comment_book =book.objects.get(id=book_pk)
            current_user = request.user
            comment_user = current_comment.account
            if comment_user == current_user:
                comment_book.comment_count-=1
                comment_book.save()
                current_comment.delete()
                return Response({'message':'Your Comment successfully deleted!'})
            else:
                return Response({'message':'You dont have permission to delete this comment!'})
        
        user=request.user
        comment = MyComment.objects.get(id=comment_pk)
        if feedback=="like":
            userlike=LikeComment.objects.get(account=user,comment=comment)
            userlike.delete()
            comment.LikeCount-=1
            comment.save()
            return Response({'message':"successfully delete your like!",
                             'LikeCount':comment.LikeCount,
                             'DislikeCount':comment.DislikeCount})

        if feedback=="dislike":
            userlike=DislikeComment.objects.get(account=user,comment=comment)
            userlike.delete()
            comment.DislikeCount-=1
            comment.save()
            return Response({'message':"successfully delete your dislike!",
                             'LikeCount':comment.LikeCount,
                             'DislikeCount':comment.DislikeCount})

class DiscussionView(APIView,PaginationHandlerMixin):

    pagination_class = BasicPagination
    def get(self,request,pk):
        group = Group.objects.get(id=pk)
        discuss = Discussion.objects.filter(group=group)
        if discuss is not None:
            discuss_list = self.paginate_queryset(discuss)
            serializer = DiscussionSerializer(discuss_list,many=True)
            count = Paginator(discuss,10).num_pages
            return Response({"discussions" : serializer.data, "count": count})
        response = {'message' : 'No Discussion!',}
        return Response(response)


    def post(self,request,pk):
        user=request.user
        group = Group.objects.get(id=pk)
        serializer = CreateDiscussionSerializer(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get("title")
            if not Discussion.objects.filter(title=title,group=group).exists():
                description = serializer.data.get("description")
                new_discuss = Discussion(creator=user,title=title,description=description,group=group)
                new_discuss.save()
                seri = DiscussionSerializer(new_discuss,many=False)
                return Response(seri.data)
            else:
                return Response({"message":"A Discussion group with this name exists!"})

        return Response(serializer.errors)

class DiscussionDetailsView(APIView):
    
    def get(self,request,group_pk,discussion_pk):
        discuss = Discussion.objects.get(id=discussion_pk)
        serializer = DiscussionSerializer(discuss,many=False)
        return Response(serializer.data)

class DiscussionChatView(APIView,PaginationHandlerMixin):

    pagination_class = BasicPagination
    def get(self,request,group_pk,discussion_pk):
        discuss = Discussion.objects.get(id=discussion_pk)
        chats = Chat.objects.filter(discuss=discuss).order_by('-send_time')
        if chats is not None:
            chat_list = self.paginate_queryset(chats)
            serializer = DiscussionChatSerializer(chat_list,many=True)
            count = Paginator(chats,10).num_pages
            return Response({"chats" : serializer.data, "count": count})
        response = {'message' : 'No Chat!',}
        return Response(response)


    def post(self,request,group_pk,discussion_pk):
        user = request.user
        discuss = Discussion.objects.get(id=discussion_pk)
        current_group = discuss.group
        if not Member.objects.filter(user=user,group=current_group).exists():
            return Response({"message":"You aren't a group member!"})
        else:
            serializer = CreateChatSerializer(data=request.data)
            if serializer.is_valid():
                chattext = serializer.data.get("chat_text")
                new_chat = Chat(user=user,discuss=discuss,chat_text=chattext)
                new_chat.save()
                return Response({"message":"new chat!"})
            return Response(serializers.errors)
        
class GroupView(APIView,PaginationHandlerMixin):

    pagination_class = BasicPagination
    model = Group

    def get(self,request):
        filter = self.request.query_params.get('filter', None)
        groups = Group.objects.all()
        if groups is not None : 
            if filter is not None:

                if filter=="time":
                    groups = Group.objects.order_by('-create_time')
                    gp_list = self.paginate_queryset(groups)
                    serializer = GroupSerializer(gp_list,context={"request": request},many=True)
                    count = Paginator(groups,10).num_pages
                    return Response({"groups" : serializer.data, "count": count})

                if filter=="member":
                    groups = sorted(Group.objects.all(),  key=lambda m: -m.members_count)
                    gp_list=self.paginate_queryset(groups)
                    serializer = GroupSerializer(gp_list,context={"request": request},many=True)
                    count = Paginator(groups,10).num_pages
                    return Response({"groups" : serializer.data, "count": count})

            gp_list = self.paginate_queryset(groups)
            serializer = GroupSerializer(gp_list,context={"request": request},many=True)
            count = Paginator(groups,10).num_pages
            return Response({"groups" : serializer.data, "count": count})
        response = {'message' : 'No Group!',}
        return Response(response)

    def post(self,request):
        user=request.user
        serializer = CreateGroupSerializer(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get("title")
            summary = serializer.data.get("summary")
            if  not Group.objects.filter(title=title).exists():
                if 'photo' in request.FILES:
                    new_group = Group(owner=user,title=title,summary=summary,group_photo=request.FILES["photo"])
                    new_group.save()
                    new_member = Member(group=new_group,user=user)
                    new_member.save()
                    return Response({"data":GroupDetSerializer(new_group,many=False).data,"message":"Your group is succesfully created!",})
                else:
                    new_group = Group(owner=user,title=title,summary=summary)
                    new_group.save()
                    new_member = Member(group=new_group,user=user)
                    new_member.save()
                    return Response({"data":GroupDetSerializer(new_group,many=False).data,"message":"Your group is succesfully created!",})
            return Response({"message":"A group with this name exists!"})
        return Response(serializer.errors)

class GroupDetailsView(APIView):

    model = Group
    
    def get(self,request, pk):
        group = Group.objects.get(id=pk)
        serializer = GroupDetSerializer(group,many=False)
        return Response(serializer.data)

    def delete(self,request,pk):
        group = Group.objects.get(id=pk)
        current_user = request.user
        owner = group.owner
        if owner == current_user:
            group.delete()
            return Response({"message":"Successfull delete group!"})
        return Response({"message":"No permission!"})
      
class MemberGroupView(APIView,PaginationHandlerMixin):

    pagination_class = BasicPagination
    def get(self ,request ,pk ):
        group = Group.objects.get(id=pk)
        if Member.objects.filter(group=group).exists():
            members = Member.objects.filter(group=group)
            mem_list = self.paginate_queryset(members)
            serializer = MemberSerializer(mem_list,many=True)
            count = Paginator(members,10).num_pages
            return Response({"members" : serializer.data,"owner":UserProfileSerializer(group.owner,many=False).data, "count": count})
        return Response({"message":"No member!"})

    def post(self ,request ,pk ):
        user=request.user
        group = Group.objects.get(id=pk)
        if user == group.owner:
            return Response({"message":"You are owner!You can't join this group!"},status=HTTP_400_BAD_REQUEST)
        if  not Member.objects.filter(user=user,group=group).exists():
            new_member = Member(user=user,group=group)
            new_member.save()
            members = Member.objects.filter(group=group)
            serializer = MemberSerializer(members,many=True)
            return Response({"message":"You joind this group!","members":serializer.data,"owner":UserProfileSerializer(group.owner,many=False).data})
        
        members = Member.objects.filter(group=group)
        serializer = MemberSerializer(members,many=True)
        return Response({"message":"You joined before!","members":serializer.data,"owner":UserProfileSerializer(group.owner,many=False).data})

    def delete(self ,request ,pk):
        user=request.user
        group = Group.objects.get(id=pk)
        if user == group.owner:
            return Response({"message":"You are owner!You can't leave this group!"},status=HTTP_400_BAD_REQUEST)
        Member.objects.get(user=user,group=group).delete()
        members = Member.objects.filter(group=group)
        serializer = MemberSerializer(members,many=True)
        return Response({"message":"You leaved this group!","members":serializer.data,"owner":UserProfileSerializer(group.owner,many=False).data})

class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search-fields', [])

class DynamicGroupAPIView(generics.ListCreateAPIView):
    filter_backends = (DynamicSearchFilter,)
    queryset = Group.objects.all()
    serializer_class = GroupDetSerializer
  
class DeleteChatView(APIView):    
    def delete(self,request,group_pk,discussion_pk,chat_pk):
        current_user=request.user
        user=Chat.objects.get(id=chat_pk).user
        current_chat=Chat.objects.get(id=chat_pk)
        if current_user==user:
            current_chat.delete()
            return Response({"message":"Successfull delete chat!"})
        return Response({"message":"No permission!"})

class MyGroupView(APIView):
    model = Group
    pagination_class = BasicPagination
    parser_classes = [JSONParser]
    serializer_class=MyGroupSerializer

    def get_queryset(self,pk):
        user=Account.objects.get(pk=pk)
        return Member.objects.filter(user=user)

    def get(self, request,pk):
        queryset = self.get_queryset(pk=pk)
        serializer = MyGroupSerializer(queryset, many=True)
        return Response({'data': serializer.data, 'Count': queryset.count()})

    

