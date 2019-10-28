from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MusicSerializer, ArtistSerializer
from .models import Music, Artist

@api_view()
def music_list(request):
    musics = Music.objects.all()
    serializer = MusicSerializer(musics, many=True) # 단일 객체가 아닌 여러 개를 가져올 경우 many=True를 작성
    # Serializer는 musics 라고 하는 queryset을 json 타입으로 바꿔준다.
    return Response(serializer.data)


@api_view(['GET']) # GET만 허용할 경우
def music_detail(request, music_pk):
    music = get_object_or_404(Music, pk=music_pk)
    serializer = MusicSerializer(music) # 단일 객체이므로 music만 작성
    return Response(serializer.data)


@api_view(['GET'])
def artist_list(request):
    artists = Artist.objects.all()
    serializer = ArtistSerializer(artists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def artist_detail(request, artist_pk):
    artist = get_object_or_404(Artist, pk=artist_pk)
    serializer = ArtistSerializer(artist)
    return Response(serializer.data)