from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.

class Profile(models.Model):
    last_name = models.CharField(max_length=1000, null=True, blank=True)
    first_name = models.CharField(max_length=1000, null=True, blank=True)
    middle_name = models.CharField(max_length=1000, null=True, blank=True)
    contact_number = models.CharField(max_length=1000, null=True, blank=True)
    street_number = models.CharField(max_length=1000, null=True, blank=True)
    baranggay = models.CharField(max_length=1000, null=True, blank=True)
    city = models.CharField(max_length=1000, null=True, blank=True)
    province = models.CharField(max_length=1000, null=True, blank=True)
    region = models.CharField(max_length=1000, null=True, blank=True)
    birthday = models.CharField(max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=1000, null=True, blank=True)
    civil_status = models.CharField(max_length=1000, null=True, blank=True)
    citizenship = models.CharField(max_length=1000, null=True, blank=True)
    disability = models.CharField(max_length=1000, null=True, blank=True)
    sss = models.CharField(max_length=1000, null=True, blank=True)
    philhealth = models.CharField(max_length=1000, null=True, blank=True)
    tin = models.CharField(max_length=1000, null=True, blank=True)
    pagibig = models.CharField(max_length=1000, null=True, blank=True)
    is_verified = models.IntegerField(null=True, blank=True)
    is_employed = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.first_name

class Business(models.Model):
    name = models.CharField(max_length=1000, null=True, blank=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    industry = models.CharField(max_length=1000, null=True, blank=True)
    address = models.CharField(max_length=1000, null=True, blank=True)
    contact_number = models.CharField(max_length=1000, null=True, blank=True)
    email = models.CharField(max_length=1000, null=True, blank=True)
    website = models.CharField(max_length=1000, null=True, blank=True)
    about = models.CharField(max_length=1000, null=True, blank=True)
    mission = models.CharField(max_length=1000, null=True, blank=True)
    vision = models.CharField(max_length=1000, null=True, blank=True)
    history = models.CharField(max_length=1000, null=True, blank=True)
    summary = models.CharField(max_length=1000, null=True, blank=True)

class Account(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name="profile")
    creator = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name="employee_creator")    
    username = models.CharField(max_length=1000, null=True, blank=True)
    email = models.CharField(max_length=1000, null=True, blank=True)
    password = models.CharField(max_length=1000, null=True, blank=True)
    account_type = models.IntegerField(null=True, blank=True)
    business_id = models.ForeignKey(Business, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.IntegerField(null=True, blank=True)
    date_created = models.DateTimeField(default=datetime.now())
    is_deleted = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.username

class Company(models.Model):
    supervisor = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name="supervisor")    
    employee = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True, related_name="employee")    

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
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)
    task = models.CharField(max_length=1000, null=True, default="", blank=True)
    deadline = models.CharField(max_length=20)
    priority_points = models.IntegerField()
    assignee = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True)
    date_time_start = models.DateTimeField(null=True, blank=True)
    date_time_end = models.DateTimeField(null=True, blank=True)
    status = models.IntegerField()

    def __str__(self):
        return self.task

class Enhancement(models.Model):
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True)
    enhancement = models.CharField(max_length=1000)
    priority_points = models.IntegerField()

    def __str__(self):
        return self.enhancement

class Rate(models.Model):
    employee = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True)
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True, blank=True)
    rate = models.IntegerField(null=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sender')
    recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='recipient')
    time_received =  models.DateTimeField(default=datetime.now())
    message = models.CharField(max_length=1000, null=True)
    is_attachment = models.IntegerField()
    is_image = models.IntegerField()
    seen = models.IntegerField()