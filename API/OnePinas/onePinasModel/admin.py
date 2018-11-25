from django.contrib import admin

from . models import Profile
from . models import Account
from . models import Business
from . models import Job
from . models import Employment
from . models import Task
from . models import Project

# Register your models here.

admin.site.register(Profile)
admin.site.register(Account)
admin.site.register(Business)
admin.site.register(Job)
admin.site.register(Employment)
admin.site.register(Task)
admin.site.register(Project)