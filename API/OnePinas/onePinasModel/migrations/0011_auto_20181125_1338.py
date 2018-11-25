# Generated by Django 2.1.3 on 2018-11-25 05:38

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('onePinasModel', '0010_auto_20181125_1332'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2018, 11, 25, 13, 38, 51, 771758)),
        ),
        migrations.AlterField(
            model_name='job',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2018, 11, 25, 13, 38, 51, 772653)),
        ),
        migrations.AlterField(
            model_name='message',
            name='time_received',
            field=models.DateTimeField(default=datetime.datetime(2018, 11, 25, 13, 38, 51, 775937)),
        ),
        migrations.AlterField(
            model_name='task',
            name='assignee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='onePinasModel.Account'),
        ),
        migrations.AlterField(
            model_name='task',
            name='date_time_end',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='date_time_start',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='task',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='onePinasModel.Project'),
        ),
        migrations.AlterField(
            model_name='task',
            name='task',
            field=models.CharField(blank=True, default='', max_length=1000, null=True),
        ),
    ]
