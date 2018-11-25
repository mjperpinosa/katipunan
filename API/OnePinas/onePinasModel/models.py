from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.

class Profile(models.Model):
    last_name = models.CharField(max_length=1000, null=True)
    first_name = models.CharField(max_length=1000, null=True)
    middle_name = models.CharField(max_length=1000, null=True)
    contact_number = models.CharField(max_length=1000, null=True)
    street_number = models.CharField(max_length=1000, null=True)
    baranggay = models.CharField(max_length=1000, null=True)
    city = models.CharField(max_length=1000, null=True)
    province = models.CharField(max_length=1000, null=True)
    region = models.CharField(max_length=1000, null=True)
    birthday = models.CharField(max_length=1000, null=True)
    gender = models.CharField(max_length=1000, null=True)
    civil_status = models.CharField(max_length=1000, null=True)
    citizenship = models.CharField(max_length=1000, null=True)
    disability = models.CharField(max_length=1000, null=True)
    sss = models.CharField(max_length=1000, null=True)
    philhealth = models.CharField(max_length=1000, null=True)
    tin = models.CharField(max_length=1000, null=True)
    pagibig = models.CharField(max_length=1000, null=True)
    is_verified = models.IntegerField()
    is_employed = models.IntegerField()

class Business(models.Model):
    name = models.CharField(max_length=1000, null=True)
    description = models.CharField(max_length=1000, null=True)
    industry = models.CharField(max_length=1000, null=True)
    address = models.CharField(max_length=1000, null=True)
    contact_number = models.CharField(max_length=1000, null=True)
    email = models.CharField(max_length=1000, null=True)
    website = models.CharField(max_length=1000, null=True)
    about = models.CharField(max_length=1000, null=True)
    mission = models.CharField(max_length=1000, null=True)
    vision = models.CharField(max_length=1000, null=True)
    history = models.CharField(max_length=1000, null=True)
    summary = models.CharField(max_length=1000, null=True)

class Account(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    username = models.CharField(max_length=1000, null=True)
    email = models.CharField(max_length=1000, null=True)
    password = models.CharField(max_length=1000, null=True)
    account_type = models.IntegerField()
    business_id = models.ForeignKey(Business, on_delete=models.SET_NULL, null=True)
    status = models.IntegerField()
    date_created = models.DateTimeField(default=datetime.now())
    is_deleted = models.IntegerField()


class Job(models.Model):
    business = models.ForeignKey(Business, on_delete=models.SET_NULL, null=True)
    associate = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=1000, null=True)
    description = models.CharField(max_length=1000, null=True)
    requirements = models.CharField(max_length=1000, null=True)
    salary = models.CharField(max_length=1000, null=True)
    status = models.CharField(max_length=1000, null=True)
    date_created = models.DateTimeField(default=datetime.now())
    date_start = models.DateField()
    date_end = models.DateField()
    schedule = models.CharField(max_length=1000, null=True)

class Employment(models.Model):
    employee = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True)
    date_hired = models.DateField()
    date_resigned = models.DateField()
    is_resigned = models.IntegerField()
    reason_for_leaving = models.CharField(max_length=1000, null=True)

class Project(models.Model):
    name = models.CharField(max_length=1000, null=True)
    description = models.CharField(max_length=1000, null=True)
    creator = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    task = models.CharField(max_length=1000, null=True, default="")
    deadline = models.DateField()
    priority_points = models.IntegerField()
    assignee = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    date_time_start = models.DateTimeField(null=True)
    date_time_end = models.DateTimeField(null=True)
    status = models.IntegerField()

    def __str__(self):
        return self.task

class Enhancement(models.Model):
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True)
    enhancement = models.CharField(max_length=1000)
    priority_points = models.IntegerField()

    def __str__(self):
        return self.enhancement

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sender')
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='recipient')
    time_received =  models.DateTimeField(default=datetime.now())
    message = models.CharField(max_length=1000, null=True)
    is_attachment = models.IntegerField()
    is_image = models.IntegerField()
    seen = models.IntegerField()