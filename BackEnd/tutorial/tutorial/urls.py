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
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .kyma import views
from .quickstart import views
from . import kyma,quickstart
from .quickstart.views import registration_view,login,bookcollec
from .kyma.views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bookdetail/', kyma.views.BookView.as_view()),
    path('dyanmicsearch/',kyma.views.DynamicBookAPIView.as_view()),
    path('bookinfo/', kyma.views.BookListView.as_view()),
    path('bookdetail/<int:pk>',kyma.views.BookViewPage.as_view()),
    path('book-collec/<int:pk>',bookcollec,name="book-collection"),
    path('register',registration_view,name="register"),
    path('login',login,name="login"),
]