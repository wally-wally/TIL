# :notebook_with_decorative_cover: 01_python - Day08

---

:white_check_mark: **Python 7월25일(8일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_6.md">(바로 이동)</a>

------

<br>

## 8. 7월25일(8일차)

### 8.1 인스턴스 메서드 / 클래스 메서드 / 스태틱 메서드

#### (1) 인스턴스 메서드

- 인스턴스가 사용할 메서드 입니다.
- 정의 위에 어떠한 데코레이터도 없으면, 자동으로 인스턴스 메서드가 됩니다.
- **첫 번째 인자로 self 를 받도록 정의합니다. 이 때, 자동으로 인스턴스 객체가 self 가 됩니다.**

```python
class MyClass:
    def instance_method_name(self, arg1, arg2, ...):
        ...

my_instance = MyClass()
my_instance.instance_method_name(.., ..)  # 자동으로 첫 번째 인자로 인스턴스(my_instance)가 들어갑니다.
```

<br>

#### (2) 클래스 메서드

- 클래스가 사용할 메서드 입니다.
- 정의 위에 `@classmethod` 데코레이터를 사용합니다.
- **첫 번째 인자로 클래스(cls) 를 받도록 정의합니다. 이 때, 자동으로 클래스 객체가 cls 가 됩니다.**

```python
class MyClass:
    @classmethod
    def class_method_name(cls, arg1, arg2, ...):
        ...

MyClass.class_method_name(.., ..)  # 자동으로 첫 번째 인자로 클래스(MyClass)가 들어갑니다.
```

<br>

#### (3) 스태틱(정적) 메서드

- 클래스가 사용할 메서드 입니다.
- 정의 위에 `@staticmethod` 데코레이터를 사용합니다.
- 묵시적인 첫 번째 인자를 받지 않습니다. 즉, 인자 정의는 자유롭게 합니다.
- **어떠한 인자도 자동으로 넘어가지 않습니다.**

```python
class MyClass:
    @staticmethod
    def static_method_name(arg1, arg2, ...):
        ...

MyClass.static_method_name(.., ..)  # 아무일도 자동으로 일어나지 않습니다.
```

<br>

### 8.2 상속 / `super()`

#### (1) 상속

- 클래스에서 가장 큰 특징은 '상속' 기능을 가지고 있다는 것입니다.
- 부모 클래스의 모든 속성이 자식 클래스에게 상속 되므로 코드 재사용성이 높아집니다.

```python
class DerivedClassName(BaseClassName):
    code block
```

- 상속은 공통된 속성이나 메서드를 부모 클래스에 정의하고, 이를 상속받아 다양한 형태의 사람들을 만들 수 있습니다.

<br>

#### (2) `super()`

- 자식 클래스에 메서드를 추가로 구현할 수 있습니다.
- 부모 클래스의 내용을 사용하고자 할 때, `super()`를 사용할 수 있습니다.

```python
class BabyClass(ParentClass):
    def method(self, arg):
        super().method(arg) 
```

<br>

### 8.3 메서드 오버로딩 / 메서드 오버라이딩

#### (1) 메서드 오버로딩

- 파이썬에 기본적으로 정의된 연산자를 직접적으로 정의하여 활용할 수 있습니다.

```python
class Person:
    population = 0
    
    def __init__(self, name, age):
        Person.population += 1
        self.name = name
        self.age = age
    
    
    def greeting(self):
        print(f'{self.name} 입니다. 반갑습니다.')
        
        
    def __gt__(self, other):
        if self.age > other.age:
            return f'내가 {other.name}보다 나이가 많아요!'
        else:
            return f'내가 {other.name}보다 어려요!'

young = Person('젊은이', 40)
old = Person('노인', 100)

print(old > young) # => 내가 젊은이보다 나이가 많아요!
```

<br>

#### (2) 메서드 오버라이딩

- 메서드를 재정의할 수도 있습니다.
- 상속 받은 클래스에서 메서드를 덮어씁니다.

```python
class Person:
    def __init__(self, name, age, number, email):
        self.name = name
        self.age = age
        self.number = number
        self.email = email
        
    
    def greeting(self):
        print(f'반갑습니다, {self.name}입니다.')

class Soldier(Person):
    def __init__(self, name, age, number, email, army):
        super().__init__(name, age, number, email)
        self.army = army
    
    # method overriding(덮어쓰기라고 생각하면 쉬움)
    def greeting(self):
        print(f'태풍! {self.army} {self.name}')
        
army = Soldier('굳건이', 25, '487381', 'fkvncml@gmaii.con', '병장')
army.greeting() # => 태풍! 병장 굳건이
```

<br>

### 8.4 상속관계에서의 이름공간

- 기존에 인스턴스 -> 클래스 순으로 이름 공간을 탐색해나가는 과정에서 상속관계에 있으면 아래와 같이 확장됩니다.
- 인스턴스 -> 클래스 -> 전역
- 인스턴스 -> 자식 클래스 -> 부모 클래스 -> 전역

