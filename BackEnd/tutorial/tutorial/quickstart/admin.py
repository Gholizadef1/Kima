from django.contrib import admin
from.models import *
# Register your models here.
admin.site.register(Account)
admin.site.register(MyBook)
admin.site.register(MyQuote)
admin.site.register(MyComment)
admin.site.register(LikeComment)
admin.site.register(LikeQuote)
admin.site.register(Group)
admin.site.register(Discussion)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(TakeQuiz)


