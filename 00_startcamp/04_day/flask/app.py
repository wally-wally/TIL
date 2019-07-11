from flask import Flask, render_template, request
from datetime import datetime
import random
app = Flask(__name__)

@app.route('/')
def hello():
    # return 'Hello World!'
    return render_template('index.html')


@app.route('/ssafy')
def ssafy():
    return 'This is SSAFY!'


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

# variable routing

@app.route('/greeting/<name>') # name이 변수로 지정됨
def greeting(name):
    # return f'{name}님 반갑습니다.'
    return render_template('greeting.html', html_name=name)


@app.route('/cube/<int:number>')
def cube(number):
    # return f'{number}의 세제곱은 {pow(number, 3)}입니다.'
    # 연산을 모두 끝내고 변수만 cube.html로 넘긴다.
    result = number ** 3
    return render_template('cube.html', result=result, number=number)


@app.route('/lunch/<int:people>')
def lunch(people):
    menu = ['냉국수', '치즈돈가스', '짜장면', '짬뽕', '냉모밀', '오므라이스']
    order = random.sample(menu, people)
    return f'{people}명의 메뉴는 {order}입니다.'


@app.route('/movie')
def movie():
    movies = ['알라딘', '스파이더맨', '토이스토리4', '기생충', '라이언킹']
    return render_template('movie.html', movies=movies)


@app.route('/ping')
def ping():
    return render_template('ping.html')


@app.route('/pong')
def pong():
    #print(request.args)
    name = request.args.get('data') # 이 안에 입력한 '안녕하세요'가 들어있음
    return render_template('pong.html', name=name)

# https://search.naver.com/search.naver?query=

@app.route('/naver')
def naver():
    return render_template('naver.html')

# https://www.google.com/search?q=

@app.route('/google')
def google():
    return render_template('google.html')


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