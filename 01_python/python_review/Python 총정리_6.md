# :notebook_with_decorative_cover: 01_python - (6) OOP_advanced

<br>

## 1. 클래스 변수와 인스턴스 변수

### 1.1 클래스 변수

- 클래스의 속성입니다.
- 클래스 선언 블록 최상단에 위치합니다.
- **모든 인스턴스가 공유**합니다.
- `Class.class_variable` 과 같이 접근/할당합니다.

```python
class TestClass:

    class_variable = '클래스변수'
    ...

TestClass.class_variable  # '클래스변수'
TestClass.class_variable = 'class variable'
TestClass.class_variable  # 'class variable'

tc = TestClass()
tc.class_variable  
# 인스턴스 => 클래스 => 전역 순서로 이름공간을 탐색하기 때문에, 접근하게 됩니다.
```

<br>

### 1.2 인스턴스 변수

- 인스턴스의 속성입니다.
- **각 인스턴스들의 고유한 변수**입니다.
- 메서드 정의에서 `self.instance_variable` 로 접근/할당합니다.
- 인스턴스가 생성된 이후 `instance.instance_variable` 로 접근/할당합니다.

```python
class TestClass:

    def __init__(self, arg1, arg2):
        self.instance_var1 = arg1    # 인스턴스 변수
        self.instance_var2 = arg2

    def status(self):
        return self.instance_var1, self.instance_var2   


tc = TestClass(1, 2)
tc.instance_var1  # 1
tc.instance_var2  # 2
tc.status()  # (1, 2)
```

<br>

## 2. 인스턴스 메서드 / 클래스 메서드 / 스태틱(정적) 메서드

### 2.1 인스턴스 메서드

- 인스턴스가 사용할 메서드 입니다.
- 정의 위에 **어떠한 데코레이터도 없으면**, 자동으로 인스턴스 메서드가 됩니다.
- **첫 번째 인자로 `self` 를 받도록 정의합니다. 이 때, 자동으로 <u>인스턴스 객체</u>가 `self` 가 됩니다.**

```python
class MyClass:
    def instance_method_name(self, arg1, arg2, ...):
        ...

my_instance = MyClass()
my_instance.instance_method_name(.., ..)  # 자동으로 첫 번째 인자로 인스턴스(my_instance)가 들어갑니다.
```

<br>

### 2.2 클래스 메서드

- 클래스가 사용할 메서드 입니다.
- 정의 위에 `@classmethod` 데코레이터를 사용합니다.
- **첫 번째 인자로 클래스(`cls`) 를 받도록 정의합니다. 이 때, 자동으로 <u>클래스 객체</u>가 `cls` 가 됩니다.**

```python
class MyClass:
    @classmethod
    def class_method_name(cls, arg1, arg2, ...):
        ...

MyClass.class_method_name(.., ..)  # 자동으로 첫 번째 인자로 클래스(MyClass)가 들어갑니다.
```

<br>

### 2.3 스태틱(정적) 메서드

- 클래스가 사용할 메서드 입니다.
- 정의 위에 `@staticmethod` 데코레이터를 사용합니다.
- 묵시적인 첫 번째 인자를 받ㄱ지 않습니다. 즉, 인자 정의는 자유롭게 합니다.
- **어떠한 인자도 자동으로 넘어가지 않습니다.**

```python
class MyClass:
    @staticmethod
    def static_method_name(arg1, arg2, ...):
        ...

MyClass.static_method_name(.., ..)  # 아무일도 자동으로 일어나지 않습니다.
```

<br>

> 예시

```python
class MyClass:
    
    sample = 0
    
    def instance_method(self):
        return self
    
    @classmethod # 실제로 클래스 변수의 조작을 사용하기 위해 사용
    def class_method(cls):
        return cls.sample
    
    
    @staticmethod # 독자적인 다른 메서드로 사용
    def static_method(arg):
        return arg
```

```python
mc = MyClass()

# 인스턴스 입장에서 확인해 봅시다.

# 인스턴스는 인스턴스 메서드에 접근 가능하다.
mc.instance_method()
print(id(mc.instance_method()), id(mc)) # id 값 비교
# 2747069872224 2747069872224
print(mc.instance_method() == mc) # True

# 인스턴스는 클래스 메서드에도 접근 가능하다.
mc.class_method()
print(id(mc.class_method()), id(MyClass)) # id 값 비교
# 140710778462832 2747060852264
print(mc.class_method() == MyClass) # False

# 인스턴스는 스태틱 메서드에도 접근 가능하다.
mc.static_method(1) # 1
```

:heavy_check_mark: **정리 1 - 인스턴스와 메서드**

- 인스턴스는, 3가지 메서드 모두에 접근할 수 있습니다.
- 하지만 인스턴스에서 클래스메서드와 스태틱메서드는 호출하지 않아야 합니다. (가능하다 != 사용한다)
- 인스턴스가 할 행동은 모두 인스턴스 메서드로 한정 지어서 설계합니다.

```python
# 클래스 입장에서 확인해 봅시다.

# 클래스는 클래스 메서드에 접근 가능하다.
MyClass.class_method()
print(id(MyClass.class_method()), id(MyClass))
# 140710778462832 2747060852264
print(MyClass.class_method() == MyClass) # False

# 클래스는 스태틱 메서드에도 접근 가능하다.
MyClass.static_method(1) # 1

# 결국 클래스는 인스턴스 메서드에도 접근 가능하다.
mc.instance_method() # 첫 번째 인자인 인스턴스 객체가 없다. (TypeError)
MyClass.instance_method(mc) # mc.instance_method()
# <__main__.MyClass at 0x27f9a1fb860>
```

:heavy_check_mark: **정리 2 - 클래스와 메서드**

- 클래스는, 3가지 메서드 모두에 접근할 수 있습니다.
- 하지만 클래스에서 인스턴스메서드는 호출하지 않습니다. (가능하다 != 사용한다)
- 클래스가 할 행동은 다음 원칙에 따라 설계합니다.
  - **클래스 자체(cls)와 그 속성에 접근할 필요가 있다면 클래스메서드로 정의합니다.**
  - **클래스와 클래스 속성에 접근할 필요가 없다면 스태틱메서드로 정의합니다.**

> <인스턴스 / 클래스 / 스태틱 메서드 자세히 살펴보기>
>
> - Puppy class를 만들어보겠습니다.
>
> - 클래스 변수 num_of_dogs 통해 개가 생성될 때마다 증가시키도록 하겠습니다. 
>
> - 개들은 각자의 이름과 견종을 가지고 있습니다. 
>
> - 그리고 bark() 메서드를 통해 짖을 수 있습니다. 

```python
class Dog:
    num_of_dogs = 0
    birth_of_dogs = 0
   
    def __init__(self, name, breed):
        Dog.num_of_dogs += 1
        Dog.birth_of_dogs += 1
        self.name = name
        self.breed = breed
   

    def bark(self):
        return '와아앙~!'
   

    def __del__(self):
        Dog.num_of_dogs -= 1
   

    @classmethod
    def get_status(cls): # 클래스메서드의 인자는 무조건 cls
        return f'birth: {cls.birth_of_dogs}, Current: {cls.num_of_dogs}'
    
    
    @staticmethod
    def get_info():
        return '이것은 멍멍이입니다!!'
```

```python
dog = Dog('초코', '푸들')

# 인스턴스 메서드
dog.bark() # => '와아앙~!'

# 클래스 메서드
Dog.get_status() # => 'birth: 1, Current: 0'

# 스태틱 메서드
Dog.get_info() # => '이것은 멍멍이입니다!!'
```

```python
# Dog 3 마리를 만들어보고,
dog_1 = Dog('가지', '말티즈')
dog_2 = Dog('나무', '푸들')
dog_3 = Dog('별이', '시츄')

# 함수를 호출해봅시다.
Dog.get_info() # '이것은 멍멍이입니다!!'
dog_1.name # '가지'
dog_2.bark() # '와아앙~!'
Dog.get_stauts() # 'birth: 4, Current: 4'
```

<br>

### 2.4 연산자 오버로딩 (중복 정의)

- 파이썬에 기본적으로 정의된 연산자를 직접적으로 정하여 활용할 수 있다.
- 몇 가지만 소개함

```python
+  __add__   
-  __sub__
*  __mul__
<  __lt__
<= __le__
== __eq__
!= __ne__
>= __ge__
>  __gt__
```

> [예시] 사람과 사람을 같은지 비교하면, 이는 나이가 같은지 비교한 결과를 반환하도록 만들어봅시다.

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
```

```python
# 연산자 호출
young = Person('젊은이', 40)
old = Person('노인', 100)

print(old > young) # 내가 젊은이보다 나이가 많아요!

print(young > old) # 내가 노인보다 어려요!
```

