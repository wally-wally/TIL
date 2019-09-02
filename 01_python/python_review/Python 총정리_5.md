# :notebook_with_decorative_cover: 01_python - (5) OOP_basic

<br>

## 1. OOP with python

### 1.1 클래스, 인스턴스, 속성, 메서드

- 클래스(Class)
  - 객체를 표현하는 문법.
  - 같은 종류(또는 문제 해결을 위한)의 집단에 속하는 **속성(attribute)**과 **행위(behavior)**를 정의한 것으로 객체지향 프로그램의 기본적인 사용자 정의 데이터형(user define data type)이라고 할 수 있다
  - 클래스는 프로그래머가 아니지만 해결해야 할 문제가 속하는 영역에 종사하는 사람이라면 사용할 수 있고, 다른 클래스 또는 외부 요소와 **독립적으로** 디자인하여야 한다.

- 인스턴스(instance)
  - 클래스의 인스턴스/객체(실제로 메모리상에 할당된 것)이다.
  - 객체는 자신 고유의 속성(attribute)을 가지며 클래스에서 정의한 행위(behavior)를 수행할 수 있다.
  - 객체의 행위는 클래스에 정의된 행위에 대한 정의(메서드)를 공유함으로써 메모리를 경제적으로 사용한다.

- 속성(attribute)
  - 클래스/인스턴스 가 가지고 있는 속성(값)

- 메서드(Method)
  - 클래스/인스턴스 가 할 수 있는 행위(함수)

| class / type | instance                 | attributes       | methods                                |
| ------------ | ------------------------ | ---------------- | -------------------------------------- |
| `str`        | `''`, `'hello'`, `'123'` | _                | `.capitalize()`, `.join()`, `.split()` |
| `list`       | `[]`, `['a', 'b']`       | _                | `.append()`, `reverse()`, `sort()`     |
| `dict`       | `{}`, `{'key': 'value'}` | _                | `.keys()`, `.values()`, `.items().`    |
| `int`        | `0`, `1`, `2`            | `.real`, `.imag` |                                        |

```python
# 복소수를 하나 만들어보고, 타입을 출력해봅시다.
img_number = 3 + 4j # img_number가 인스턴스
print(type(img_number)) # => <class 'complex'>

# 허수부랑 실수부를 함께 출력해봅시다. complex 객체의 실수 속성과 허수 속성이라고도 표현 가능합니다.
# 클래스에 있는 걸 직접 사용하지 못하므로 img_number가 중간자 역할을 하여 속성을 사용할 수 있음
print(img_number.real) # => 3.0
print(img_number.imag) # => 4.0
```

```python
# 리스트를 하나 만들고 정렬해봅시다. list 객체의 메서드 실행이라고도 표현 가능합니다.
my_list = [3, 2, 1] # my_list가 인스턴스
print(type(my_list)) # => <class 'list'>

# list class 의 객체들이 할 수 있는 것들을 알아봅시다. (list 객체가 가지고 있는 모든 속성과 메서드를 보여줍니다.)
my_list.sort() # .sort()가 메서드
print(my_list) # => [1, 2, 3]

print(dir(list))
# append는 list 입장에서 '함수'라고 부르지만 my_list 입장에서는 '메서드'라고 부른다.
# ['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

### 1.2 예제로 OOP 기본 익히기

```python
power = False # 초기 상태는 OFF 상태
number = ''
book = {}
model = 'galaxy s10'

def on():
    if not power: # 할당도 되기 전에 평가를 하네?
        #power = True # 할당
        return power

def off():
    if power:
        power = False
        return power

def set_my_number(number):
    if power:
        number = number

def call(number):
    if power:
        if number in book:
            return f'{book[number]} 에게 전화중입니다.'
        else:
            return f'{number} 에게 전화중입니다.'

def save(name, number):
    if power:
        book[name] = number
        return book
```

```python
# 핸드폰을 켜지 않고 이런저런 일을 해 봅시다.
call('01012345678')
power # => False

# 핸드폰을 켜봅시다. 
on() # => UnboundLocalError 발생

# 켜지지 않습니다.. 어째서 그런 걸까요?
```

- namespace(이름공간) 때문이다!
- power를 할당하기 전에 평가가 먼저 진행되었기 때문이다.
- 함수 바깥에 있는 power(global)와 함수 안의 power(lexical(local과 동일))는 서로 다른 이름공간에 존재합니다.
- 결국 on(), off() 를 사용할 수 없기 때문에 직접 power에 값을 할당해야 합니다.

```python
def on():
    if not power: # 할당도 되기 전에 평가를 하네?
        #power = True # 할당
        return power
    
# 위 구문을 아래와 같이 바꿔야 함

def on():
    if not power: # 할당도 되기 전에 평가를 하네?
        power = True # 할당
        return power
```

- 문제점 발생
  - 현재 코드로 구현한 핸드폰에서 잘못되었다고 느껴지거나 문제가 발생할 만한 요소들을 이야기 해 봅시다.
  - 기존의 방식대로 다른 사람의 핸드폰을 구현해야 한다면? 그 수가 엄청 많다면?? 새 파일(모듈)?

<br>

## 2. 클래스 및 인스턴스

### 2.1 클래스 정의하기 (클래스 객체 생성하기)

- 선언과 동시에 클래스 객체가 생성됨.
- 또한, 선언된 공간은 지역 스코프로 사용된다.
- 정의된 어트리뷰트 중 변수는 멤버 변수로 불리운다.
- 정의된 함수(`def`)는 메서드로 불리운다.
- class AppleBanana와 같이 Camel Case 방식으로 작성한다. cf)def apple_banana : Snake Case

```python
class TestClass:
    """
    This is Test Class
    hi there!
    """
    name = 'TestClass' # name이 멤버 변수임

print(type(TestClass)) # =>  <class 'type'>
```

<br>

### 2.2 인스턴스 생성하기

- 인스턴스 객체는 `ClassName()`을 호출함으로써 선언된다.
- 인스턴스 객체와 클래스 객체는 서로 다른 이름 공간을 가지고 있다.
- **인스턴스 => 클래스 => 전역 순으로 탐색을 한다.**
- `인스턴스 = 클래스()` => `puppy = Dog()`

- 클래스는 특정 개념을 표현만 할뿐 사용하려면 인스턴스를 생성해야 한다.

```python
# TestClass 의 인스턴스를 만들어 봅시다.

tc = TestClass()
print(type(tc)) # => <class '__main__.TestClass'>
print(tc.__doc__)
# This is Test Class
# hi there!
```

```python
print(tc.name) # tc 는 현재 name이 없습니다. 그래서 TestClass 의 name 을 탐색하여 가져옵니다.
# => TestClass
tc.name = 'tc' # 이제 tcc 의 name이 생겼습니다.
print(tc.name) # 그래서 이제는 tc의 name을 가져옵니다. 중요한 건 그렇다고 TestClass의 name이 바뀐것은 아닙니다.
# => tc
```

> [예시] 클래스 정의 및 인스턴스 생성하기

```python
class Phone:
    power = False
    number = ''
    book ={}
    model = 'galaxy S10'
    
    def on(self):
        if not self.power:
            self.power = True
            print('-------')
            print(f'{self.model}')
            print('-------')
    
    def off(self):
        if self.power:
            self.power = False
            print('꺼짐')
```

```python
p = Phone() # => 인스턴스 생성
print(p.model) # => galaxy S10
```

```python
my_phone = Phone()
print(my_phone.power) # => False

my_phone.on()
"""
-------
galaxy S10
-------
"""

print(my_phone.power) # => True
my_phone.model # => 'galaxy S10'
my_phone.model = 'iphone xs max'
my_phone.model # => 'iphone xs max'
my_phone.off() # => 꺼짐
my_phone.on()
"""
-------
iphone xs max
-------
"""
```

```python
# my_phone 이 Phone 클래스의 인스턴스인지 확인해 봅시다.
isinstance(my_phone, Phone) # isinstance(인스턴스, 메서드)
# => True

# 같은 질문이지만, 다르게 물어 봅시다.
type(my_phone) == Phone # => True

# type을 확인해봅시다.
type(my_phone) # => __main__.Phone

# my_phone 을 출력해 봅시다.
print(my_phone) # => <__main__.Phone object at 0x000001D53428B828>

# my_phone 을 다르게 볼까요?
my_phone # => <__main__.Phone at 0x1d53428b828>
```

- class Phone 내부에 다음 구문을 추가해보자.

```python
    def __str__(self):
        return 'print 안에 넣으면 이렇게 나오고'
    
    def __repr__(self) : 
        return '그냥 객체만 놔두면 이게 나온다.'
```

```python
p = Phone()
print(p) # => print 안에 넣으면 이렇게 나오고
p # => 그냥 객체만 놔두면 이게 나온다.
```

- `__str__ ` : 인스턴스를 print() 할 때 보여질 값을 반환(반환 값은 반드시 문자열)

- `__repr__ ` : 인스턴스 자체가 반환할 값을 새로운 문자열 표현식으로 반환(반환 값은 반드시 문자열)

<br>

### 2.3 인스턴스와 객체

```python
a = int(10)
b = int(20)
# a, b는 객체
# a, b는 int 클래스의 인스턴스
```

- 인스턴스와 객체는 같은 것을 의미한다.
- 보통 객체만 지칭할 때는 단순히 객체(object)라고 부름.
- 하지만 클래스와 연관지어서 말할 때는 인스턴스(instance)라고 부름.

> [예시] MyList 만들기

```python
class MyList:
    data = []
    
    def append(self, element):
        self.data += [element]
        
    def pop(self):
        # 리스트의 마지막 값을 찾아야 함
        p = self.data[-1]
        self.data = self.data[:-1]
        return p
        
    def reverse(self):
        self.data = self.data[::-1]
        
    def count(self):
        return len(self.data)
    
    def clear(self):
        self.data = []
        
    def __repr__(self):
        return f'내 리스트에는 {self.data} 이 담겨있다.'
```

![캡처](https://user-images.githubusercontent.com/52685250/62005467-c6b85980-b16e-11e9-8488-1909446cd04b.JPG)

<br>

### 2.4 용어 정리

![캡처01](https://user-images.githubusercontent.com/52685250/62005489-f9fae880-b16e-11e9-944e-c19528d2e217.JPG)

<br>

### 2.5 클래스 변수와 인스턴스 변수

- 클래스 변수
  - 그 클래스의 모든 인스턴스에서 공유되는 어트리뷰트와 메서드를 위한 것
  - 모든 인스턴스가 공유

- 인스턴스 변수
  - 인스턴스별 데이터를 위한 것
  - 각 인스턴스들의 고유 변수

```python
class Dog:

    kind = 'tori'          # 클래스 변수 (모든 인스턴스가 공유)

    def __init__(self, name):
        self.name = name    # 인스턴스 변수 (각 인스턴스들의 고유 변수)
```

```python
class Person:
    name = 'unknown'
    
    def greeting(self):
        return f'hi {self.name}'
```

```python
p1 = Person()
p1.greeting() # => 'hi unknown'

isinstance(p1, Person) # => True
```

<br>

### 2.6 `self` : 인스턴스 객체 자기자신

- C++ 혹은 자바에서의 this 키워드와 동일함.
- 특별한 상황을 제외하고는 **무조건 메서드에서 self를 첫번째 인자로 설정한다.**
- 메서드는 인스턴스 객체가 함수의 첫번째 인자로 전달되도록 되어있다.

```python
p1.name = 'Wally'
p1.greeting() # => 'hi wally'
```

<br>

### 2.7 클래스-인스턴스 간의 이름공간

- 클래스를 정의하면, 클래스 객체가 생성되고 해당되는 이름 공간이 생성된다.
- 인스턴스를 만들게 되면, 인스턴스 객체가 생성되고 해당되는 이름 공간이 생성된다.
- 인스턴스의 어트리뷰트가 변경되면, 변경된 데이터를 인스턴스 객체 이름 공간에 저장한다.
- 즉, 인스턴스에서 특정한 어트리뷰트에 접근하게 되면 인스턴스 => 클래스 순으로 탐색을 한다.

```python
# 클래스 선언코드에서 메서드를 정의할 때, 왜 self 를 꼭 써준걸까요?
class Person:
    name = 'unknown' # 이 name(Global)과
    
    def greeting(self):
        return f'hi {name}' # 이 name(Local)은 서로 상관이 전혀 없다.(서로 이름 공간이 다르므로)

p2 = Person()
p2.greeting()

    # 동작하지 않습니다. 생성된 객체는 method scope 안에서 name 이 뭔지 모른다.
```

```python
# 함수 scope 를 다시한번 짚고 넘어갑시다.
p2.name
# 이것은 출력됩니다. instance => class 순으로 찾다가 class 에서 찾은 name 입니다.
```

---

```python
# 다시, 클래스 선언코드에서 메서드를 정의할 때, 왜 self 를 꼭 써준걸까요?
class Person:
    name = 'unknown'
    
    def greeting(self):
        return f'hi {self.name}' # 이번에는 '내 이름' 을 찾아봅니다.
    
p2 = Person()
p2.greeting() # => 'hi unknown'

# 현재 출력되고 있는 것이 p2 의 name 처럼 보입니다.
# 하지만 p2 는 name 이 없습니다. 즉, p2.name 처럼 내 안에 name 을 찾고 없으니 class 로 가서 name 을 찾은 겁니다.
```

```python
p2.name = 'Jack'
p2.name # => 'Jack'
p2.greeting() # => 'hi Jack'
```

<br>

### 2.8 생성자 / 소멸자

- 생성자
  - 인스턴스 객체가 생성될 때 호출되는 함수.

- 소멸자
  - 인스턴스 객체가 소멸(파괴)되기 직전에 호출되는 함수.

```python
def __init__(self):
    print('생성될 때 자동으로 호출되는 메서드입니다.')

def __del__(self):
    print('소멸될 때 자동으로 호출되는 메서드입니다.')
"""    
__someting__
위의 형식처럼 양쪽에 언더스코어가 있는 메서드를 스페셜 메서드 혹은 매직 메서드라고 불립니다.
"""
```

```python
class Person:
    
    def __init__(self):
        print('응애!')
        
        
    def __del__(self):
        print('안녕...')

p3 = Person() # => 응애!
del p3 # => 안녕...
```

```python
# 생성자 역시 메서드(함수)기 때문에 추가인자를 받을 수 있습니다.
class Person:
    
    def __init__(self, name):
        self.name = name
        print('응애! 나는 {}!'.format(self.name))
        
        
    def __del__(self):
        print('{}은 떠난다 안녕...'.format(self.name))

# 생성과 동시에 인스턴스 변수에 값을 할당합니다.
me = Person('Wally') # => 응애! 나는 Wally!
# 생성자는 괄호 안에 바로 쓸 수 있다.
print(me.name) # => Wally
print('-------------')

me = Person('SSAFY') # => 응애! 나는 Wally!
print(me.name)
# => Wally은 떠난다 안녕...
# => SSAFY
# 새로운 me가 생성되면서 기존에 있던 me는 소멸된다.(덮어씌워지는 것과 비슷한 동작)
```