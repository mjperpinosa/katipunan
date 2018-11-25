from django.shortcuts import render
from django.http import JsonResponse

from . models import Profile
from . models import Account
from . models import Business
from . models import Job
from . models import Employment
from . models import Project
from . models import Task
from . models import Rate

from django.db.models import Q

from datetime import datetime
import json
from django.core import serializers

# Create your views here.

def login(request):
    data = {}
    data["message"] = "unsuccessful"
    username = request.GET.get("username", "")
    password = request.GET.get("password", "")
    account = Account.objects.filter((Q(username=username) | Q(email=username)) & Q(password=password))

    if(account.count() == 1):
        account_type = account[0].account_type
        
        profile = Profile.objects.filter(id=account[0].profile.id)
        profile = serializers.serialize("json", profile)
        request.session["profile"] = profile
        account = serializers.serialize("json", account)
        request.session["account"] = account

        data["account"] = account
        data["profile"] = profile
        data["message"] = "successful"
        data["account_type"] = account_type
    else:
        data["description"] = "Username or password is incorrect."
    
    return JsonResponse(data)

def rate(request):
    sup_id = request.session["profile"].id
    employee_id = request.GET("employee_id")
    employee = Profile.objects.get(id=employee_id)
    task_id = request.GET("task_id")
    task = Task.objects.get(id=task_id)
    rating = request.GET("rate")

    rate = Rating.objects.create(employee=employee, task=task, rate=rating)
    rate.save()

    data = {"message": "successful"}
    return JsonResponse(data)

def get_employee_rating(request):
    employee_id = request.GET["employee_id"]

    ratings = Rate.objects.filter(employee=employee_id)
    length = ratings.count()
    rating_sum = 0
    for rating in ratings:
        rating_sum += int(rating.rate)
    ave = rating_sum / length
    data = {"ave_rate": ave}

    return JsonResponse(data)


def get_employee_tasks(request):
    employee = request.session["profile"]
    tasks = Task.objects.filter(assignee=employee.id)

    return JsonResponse(tasks)

def change_task_status(request):
    task_id = request.GET["task_id"]
    new_status = request.GET["status"]

    task = Task.objects.get(id=task_id)
    task.status = new_status
    task.save()

    return JsonResponse({"message": "success"})

def start_task(request):
    task_id = request.GET["task_id"]
    employee_id = request.session[""]

def create_project(request):
    name = request.GET["title"]
    description = request.GET["description"]
    p = request.session["profile"]
    sup = Profile.objects.get(p.id)

    project = Project.objects.create(name=name, description=description, creator=sup)
    project.save()
    data = {"message": "successful"}
    return JsonResponse(data)

def get_projects(request):
    projects = Project.objects.all().values()
    projects = list(projects)
    return JsonResponse({"projects": projects}, safe=False)

def add_enhancements(request):
    task_id = request.GET["task_id"]


def create_task(request):
    project_id = request.GET["id"]
    project = Project.objects.get(id=project_id)
    task = request.GET["task"]
    deadline = request.GET["deadline"]
    priority_points = int(request.GET["priority_points"])

    t = Task.objects.create(project=project, task=task, deadline=deadline, priority_points=priority_points, status=0)
    t.save()

    data = {"message": "successful"}
    return JsonResponse(data)

def assign_task_to_employee(request):
    task_id = request.GET["task_id"]
    assignee_id = request.GET["employee_id"]

    assignee = Profile.objects.get(id=assignee_id)
    task = Task.objects.get(id=task_id)
    task.assignee = assignee
    task.save()

    return JsonResponse({"message": "successful"})

def get_project_tasks(request):
    project_id = request.GET["id"]
    project = Project.objects.get(id=project_id)
    tasks = Task.objects.filter(project=project).values()
    tasks = list(tasks)
    return JsonResponse({"tasks": tasks, "title": project.name, "description": project.description})



def get_projects_tasks(request):
    sup = request.session["profile"]
    account = Account.objects.get(profile=sup.id)

    projects_data = {}

    if(account_type == 1):
        projects = Project.objects.filter(creator=sup)
        for project in projects:
            projects_data[project] = project.task_set()
    
    return JsonResponse(projects_data)

def get_employee_stats(request):
    profile = request.session["profile"]
    employee_id = profile.id

def sign_up_supervisor(request):
    first_name = request.GET["first_name"]
    last_name = request.GET["last_name"]

    profile = Profile.objects.create(first_name=first_name, last_name=last_name)
    profile.save()
    p_id = Profile.objects.latest('id')

    profile = Profile.objects.get(id=p_id.id)

    username = request.GET["username"]
    password = request.GET["password"]

    acc = Account.objects.create(profile=profile, username=username, password=password, account_type=1)
    acc.save()

    data = {"first_name": first_name, "last_name": last_name, "username": username}
    return JsonResponse(data)