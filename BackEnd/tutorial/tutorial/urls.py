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
    path('bookdetail/', kyma.views.BookView.as_view()),
    path('dyanmicsearch/',kyma.views.DynamicBookAPIView.as_view()),
    path('bookinfo/', kyma.views.BookListView.as_view()),
    path('bookdetail/<int:pk>',kyma.views.BookViewPage.as_view()),
    path('api/user-profile/<int:pk>/ToRead',ToReadcollec.as_view()),
    path('api/user-profile/<int:pk>/Read',Readcollec.as_view()),
    path('api/user-profile/<int:pk>/Reading',Readingcollec.as_view()),
    path('bookdetail/<int:pk>/comment',quickstart.views.CommentView.as_view()),
    path('bookdetail/<int:pk>/getstate',get_bookstate,name="get_state"),
    path('api/user-profile/<int:pk>',quickstart.views.UserProfileView.as_view()),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/update-profile/', UpdateUserProfileView.as_view(), name='update-profile'),
    path('api/profile/', UserProfileViewwithToken.as_view(), name='profile'),
    path('register',registration_view,name="register"),
    path('login',login,name="login"),
    
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)