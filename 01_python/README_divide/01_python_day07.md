# :notebook_with_decorative_cover: 01_python - Day07

---

:white_check_mark: **Python 7월24일(7일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_5.md">(바로 이동)</a>

------

<br>

## 7. 7월24일(7일차)

### 7.1 용어 정리

```python
class Person:                     #=> 클래스 정의(선언, 클래스 객체 생성)
    name = 'unknown'              #=> 멤버 변수(data attribute)
    
    def greeting(self):           #=> 멤버 메서드
        return f'{self.name}' 
```

```python
richard = Person()      # 인스턴스 객체 생성
tim = Person()          # 인스턴스 객체 생성
tim.name                # 멤버 변수(클래스 변수) 호출
tim.greeting()          # 메서드(인스턴스 메서드) 호출
```

<br>

### 7.2 클래스 정의 & 인스턴스 생성

#### (1) 클래스 정의

```python
class TestClass:
    """
    This is Test Class
    hi there!
    """
    name = 'TestClass' # name이 멤버 변수임

print(type(TestClass))
```

- 선언과 동시에 클래스 객체가 생성됨.
- 또한, 선언된 공간은 지역 스코프로 사용된다.
- 정의된 어트리뷰트 중 변수는 멤버 변수로 불리운다.
- 정의된 함수(`def`)는 메서드로 불리운다.
- class AppleBanana와 같이 Camel Case 방식으로 작성한다. cf)def apple_banana : Snake Case

#### (2) 인스턴스 생성

- 인스턴스 객체는 `ClassName()`을 호출함으로써 선언된다.
- 인스턴스 객체와 클래스 객체는 서로 다른 이름 공간을 가지고 있다.
- **인스턴스 => 클래스 => 전역 순으로 탐색을 한다.**

```python
# 인스턴스 = 클래스()
puppy = Dog()
```

- 클래스는 특정 개념을 표현만 할뿐 사용하려면 인스턴스를 생성해야 한다.

```python
tc = TestClass()
print(type(tc))
print(tc.__doc__)

print(tc.name) # tc 는 현재 name이 없습니다. 그래서 TestClass 의 name 을 탐색하여 가져옵니다.
tc.name = 'tc' # 이제 tcc 의 name이 생겼습니다.
print(tc.name) # 그래서 이제는 tc의 name을 가져옵니다. 중요한 건 그렇다고 TestClass의 name이 바뀐것은 아닙니다.
```

<br>

### 7.3 `self` : 인스턴스 객체 자기자신

- C++ 혹은 자바에서의 this 키워드와 동일함.
- 특별한 상황을 제외하고는 **무조건 메서드에서 self를 첫번째 인자로 설정한다.**
- 메서드는 인스턴스 객체가 함수의 첫번째 인자로 전달되도록 되어있다.

```python
class Person:
    name = 'unknown'
    
    def greeting(self):
        return f'hi {self.name}'

p1.name = 'Wally'
p1.greeting()
isinstance(p1, Person)

Person.greeting(p1) # 파이썬은 실제로 이렇게 실행한다. 위와 같은 일을 하는 코드(self를 넣는 이유)
```

<br>

### 7.4 생성자 / 소멸자

```python
class Person:
    
    def __init__(self, name):
        self.name = name
        print('응애! 나는 {}!'.format(self.name))
        
        
    def __del__(self):
        print('{}은 떠난다 안녕...'.format(self.name))
```

```python
me = Person('Wally') # 생성자는 괄호 안에 바로 쓸 수 있다.
print(me.name)
print('-------------')

me = Person('SSAFY')
print(me.name)
# 새로운 me가 생성되면서 기존에 있던 me는 소멸된다.(덮어씌워지는 것과 비슷한 동작)

"""
<다음과 같이 출력됨>

응애! 나는 Wally!
Wally
-------------
응애! 나는 SSAFY!
Wally은 떠난다 안녕...
SSAFY
"""
```
