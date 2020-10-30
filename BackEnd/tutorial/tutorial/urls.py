"""tutorial URL Configuration

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
from django.conf.urls import url
from django.urls import include, path
#from rest_framework import routers
from .quickstart import views
from rest_framework.urlpatterns import format_suffix_patterns
from .quickstart.views import registration_view
from .quickstart.views import login
from rest_framework.authtoken.views import obtain_auth_token

app_name= "quickstart"

urlpatterns = [
    path('admin/', admin.site.urls),
    #url(r'^SignUpView/',views.SignUp_view.as_view()),
   # url(r'^LoginView/',views.login_view.as_view()),
    path('register',registration_view,name="register"),
    path('login',login,name="login"),

]

