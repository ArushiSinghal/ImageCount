from django.urls import path
from . import views

urlpatterns = [
    path('', views.URLView.as_view(), name='url_view'),
]
