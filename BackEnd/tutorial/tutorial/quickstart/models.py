from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from tutorial.kyma.models import book
from django.utils import timezone




class MyAccountManager(BaseUserManager):
    def create_user(self,email,username,password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user=self.model(email=self.normalize_email(email),
        username=username,)

        user.set_password(password)
        user.is_stuff = False
        user.save(using=self._db)
        return user


    def create_superuser(self,email,username,password):
        user=self.create_user(email=self.normalize_email(email),
        password=password,
        username=username,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    email=models.EmailField(verbose_name="email",max_length=60,unique=True)
    username=models.CharField(max_length=30,unique=True)
    profile_photo = models.ImageField( upload_to='profile_photos',default='default.png')
    date_joined=models.DateTimeField(verbose_name="date joined",auto_now_add=True)
    last_login=models.DateTimeField(verbose_name="last login",auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    #myshelf=models.ManyToManyField(book,through='MyBook',default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]

    objects=MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)




class MyBook(models.Model):
    account=models.ForeignKey(Account,on_delete=models.CASCADE)
    book1=models.ForeignKey(book,on_delete=models.CASCADE)
    state=models.CharField(max_length=10)

    def __str__(self):
        return self.state



class MyComment(models.Model):
    account=models.ForeignKey(Account,on_delete=models.CASCADE)
    current_book=models.ForeignKey(book,on_delete=models.CASCADE)
    comment_text=models.TextField()
    sendtime = models.DateTimeField(default=timezone.now, editable=False)
    LikeCount=models.IntegerField(default=0)
    DislikeCount=models.IntegerField(default=0)

    def __str__(self):
        return self.comment_text


class LikeComment(models.Model):
    account=models.ForeignKey(Account,on_delete=models.CASCADE)
    comment=models.ForeignKey(MyComment,on_delete=models.CASCADE)
    liketime = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.comment.comment_text

class DislikeComment(models.Model):
    account=models.ForeignKey(Account,on_delete=models.CASCADE)
    comment=models.ForeignKey(MyComment,on_delete=models.CASCADE)
    disliketime = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.comment.comment_text