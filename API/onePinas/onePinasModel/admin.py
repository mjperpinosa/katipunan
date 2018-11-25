from django.contrib import admin

# Register your models here.

from . models import Profile
from . models import Account
from . models import Business
from . models import Rate
from . models import Task
from . models import Project
from . models import Job
from . models import Employment
from . models import Enhancement
from . models import Company

admin.site.register(Profile)
admin.site.register(Account)
admin.site.register(Business)
admin.site.register(Rate)
admin.site.register(Task)
admin.site.register(Project)
admin.site.register(Job)
admin.site.register(Employment)
admin.site.register(Enhancement)
admin.site.register(Company)