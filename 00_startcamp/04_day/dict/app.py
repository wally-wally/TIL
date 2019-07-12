import requests
from flask import Flask, render_template, request

app = Flask(__name__)

# 1. 로또 회차/내 번호 입력 페이지
@app.route('/lotto_check')
def lotto_check():
    return render_template('lotto_check.html')

# 2. 결과 페이지
@app.route('/lotto_result')
def lotto_result():
    # (1) 회차 번호 받아오기
    num = request.args.get('num')
    # (2) 동행복권에 요청을 보내 응답을 받는다.
    res = requests.get(f'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={num}')
    # (3) json 형태로 바꿔준다. (우리가 크롬에서 보고있는 깔끔한 결과와 동일한 모습)
    lotto = res.json()

    # (4) 그 회차 당첨번호 6개만 가져오기
    winner = []
    for i in range(1, 7):
        winner.append(lotto[f'drwtNo{i}'])

    # (5) 내 번호 리스트 만들기
    numbers = []
    for num in request.args.get('numbers').split():
        numbers.append(int(num))

    # (6) 등수 가리기(몇개 맞았는지 교집합이 필요)
    matched = 0
    # (7) 내 번호 요소를 뽑아서 당첨번호 리스트에 있는지 확인.
    # 내 번호 리스트를 돌면서 / 뽑은 번호 하나가 각각 winner 리스트에 있는지 확인
    for num in numbers:
        if num in winner:
            matched += 1
    # 입력한 숫자가 6개일 때만 등수 판단
    if len(numbers) == 6:
        if matched == 6:
            result = '1등입니다'
        elif matched == 5:
            # 보너스 번호가 내 로또 번호 리스트에 존재하면,
            if lotto['bnusNo'] in numbers:
                result = '2등입니다'
            else:
                result = '3등입니다'
        elif matched == 4:
            result = '4등입니다'
        elif matched == 3:
            result = '5등입니다'
        else:
            result = '꽝입니다'
    else:
        result = '번호의 수가 6개가 아닙니다.'
    
    return render_template('lotto_result.html', winner=winner, numbers=numbers, result=result)