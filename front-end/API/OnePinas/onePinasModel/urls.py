from django.urls import path
from . import views

urlpatterns = [
    path("api/login", views.login),
    path("api/get_employee_tasks", views.get_employee_tasks),
    path("api/change_task_status", views.change_task_status),
    path("api/change_task_status", views.change_task_status),
    path("api/change_task_status", views.change_task_status),

    path("api/assign_task_to_employee", views.assign_task_to_employee),
    path("api/get_projects_tasks", views.get_projects_tasks),

]