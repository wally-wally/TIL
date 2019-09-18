import requests
from pprint import pprint
from faker import Faker
from decouple import config
from django.shortcuts import render, redirect
from .models import Job

# Create your views here.
def index(request):
    return render(request, 'jobs/index.html')


def past_life(request):
    # 사용자로부터 이름 데이터를 받음.
    name = request.POST.get('name')

    # DB에 매칭되는 name 가져오기
    # Job.objects.get(name=name) : 하지만 이건 매칭되는게 없으면 오류가 발생함.
    # get이 더 간단하지만 해당 값이 없을 경우 에러가 발생하기 때문.
    # filter : 한 개던 0 개던 상관없이 무조건 쿼리셋으로 가져옴.(리스트 형식)
    person = Job.objects.filter(name=name).first() # 첫 번째 값을 가져옴

    # DB에 person이 있는지 없는지 판단
    if person: # DB에 기존 이름이 있다면,
        past_job = person.past_job
    else: # DB에 기존 이름이 없다면,(person 이 빈 쿼리셋(==False))
        faker = Faker()
        past_job = faker.job()
        person = Job(name=name, past_job=past_job) # 새로운 레코드를 추가한다.
        person.save()

    # GIPHY (past_job 을 API 에 요청을 보내서 응답을 받음)
    GIPHY_API_KEY = config('GIPHY_API_KEY')
    url = f'http://api.giphy.com/v1/gifs/search?api_key={GIPHY_API_KEY}&q={past_job}&limit=1'
    data = requests.get(url).json()
    try:
        image = data.get('data')[0].get('images').get('original').get('url')
    except IndexError:
        image = None

    context = {'person': person, 'image': image,}
    return render(request, 'jobs/past_life.html', context)