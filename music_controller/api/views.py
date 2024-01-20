from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer,LogoutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class AccessRoomView(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code is not None:
            room = Room.objects.filter(code=code)
            if room.exists():
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                self.request.session['room_code'] = room[0].code
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request.': 'Code parameter not found in the request'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset.first()
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):
    def post(self, request, format=None):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            logged_out = serializer.validated_data.get('loggedOut')
            if logged_out:
                # If loggedOut is True, update the session
                request.session['room_code'] = None
                return Response({'message': 'Successfully logged out'})

        data = {
            'code': self.request.session.get('room_code')
        }
        return Response(data, status=status.HTTP_201_CREATED)

