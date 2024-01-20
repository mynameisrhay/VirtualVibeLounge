from django.urls import path
from .views import RoomView, CreateRoomView, AccessRoomView, UserInRoom

urlpatterns = [
    path('room/', RoomView.as_view(), name='room'),
    path('create/', CreateRoomView.as_view(), name='create-data'),
    path('access/', AccessRoomView.as_view(), name='access-data'),
    path('user-in-room/', UserInRoom.as_view(), name='access-data'),
]
