from django.urls import path
from .views import *

urlpatterns = [
    path('spotify-authenticate/', authenticate_spotify, name='spotify-authenticate'),
    path('redirect/', spotify_callback, name='spotify-redirect'),
]
