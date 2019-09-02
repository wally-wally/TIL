# **[SSAFY] StartCamp(written by wally-wally)**

----

※참고사항※

- `[SSAFY] StartCamp`는 Startcamp 과정을 학습하면서 헷갈리거나 중요하다고 생각한 내용을 정리한 것임.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

----

<br>

<br>

## **5. 7월 12일(5일차)**

### 5.1 연산자

- int : 수학 연산자
- string : 문자열 연산자
- list : 리스트 연산자
- dict : 딕셔너리 연산자
- set : 집합 연산자(합집합, 교집합, 차집합)

```python
for num in numbers:
    if num in winner:
        matched += 1
```

```python
matched = (set(winner) & set(numbers))
```

> set 연산자를 이용하여 한 줄로 간단하게 작성할 수 있다.

<br>

### 5.2 Telegram 챗봇 만들기

---

:warning: `Telegram 챗봇 만들기` 과정은 아래 몇 가지 개념 정리와 핵심 중요 코드만 게시함 <a href="https://github.com/wally-wally/TIL/tree/master/00_startcamp/telegram_bot">(코드 보러 가기)</a>

---

#### (1) GET, POST 방식

- GET 방식 : 네이버에 검색 후 주소에 정보가 그대로 나타나는 방식

- POST 방식 : ID, PW와 같은 정보들을 서버 아래로 지나가며 정보가 나타나지 않는 방식

<br>

#### (2) webhook, ngrok

![](https://user-images.githubusercontent.com/52685250/61098420-df9bec00-a499-11e9-9bbd-60ad9ec04b14.jpg)

   ( 이미지 출처 : https://phoby.github.io/ngrok/ )

<br>

#### (3) 배포(deploy) - pythonanywhere

- 무료 배포 사이트인 pythonanywhere을 이용하여 VSCODE에서 flask run을 안 해도 항상 챗봇을 이용할 수 있다.
- 단, webhook 이용시 회원가입을 안 하고 이용하는 경우 8시간만 사용 가능하다.



----

**<Telegram 챗봇의 전반적인 과정>**

![](https://user-images.githubusercontent.com/52685250/61181258-b11b3e00-a65e-11e9-8680-7c3e1a362629.jpg)

----

<br>

### 5.3 슬라이싱(slicing)

```python
a = ['a', 'b', 'c', 'd', 'e']
a[0:2] = ['a', 'b']
a[3:] = ['d', 'e']
a[-4:-2] = ['c', 'd']
a[:-1] = ['a', 'b', 'c', 'd']
```

> 슬라이싱은 요소 사이의 간격을 기준으로 한다.
>
> 앞에서부터 0, 1, 2, 3, ... 이고, 뒤에서부터는 -1, -2, -3, ... 이다.

