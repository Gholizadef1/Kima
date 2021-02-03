"""kima URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .kyma import views
from .quickstart import views
from . import kyma , quickstart
from tutorial.quickstart.views import *
from tutorial.kyma.views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('book', kyma.views.BookView.as_view()),
    path('book/<int:pk>',kyma.views.BookViewPage.as_view()),
    path('user/<int:pk>/collection',kyma.views.BookCollectionView.as_view()),
    path('book/<int:pk>/rate',UserRatingview.as_view()),
    path('book/<int:pk>/comment',CommentView.as_view()),
    path('book/<book_pk>/comment/<comment_pk>',CommentFeedView.as_view()),
    path('book/<int:pk>/quote',QuoteView.as_view()),
    path('book/<book_pk>/quote/<quote_pk>',LikeQuoteView.as_view()),
    path('group',GroupView.as_view()),
    path('group/<int:pk>/member',MemberGroupView.as_view()),
    path('group/<group_pk>/member/<member_pk>',LeaveGroupView.as_view()),
    path('group/<int:pk>',GroupDetailsView.as_view()),
    path('groups',DynamicGroupAPIView.as_view()),
    path('group/<int:pk>/discussion',DiscussionView.as_view()),
    path('group/<group_pk>/discussion/<discussion_pk>',DiscussionDetailsView.as_view()),
    path('group/<group_pk>/discussion/<discussion_pk>/chat',DiscussionChatView.as_view()),
    path('group/<group_pk>/discussion/<discussion_pk>/chat/<chat_pk>',DeleteChatView.as_view()),
    path('user/<int:pk>/quote',MyQuoteView.as_view()),
    path('user/<int:pk>/comment',CommentProfileView.as_view()),
    path('user/<int:pk>/group',MyGroupView.as_view()),
    path('user/<int:pk>',UserProfileView.as_view()),
    path('books',kyma.views.DynamicBookAPIView.as_view()),
    path('user/<int:pk>/change-password', ChangePasswordView.as_view(), name='change-password'),
    path('user/<int:pk>/update-profile', UpdateUserProfileView.as_view(), name='update-profile'),
    path('bookinfo', kyma.views.BookListView.as_view()),
    path('register',RegistrationView.as_view()),
    path('login',LoginView.as_view()),
    path('quiz',QuizView.as_view()),
    path('quizes',DynamicQuizAPIView.as_view()),
    path('quiz/<int:pk>',TakeQuizView.as_view()),
    path('quiz/<int:pk>/photo',SetQuizPhotoView.as_view()),
    path('user/<user_pk>/quiz/<quiz_pk>/result',QuizResultView.as_view()),
    path('user/<int:pk>/quiz',MyQuizView.as_view()),
    
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)