# 배포하기

## IaaS

- Infrastructure as a Service
- 공급 업체를 통해 사용자가 서버, 스토리지 및 네트워킹과 같은 컴퓨터 리소르르 이용할 수 있는 클라우드 서비스
- 사용자는 서비스 제공업체의 인프라 내에서 자체 플랫폼과 어플리케이션을 사용한다.
- aws - EC2
  - 장점
    - 가상의 컴퓨터 한대를 빌려서 그 환경을 처음부터 세팅할 수 있어 원하는 기능을 제약없이 구현할 수 있다는 장점
  - 단점
    - 배포를 위한 모든 작업을 스스로 해야하며 그 과정에서 많은 시행착오가 발생할 수 있다.
    - 온전히 개발에만 집중하는 것이 아니라 배포를 위한 부가적인 코스트가 소모된다.

## PaaS

- Platform as a Service
- 사용자가 어플리케이션을 개발, 관리 및 제공할 수 있는 클라우드 환경을 제공하는 클라우드 서비스
- 사용자는 사전 구축된 tool 세트를 사용하여 자체 어플리케이션을 개발, 커스터마이즈, 테스트 할 수 있다.
- HEROKU, aws - EB(Elastic Beanstalk)
  - 장점
    - OS, 네트워크, 데이터베이스 등 배포를 위한 환경설정이 되어 있어서, web app만 업로드 해도 쉽고 빠르게 배포가 된다.
    - 상대적으로 heroku가 eb보다 빠르고 쉽게 배포되는 편이다.
  - 단점
    - 이미 환경이 갖추어져 있는 서버에 배포만 하는 특성한 제한된 기능만을 수행할 수 있다.

## Setting

- 2.2.x 지원 안되므로 requirements에서 django를 2.1.1로 변경해준다. `Django==2.1.1`
- 가상환경을 지우고 다시 설치후 requirements 설치해준다.

### Settings 분리하기

- 개인 정보나 키 등을 숨기기 위해
- 프로젝트 폴더/settings 폴더를 만들고 `__init__.py` 를 만들고
- 기존 settings.py를 settings폴더에 넣고 settings.py이름을 base.py로 바꾼다.
- production.py와 local.py를 추가한다.
- base.py에서 아래 3개를 잘라내서 local에 붙여넣는다. 

```python
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!4^95wv7e_d!srjwt$@!=!sab6rju%pqvr942i65)bxi_c*f9!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# if DEBUG:
#     import mimetypes
#     mimetypes.add_type("application/javascript", ".js", True)

ALLOWED_HOSTS = []
```

- `from .base import *` 추가하고
- production.py는 DEBUG = False로 해준다.
- base.py는 아래처럼 BASE_DIR를 한번더 os.~~로 감싸준다.

```python
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
```

- manage.py 에서 아래처럼 마지막에 `.local`를 추가

```python
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'triplek.settings.local')
```

- wsgi.py 에서 수정 `.production` 추가

```python
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'triplek.settings.production')
```

- `pip install python-decouple` 설치
- 최상단에 .env 만들고

```python
SECRET_KEY='local.py에 있는 키'
```

-  https://miniwebtool.com/django-secret-key-generator/ 

```python
# local.py
SECRET_KEY = config('SECRET_KEY', default='generator로 만든 키')
```

```python
# production.py
SECRET_KEY = config('SECRET_KEY') #여긴 그냥 이렇게만 쓰면됨
```

- 서버 실행 시 나오는 기본 index 주소 변경

```python
# project/urls.py
from movies import views as movies_views

urlpatterns = [
    path('', movies_views.index),
    ...
```

------

## AWS 배포하기

-  로그인 후 `iam`검색 후 접속
- `개별 IAM사용자 생성` 사용자 관리 접속
- 사용자 추가 - 액세스 유형 둘다 선택 - 사용자 지정 비번 - 비번 재설정필요 체크 해제 - 다음
- 기본정책 직접 연결
- `beanstalk`검색  `AWSElasticBeanstalkFullAccess` 선택 - 다음 2번 - 사용자만들기
- .csv 다운로드 후 잘 보관 (link의 앞 숫자들이 iam ID이다.)
- 이제부터 서버를 만들거나 할때는 이 숫자 iam ID로 로그인한다.

------

다시 vs code 와서

- branch 하나 생성 후 git add, commit, push origin <branch>
- `pip freeze > requirements.txt` 한번 해준다.
- 그리고 아래 명령어 대로 진행

------

## Elastic Beanstalk
> 반드시 django 2.1.1 로 진행
```bash
$ git checkout -b feature/deploy
```
```bash
$ mkdir .ebextensions
```
```bash
$ touch .ebextensions/django.config
```
```yaml
# django.config
# yaml파일에서는 절대 tab 사용하지않고 무조건 space bar로 indent 한다.
# 또한 yaml에는 주석이 있어서는 안된다.
option_settings:
  aws:elasticbeanstalk:container:python:
    WSGIPath: 프로젝트이름/wsgi.py
    
# vscode 확장 프로그램에서 yaml 설치하고
# 그래도 빨간색으로 안 변하면 settings.json에서 
# files.associations에 "**/*.config": "yaml"추가
```
```bash
$ touch .ebextensions/db-migrate.config
```
```yaml
# 명령어 작성하는 과정
container_commands:
  01_migrate:
    command: "python manage.py migrate"
    leader_only: true
  02_chown_sqlitedb:
    command: "sudo chown wsgi db.sqlite3"
    leader_only: true
  03_seed: # Seeding 할 데이터가 있을 경우에만 추가
    command: "python manage.py loaddata seed.json"
    leader_only: true
option_settings:
  aws:elasticbeanstalk:application:environment:
    DJANGO_SETTINGS_MODULE: 프로젝트이름.settings # settings 분리했을 경우 - 프로젝트이름.settings.production
```
- 주석은 실제로 작성하면 안된다.
```bash
$ touch .ebextensions/pip-upgrade.config
```
```yaml
commands:
  pip_upgrade:
    command: "sudo /opt/python/run/venv/bin/pip install --upgrade pip"
```
---
```python
# settings.py or base.py
STATIC_URL = '/static/'
STATIC_ROOT = 'static' # 추가. 배포되는 순간 파일들이 어디로 들어갈지를 정하는 키워드
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
# 관리자 계정 생성
$ python manage.py createsuperuser
사용자 이름: admin
이메일 주소: 
Password: 
Password (again): 
Superuser created successfully.
```
```bash
$ python manage.py dumpdata 어플리케이션(app).모델 --indent 4 > users.json # ex) accounts.User
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
---
```bash
$ git add .
$ git commit -m "..."
```
```bash
$ pip install awsebcli
# astroid 에러 발생 시 astroid==2.3.0, six==1.12.0 로 바꾸고 다시 인스톨
$ eb --version
EB CLI 3.16.0 (Python 3.7.3)
# 버전이 안뜨면 경로에 한글이 있는 경우일 가능성이 크므로
# 프로젝트 폴더를 옮기지말고 경로의 한글이름만 영어로 바꿔준다.
```
```bash
$ eb init
# 10 enter
# id랑 key 쓰고 -> default 폴더는 그냥 enter -> y -> 1-> n-> n
```

`eb create <원하는 고유한 이름>` 으로 eb 생성하고 5분정도 기다리면 ServiceError 뜸. (SECRET_KEY not found)

iam 계정으로 aws 로그인 해서 bean 검색하여  Elastic Beanstalk로 들어감.

빨간색 뜨는 정보 들어가서 왼쪽 탭에 구성 -> 소프트웨어 수정

환경 속성에 이름: 값 잘 들어갔는지 확인.

키를 3개를 더 넣을 거임(총 4개). 입력 후 적용

- DJANGO_SETTINGS_MODULE
- SECRET_KEY
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

` Your WSGIPath refers to a file that does not exist. `에러 뜰 거임

오른쪽 위에 작업->환경 재구축 -> 재구축

eb status 로 CNAME 확인 후 production `ALLOWED_HOSTS`에 추가

다시 add . / commit 까지하고

eb는 push로 보내는게 아니로 `eb deploy`로 보낸다.