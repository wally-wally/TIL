# :computer: AWS 배포 정리(written by gakyung)

## IaaS

- Infrastructire as a Servie
- 공급 업체를 통해 사용자가 서버, 스토리지 및 네트워킹과 같은 컴퓨팅 리소스를 이용할수 있는 클라우드 서비스.
- 사용자는 서비스 제공업체의 인프라 내에서 자체 플랫폼과 어플리케이션을 사용한다.
- aws - EC2 
  - 장점 : 가상의 컴퓨터 한대를 빌려서 그 환경을 처음부터 세팅할 수 있어 원하는 기능을 제약없이 구현할 수 있다는 장점
  - 단점 : 배포를 위해 모든 작업을 스스로 해야하며 그 과정에서 많은 시행착오가 발생할 수 있다. 온전히 개발에만 집중하는 것이 아니라 배포를 위한 부가적인 코스트가 소모된다.

<br>

## PaaS

- Platform as a Service
- 사용자가 어플리케이션을 개발, 관리 및 제공할 수 있는 클라우드 환경으르 제공하는 클라우드 서비스
- 사용자는 사전 구축된 tool 세트를 사용하여 자체 어플리케이션을 개발, 커스터마이즈, 테스트 할 수 있다.

HEROKU / aws : EB(Elastic Beanstalk)

- 장점 : OS, 네트워크, 데이터베이스 등 배포를 위한 환경설정이 되어 있어서 , web app 만 업로드 해도 쉽고 빠르게 배포가 된다. 상대적으로 heroku 가 eb 보다 비교적 빠르고 쉽게 배포되는 편이다.
- 단점 : 이미 환경이 갖추어져 있는 서버에 배포만 하는 특성 상 제한된 기능만을 수행할 수 있다.

<br>

## 배포 전 세팅

movie

view.py

```python
# comments_create
return render(request, 'movies/detail.html', context)
```

1. 배포를 위해서는 세팅즈를 나누어야 됨(settings 분할)
   1. requirements.txt에서 django version 확인(장고버전 2.1.1 ?)
   2. 가상환경 지우고 다시 설치후 pip install requirements.txt

2. 프로젝트 폴더에 settings폴더 추가(settings에 기존 settings를 옮김 & __init__.py 또 빈 파일로 생성) -> settings.py 를 base.py 로 이름바꾸기 -> settings폴더 안에 local.py, production.py 2개의 빈 python파일 생성 ===> 결국 __init__.py, base.py, local.py, production.py 4개 파일 생성
3. base.py에서 local.py 로 옮김

2. ```python
   # local.py
   
   import .base import *
   
   SECRET_KEY ...
   
   DEBUG ....
   
   ALLOWED_HOST ...
   ```

   ```python
   # production.py
   
   import .base import *
   
   SECRET_KEY ...
   
   DEBUG = False
   
   ALLOWED_HOST ...
   ```

   ```python 
   # base.py
   
   # os.path.dirname으로 감싸는거 3개
   # 마지막 소괄호 4개
   ```

   ```python
   # manage.py
   
   def main():
       .... ('....settings.local') # <-- .local 추가
   ```

   ```python
   # myform -  wsgi.py
   
   os.environ .... (... , '....settings.production') # <--.production 추가
   ```

   error 뜨면 migrations 파일 다 지우기

<br>

### KEY를 python decouple로 가리기

```bash
$ pip install python-decouple
```

최상단에 .env 파일 생성 후

```env
SECRET_KEY='...' # 공백 금지
```



```python
# local.py

from decouple import config

SECRET_KEY = config('SECRET_KEY', default='qga74#!94g=j%_!4g87y6b^-5nvrpq5o16rebb=rh(+^caqd*u')
# django secret key generator 에서 key 값 생성 후 default 값에 대입
```



```python
# production.py

from decouple import config

SECRET_KEY = config('SECRET_KEY')
```



이후 서버켜서 동작에 이상이 없는지 확인

----

project의 `urls.py`에서

```python
# urls.py

from movies import views as movies_views

urlpatterns = [
    path('', movies_views.index), # 'movies'는 프로젝트에 맞춰서 작명
]
```

<br>

## 배포

로그인 후 iam 검색

개별 IAM 사용자 생성 ( 사용자 관리자 - 루트ID )

기존 정책 직접 연결

AWSElasticBeanstalkFullAccess 검색 후 id  생성 후 다음 2번

csv 파일 보관 ( ! 털리면 500만원... )

이후 번호로 로그인해서 사용



```bash
$ git status # -> 변경된 상태 출력

$ git checkout -b feature/deploy

$ git add .

$ git commit -m "#..."

$ git status # nothing to commit

$ git push origin #...
```

=> fork 된 github 에서 git pull request & merge

```bash
$ pip freeze > requirements.txt
```

현재 master 가 아닌 feature/deploy 상태

---

```bash
$ mkdir .ebextensions # 폴더 생성

$ touch .ebextensions/django.config
```

```yaml
# django.config (yaml 파일)

#----------------------
색이 안 바뀔 시!
settings.json 에서

//django
"files.associations": {
	...
	"**/*.config": "yaml"
}
#----------------------


option_settings:
  aws:elasticbeanstalk:container:python:
    WSGIPath: 프로젝트이름/wsgi.py # tab 금지! spacebar 만 이용(2칸)
```

```bash
$ touch .ebextensions/db-migrate.config
```

```yaml
container_commands:
  01_migrate:
    command: "python manage.py migrate"
    leader_only: true
  02_chown_sqlitedb:
    command: "sudo chown wsgi db.sqlite3"
    leader_only: true
  03_seed: # Seeding 할 데이터가 있을 경우에만 추가
    command: "python manage.py loaddata seed.json" # bash 에서 dummy data load 하는 커맨드와 동일
    leader_only: true
option_settings:
  aws:elasticbeanstalk:application:environment:
    DJANGO_SETTINGS_MODULE: 프로젝트이름.settings.production # settings 분리했을 경우 - 프로젝트이름.settings.production
```

- 주석은 실제로 작성하면 안된다!



```bash
$ touch .ebextensions/pip-upgrade.config
```

```yaml
commands:
  pip_upgrade:
    command: "sudo /opt/python/run/venv/bin/pip install --upgrade pip"
```



```python
# settings.py or base.py

STATIC_URL = '/static/'
STATIC_ROOT = 'static' # 추가
```



```yaml
# .ebextensions/db-migrate.config

container_commands:
  01_migrate:
    command: "python manage.py migrate"
    leader_only: true
  02_chown_sqlitedb:
    command: "sudo chown wsgi db.sqlite3"
    leader_only: true
  03_seed:
    command: "python manage.py loaddata seed.json"
    leader_only: true
  
  04_collectstatic: # 추가
    command: "python manage.py collectstatic"
    leader_only: true

option_settings:
  aws:elasticbeanstalk:application:environment:
    DJANGO_SETTINGS_MODULE: 프로젝트이름.settings # settings 분리했을 경우 - 프로젝트이름.settings.production
```



```bash
# 관리자 계정 생성 - 배포를 한 후엔 admin을 못만듬.

$ python manage.py createsuperuser
사용자 이름: admin
이메일 주소: 
Password: 
Password (again): 
Superuser created successfully.
```



```bash
# 슈퍼유저에 관한 data를 json 파일로 넘김

$ python manage.py dumpdata 어플리케이션(app).모델 --indent 4 > users.json
# 프로젝트 루트폴더에 만들어진 json 파일을 이동시킴
# ex) accounts.users
```



```yaml
# .ebextensions/db-migrate.config

container_commands:
  01_migrate:
    command: "python manage.py migrate"
    leader_only: true
  02_chown_sqlitedb:
    command: "sudo chown wsgi db.sqlite3"
    leader_only: true
  03_seed:
    command: "python manage.py loaddata seed.json"
    leader_only: true
  04_collectstatic:
    command: "python manage.py collectstatic"
    leader_only: true
    
  05_superuser:
    command: "python manage.py loaddata users.json"
    leader_only: true
    
option_settings:
  aws:elasticbeanstalk:application:environment:
    DJANGO_SETTINGS_MODULE: 프로젝트이름.settings
```



```bash
$ git add .
$ git commit -m "eb-config setting"

$ pip install awsebcli

# astroid==2.3.3 -> 2.3.0
# six==1.13.0 ->1.12.0 으로 수정 후

$ pip install awsebcli

$ eb --version
EB CLI 3.16.0 (Python 3.7.3) # 잘 떠야 함(경로에 한글이 없어야 함!)
```



```bash
$ eb init

...: 10

(aws-access-id): ...
(aws-secret-key): ...
enter
y
1
n
n

code ~/.aws/config
# 새로운 폴더 생성(.elastickbeanstalk & .gitignore 마지막에 어떤 내용 추가)

$ eb create 안겹칠만한고유명
```



```bash
# ServiceError
# decouple, secret_key error

AWS에서 bean 검색 후 에러(error) 클릭
소프트웨어 카테고리 -> 수정
경로 확인(WSGIPath)

밑에 쪽 확인

환경 속성에 
(기존 입력사항 + SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
이름, 키 입력
```



오른쪽 위 작업 -> 환경 재구축



```bash
$ eb status
```

production.py 안에 CMAM 추가

```bash
git add .
git commit -m "..."

$ eb deploy
```



```bash
$ git status

$ git push origin feature/deploy

# 풀리퀘 -> upstream 쪽으로 감 -> merge

# 마스터로 이동 후
$ git pull upstream master

# branch 지우기
```
