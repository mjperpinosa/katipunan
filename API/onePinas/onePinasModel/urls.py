from django.urls import path
from . import views

urlpatterns = [
    path("api/login", views.login),
    path("api/get_employee_tasks", views.get_employee_tasks),
    path("api/change_task_status", views.change_task_status),
    path("api/change_task_status", views.change_task_status),
    path("api/change_task_status", views.change_task_status),

    path("api/logout", views.logout),

    path("api/create_project", views.create_project),
    path("api/create_task", views.create_task),
    path("api/assign_task_to_employee", views.assign_task_to_employee),
    path("api/get_projects_tasks", views.get_projects_tasks),
    path("api/get_projects", views.get_projects),
    path("api/view_project", views.get_project_tasks),
    path("api/sign_up", views.sign_up_supervisor),
    path("api/rate", views.rate),


]