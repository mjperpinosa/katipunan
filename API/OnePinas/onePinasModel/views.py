from django.shortcuts import render
from django.http import JsonResponse

from . models import Profile
from . models import Account
from . models import Business
from . models import Job
from . models import Employment
from . models import Project

from django.db.models import Q

from datetime import datetime
import json

# Create your views here.

def login(request):
    data = {}
    data["message"] = "unsuccessful"
    username = request.GET.get("username", "")
    password = request.GET.get("password", "")
    account = Account.objects.filter((Q(username=username) | Q(email=username)) & Q(password=password))

    if(len(account) > 0):
        account_type = account.account_type
        profile = Profile.objects.get(id=account.profile.id)
        request.session["profile"] = profile
        request.session["account"] = account
        data["message"] = "successful"
        data["account_type"] = account_type
    else:
        data["description"] = "Username or password is incorrect."
    
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
    # p = request.session["profile"]
    # sup = Profile.objects.get(p.id)

    project = Project.objects.create(name=name, description=description)
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
    task = request.GET["task"]
    deadline = request.GET["deadline"]
    priority_points = request.GET["priority_points"]

    t = Task.objects.create(task=task, deadline=deadline, priority_points=priority_points)
    t.save()

def assign_task_to_employee(request):
    task_id = request.GET["task_id"]
    assignee_id = request.GET["employee_id"]

    assignee = Profile.objects.get(id=assignee_id)
    task = Task.objects.get(id=task_id)
    task.assignee = assignee
    task.save()

    return JsonResponse({"message": "successful"})

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
    