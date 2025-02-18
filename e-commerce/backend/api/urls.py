# from django.urls import path
# from .views import hello_world

# urlpatterns = [
#     path('hello/', hello_world, name='hello_world'),
# ]

from django.urls import path
from .views import register, login

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
]