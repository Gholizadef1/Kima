from django.contrib import admin
from.models import *
# Register your models here.
admin.site.register(Account)
admin.site.register(MyBook)
admin.site.register(MyComment)
admin.site.register(LikeComment)