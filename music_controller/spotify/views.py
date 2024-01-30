from django.shortcuts import render
from .secrets import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI
from django.http import JsonResponse
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from django.shortcuts import redirect


def authenticate_spotify(request):
    sp_oauth = SpotifyOAuth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI,
                            scope='user-library-read user-read-playback-state user-modify-playback-state')
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)


def spotify_callback(request):
    sp_oauth = SpotifyOAuth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI,
                            scope='user-library-read user-read-playback-state user-modify-playback-state')

    token_info = sp_oauth.get_access_token(request.GET.get('code'))
    # Save token_info in the session or database for future requests

    return redirect('http://localhost:5173/test')

