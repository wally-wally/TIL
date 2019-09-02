# **[SSAFY] StartCamp(written by wally-wally)**

----

※참고사항※

- `[SSAFY] StartCamp`는 Startcamp 과정을 학습하면서 헷갈리거나 중요하다고 생각한 내용을 정리한 것임.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

----

<br>

<br>

## 4. 7월 11일(4일차)

### 4.1 Flask 이어서...

#### (1) Flask 초기 파일(`hello.py` => `app.py`) 설정

- 실제 Flask 초기 값은 `hello.py`가 아니고 `app.py`이다.

- `code ~/.bash_profile`에서 첫 번째 줄 삭제하고 저장 후 TERMINAL창에 `source ~/.bash_profile` 입력
- flask 폴더 터미널 위치에서 flask run만 입력하면 실행됨.

> <VSCODE에서 Debug mode 오류 안 뜨게 하기>(1,2,4 : VSCODE 터미널에, 3:생성된 .bashrc에 입력)
>
> => **.bash_profile을 삭제하고 .bashrc생성하는 과정**
>
> - rm -rf ~/.bash_profile
> - code ~/.bashrc
> - `export FLASK_ENV=development`
> - source ~/.bashrc

<br>

#### (2) Flask 추가 예제 - day 계산, HTML TAG 출력

```python
from flask import Flask
from datetime import datetime
app = Flask(__name__)

@app.route('/dday')
def dday():
    today_time = datetime.now() # 오늘 날짜
    endgame = datetime(2019, 11, 29) # 수료 날짜
    dday = endgame - today_time # D-day = 수료 날짜 - 오류 날짜
    return f'{dday.days} 일 남았습니다.'


@app.route('/html')
def html():
    return '<h1>This is HTML TAG</h1>'


@app.route('/html_line')
def html_line():
    return """
    <h1>여러 줄을 보내 봅시다.</h1>
    <ol>
        <li>순서가 있는 태그1</li>
        <li>순서가 있는 태그2</li>
    </ol>
    <ul>
        <li>순서가 없는 태그1</li>
        <li>순서가 없는 태그2</li>
    </ul>
    """
```

<br>

### 4.2 Flask 응용

#### (1) variable routing(변수 라우팅)

![](https://user-images.githubusercontent.com/52685250/61014028-582e7a00-a3c0-11e9-9882-6bb1cbbcc8ec.JPG)

​    ( Converter types 내용 출처 : http://flask.pocoo.org/docs/1.0/quickstart/ )

> string을 받아 출력하기

```python
@app.route('/greeting/<name>') # name이 변수로 지정됨 (원래는 <string:name>으로 써야함, 숫자로 쓸려면 int:name으로 쓰면 됨. 즉, string이 기본값이므로 string일 때만 생략 가능)
def greeting(name): # ()안에 name 변수를 선언해줘야 함수 내에서 인식이 가능
    return f'{name}님 반갑습니다.'
```

> 숫자를 입력받아 세제곱 출력하기

```python
@app.route('/cube/<int:number>')
def cube(number):
    return f'{number}의 세제곱은 {pow(number, 3)}입니다.'
# number ** 3 == pow(number,3)
```

> 식사 인원(number)을 입력하면 여러 메뉴 중 인원 수 만큼의 메뉴를 응답

```python
import random

@app.route('/lunch/<int:people>')
def lunch(people):
    menu = ['냉국수', '치즈돈가스', '짜장면', '짬뽕', '냉모밀', '오므라이스']
    order = random.sample(menu, people)
    return f'{people}명의 메뉴는 {order}입니다.'
    # return은 list를 바로 출력할 수 없음
    # return str(order)도 가능
```

<br>

#### (2) render template

- flask 서버에서 처리하는 것이 아니라 templates 별도의 폴더에서 저장된 요청한 페이지를 응답하여 출력해주는 것을 말한다.

> 예제1

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/greeting/<name>')
def greeting(name):
    return render_template('greeting.html', html_name=name)
```

> app.py랑 똑같은 위치에 templates 폴더를 만들어야 한다.
>
> 이 폴더 안에 출력할 index.html과 같은 파일을 넣으면 된다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {{ html_name }}
</body>
</html>
```

> 예제2

```python
@app.route('/cube/<int:number>')
def cube(number):
    # 연산을 모두 끝내고 변수만 cube.html로 넘긴다.
    result = number ** 3
    return render_template('cube.html', result=result, number=number)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {{ number }}의 세제곱은 {{ result }}입니다.
</body>
</html>
```

> result=result, number=number에서 좌변과 우변의 이름이 같아도 똑같은 건 아니다.

<br>

#### (3) jinja2 활용

- {%  %} 는 사용자에게 보여져서는 안 될 코드를 쓸 때 사용한다.
- 함수를 하나 열면 반드시 {%  %}로 닫아줘야 한다. ex.{% endif %}, {% endfor %}
- 변수를 사용할 때는 {{  }}를 반드시 써준다.

> 예제1. 규현이라는 이름으로 값이 오면 인사하고 아니면 누구세요랴고 묻는다.(app.py의 내용은 (4)-예제1과 동일함)(if문 사용)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!-- 규현이라는 이름으로 값이 오면 인사하고 아니면 누구세요랴고 묻는다. -->
    <!-- jinja2 주석 {# #} -->
    {% if html_name == '규현' %}
        <h2>{{ html_name }} 왔니?</h2>
    {% else %}
        <h2>누구세요?</h2>
    {% endif %} 
</body>
</html>
```

> 예제2.영화목록 출력하기(for문 사용)

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/movie')
def movie():
    movies = ['알라딘', '스파이더맨', '토이스토리4', '기생충', '라이언킹']
    return render_template('movie.html', movies=movies)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>영화 목록</h1>
    {% for movie in movies %}
        <h3>{{ movie }}</h3>
    {% endfor %}
</body>
</html>
```

<br>

### 4.3 Flask Request & Response

- url로 넘기는 것이 아닌 템플릿 내에서 작성해서 이 내용을 Flask로 넘겨주기(ex. 회원가입)

![Flask Request & Response](https://user-images.githubusercontent.com/52685250/61059012-4639ef00-a433-11e9-9e0f-11bad075edbd.jpg)



#### (1) ping-pong page

> app.py

```python
from flask import Flask, render_template, request

@app.route('/ping')
def ping():
    return render_template('ping.html')


@app.route('/pong')
def pong():
    name = request.args.get('data') # 이 안에 입력한 '안녕하세요'가 들어있음
    return render_template('pong.html', name=name)
```

> ping.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width>, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/pong">
        <input type="text" name="data">
        <!-- 입력한 글이 전송되는 것이 아닌 이름표 'data'가 전송되는 것임 -->
        <!-- 실제로는 name='data'가 key로, 입력한 글자가 value로 설정되어 딕셔너리로 전송되는 것임 -->
        <input type="submit" value="퐁!">
    </form>
</body>
</html>
```

> pong.html

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>{{ name }}받았음!!</h1>
</body>
</html>
```

<br>

#### (2) fake naver, fake google  만들기

> app.py

```python
# https://search.naver.com/search.naver?query=

@app.route('/naver')
def naver():
    return render_template('naver.html')
```

> naver.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>네이버 검색!!!</h1>
    <form action="https://search.naver.com/search.naver?"> <!-- '?'표시는 지워도 무방 -->
        <input type="text" name="query">
        <input type="submit" value="검색!">
    </form>
</body>
</html>
```

> app.py

```python
# https://www.google.com/search?q=

@app.route('/google')
def google():
    return render_template('google.html')
```

> google.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>구글 검색!!!</h1>
    <form action="https://www.google.com/search?"> <!-- '?'표시는 지워도 무방 -->
        <input type="text" name="q">
        <input type="submit" value="검색!">
    </form>
</body>
</html>
```

<br>

#### (3) vonvon 만들기

- 이름 받을 페이지, 결과가 나올 페이지 => 페이지 총 2개 필요
- 함수도 동일하게 2개 필요

> app.py

```python
@app.route('/vonvon_send')
def vonvon_send():
    return render_template('vonvon_send.html')


@app.route('/vonvon_view')
def vonvon_view():
    vonvon_name = request.args.get('data')
    vonvon_lists = ['학업능력', '미적감각', '외모', '체력', '재력', '계산능력']
    vonvon_select = random.sample(vonvon_lists,3)
    no1 = vonvon_select[0]
    no2 = vonvon_select[1]
    no3 = vonvon_select[2]
    return render_template('vonvon_view.html', vonvon_name=vonvon_name, vonvon_select=vonvon_select, no1=no1, no2=no2, no3=no3)
```

> vonvon_send.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/vonvon_view">
        <h1>이름을 입력하고 '확인'을 누르세요!</h1>
        <input type="text" name="data">
        <input type="submit" value="확인">
    </form>
</body>
</html>
```

> vonvon_view.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>신이 {{ vonvon_name }}를 만들 때</h2>
    <p> {{ no1 }} 한 스푼... </p>
    <p> {{ no2 }} 두 스푼... </p>
    <p> {{ no3 }} 세 스푼... </p>
</body>
</html>
```

<br>

### 4.4 Dictionary(딕셔너리)(아주 중요!)

#### (1) 딕셔너리의 기본

```python
# 1. 딕셔너리 만들기(1)
lunch = {
    '중국집' : '02-123-1234'
}

# 2. 딕셔너리 만들기(2)
dinner = dict(중국집='02', 일식집='031', 한식집='041')

# 3. 딕셔너리에 내용 추가하기
lunch['분식집'] = '032-123-5131'

# 4. 딕셔너리 내용 가져오기(중요!)
idol = {
    'bts' : {
        '지민' : 25,  # 딕셔너리는 key, value를 확실히 보기위해 enter치자!
        'RM' : 24
    }
}

# RM의 나이는?
idol['bts']['RM'] # 첫 번째 방법(이 방법은 서버입장에서 오류 발생시 다운될 수 있다.)
idol.get('bts').get('RM') # 두 번째 방법(서버입장에서는 .get()을 써야 다운이 안 된다.)
```

> `dict['key']`로 존재하지 않는 key를 접근할 경우 key error가 발생하지만,
>
> `dict.get('key')`로 존재하지 않는 key를 접근할 경우 None 값을 넘겨준다.

<br>

#### (2) 딕셔너리의 활용

```python
lunch = {
    '중국집' : '02-123-1234',
    '분식집' : '032-123-5131',
    '일식집' : '042-385-7239'
}

# 1. 기본 활용
for key in lunch:
    print(key)
    print(lunch[key])

# 2. .items() 메소드 활용
for key, value in lunch.items(): # key, value를 다른 변수명으로 사용해도 무방
    print(key, value) # 하지만 key, value가 통상적인 변수명임.

# 3. value 만 가져오기(.values() 메소드 활용)
for value in lunch.values():
    print(value)

# 4. key 만 가져오기(.keys() 메소드 활용)
for key in lunch.keys():
    print(key)
```

<br>

#### (3) 딕셔너리 예제

> 04_day 디렉터리에 있는 03_dict_practice.py와 04_data_practice_01.py가 있으니 참고.
>
> `03_dict_practice.py` : 디렉터리를 활용한 특정 조건에 맞는 데이터 추출 <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/04_day/dict/03_dict_practice.py">(바로 이동)</a>
> 
> `04_data_practice01.py` : 많은 데이터가 있는 디렉터리에서 특정 조건에 맞는 데이터 찾아오기 <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/04_day/dict/04_data_practice_01.py">(바로 이동)</a>

