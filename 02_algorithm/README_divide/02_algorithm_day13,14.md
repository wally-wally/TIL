# :notebook_with_decorative_cover: 02_algorithm - Day13, 14

<br>

## 13. 9월02일(13일차) - `List`

### 13.1 리스트(List)

#### (1) 순차 리스트의 문제점

- 동적 배열로 작성된 순차 리스트는 자료의 삽입과 삭제 연산시 원소의 이동 작업이 필요하다.
- 원소의 개수가 많고 삽입, 삭제 연산이 빈번하게 일어날수록 작업에 소요되는 시간이 크게 증가한다.
- 또한 배열의 크기가 정해져 있는 경우, 실제로 사용될 메모리보다 크게 할당하여 메모리의 낭비를 초래할 수 있고, 반대로 할당된 메모리보다 많은 자료를 사용하여 새롭게 배열을 만들어 작업을 해야 하는 경우가 발생할 수도 있다.

<br>

#### (2) 연결 리스트(Linked List)

- 개별적으로 위치하고 있는 원소의 주소를 연결하여 하나의 전체적인 자료구조를 이룬다.
- **링크를 통해 원소에 접근**하므로, 순차 리스트에서처럼 <u>물리적인 순서를 맞추기 위한 작업이 필요하지 않다.</u>
- `동적 메모리 할당` 기법을 활용하기 때문에 <u>메모리의 효율적인 사용</u>이 가능하다.

<img src="https://user-images.githubusercontent.com/52685250/64085538-5b196b80-cd6e-11e9-9d20-6890c5a962c1.JPG" width=700px height=120px>

- 연결 리스트의 기본 구조
  - `Head` : 리스트의 **<u>처음 노드</u>**를 가리키는 레퍼런스
  - `Data` : **<u>원소의 값</u>**을 저장
  - `Link` : **<u>다음 노드의 주소</u>**를 저장
- 최종적으로 `NULL`을 가리키는 노드가 리스트의 가장 마지막 노드이다.

<br>

#### (3) 단순 연결 리스트

##### ① 삽입 연산

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```
4->3->2->1
```

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성


def add(pre, data): # pre 다음에 데이터 삽입
    if pre == None:
        print('error')
    else:
        pre.link = Node(data, pre.link)


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

add(Head, 8) # Head가 가리키는 Node 다음에 8 삽입

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```
4->8->3->2->1
```

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoLast(data): # 마지막에 데이터 삽입
    global Head
    if Head == None: # 빈 리스트이면
        Head = Node(data, None)
    else:
        p = Head
        while p.link != None: # 마지막 노드 찾을 때까지
            p = p.link
        p.link = Node(data, None)

data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoLast(data[i])

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```python
1->2->3->4
```

##### ② 삭제 연산

<img src="https://user-images.githubusercontent.com/52685250/64086960-e6e2c600-cd75-11e9-8ded-50fa7d727ed5.JPG" width=680px height=380px>

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성

    
def delete(pre): # pre 다음 노드 삭제
    if pre == None or pre.link == None:
        print('error')
    else:
        pre.link = pre.link.link


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

delete(Head)

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```
4->2->1
```

<br>

#### (4) 이중 연결 리스트

- 양쪽 방향으로 순회할 수 있도록 노드를 연결한 리스트
- 두 개의 링크 필드와 한 개의 데이터 필드로 구성

<img src="https://user-images.githubusercontent.com/52685250/64087330-8e142d00-cd77-11e9-933b-a50a2236eba1.JPG" width=700px height=75px>

<br>

### 13.2 삽입 정렬(Insertion Sort)

<a href="https://wonjayk.tistory.com/218"><img src="https://user-images.githubusercontent.com/52685250/64088343-efd69600-cd7b-11e9-9af4-9368abba118a.png" width=500px height=400px></a>

- 정렬되지 않은 부분집합 U의 원소를 하나씩 꺼내어 이미 정렬되어있는 부분집합 S의 마지막 원소부터 비교하면서 위치를 찾아 삽입한다.
- 삽입 정렬을 반복하면서 부분집합 S의 원소는 하나씩 늘리고 부분집합 U의 원소는 하나씩 감소하게 된다.
- 부분집합 U가 공집합이 되면 삽입정렬이 완성된다.

```python
def insertion_sort(a):
    for i in range(1, len(a)):
        for j in range(i, 0, -1):
            if a[j - 1] > a[j]:
                a[j], a[j - 1] = a[j - 1], a[j]

a = [50, 80, 70, 20, 90]

print('정렬 전: ', end='')
print(a)
insertion_sort(a)

print('정렬 후: ', end='')
print(a)
```

```
정렬 전: [50, 80, 70, 20, 90]
정렬 후: [20, 50, 70, 80, 90]
```

<br>

### 13.3 병합 정렬(Merge Sort)

- 여러 개의 정렬된 자료의 집합을 병합하여 한 개의 정렬된 집합으로 만드는 방식
- 시간 복잡도 : `O(n logn)`
- 연결리스트의 경우 병합 정렬이 가장 효율적인 방식

![01](https://user-images.githubusercontent.com/52685250/64090581-cd964580-cd86-11e9-9c3b-f0c2372a667f.JPG)
![02](https://user-images.githubusercontent.com/52685250/64090582-ce2edc00-cd86-11e9-80f2-547cbb432302.JPG)

```python
def merge_sort(m):
    if len(m) <= 1:
        return m

    mid = len(m) // 2
    left = m[:mid]
    right = m[mid:]

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)


def merge(left, right):
    result = []
    while len(left) > 0 and len(right) > 0:
        if left[0] <= right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    if len(left) > 0:
        result.extend(left)
    if len(right) > 0:
        result.extend(right)
    return result

numbers = [69, 10, 30, 2, 16, 8, 31, 22]

print('정렬 전: {}'.format(numbers))
print('정렬 후: {}'.format(merge_sort(numbers)))
```

```
정렬 전: [69, 10, 30, 2, 16, 8, 31, 22]
정렬 후: [2, 8, 10, 16, 22, 30, 31, 69]
```

<br>

### 13.4 리스트를 이용한 스택

```python
# 리스트를 이용한 스택

class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def push(i):  # 원소 i를 스택 top(맨 앞) 위치에 push
    global top
    top = Node(i, top)  # 새로운 노드 생성


def pop():  # 스택의 top을 pop
    global top

    if top == None:  # 빈 리스트이면
        print('error')
    else:
        data = top.data
        top = top.link  # top이 가리키는 노드를 바꿈
        return data


top = None
push(3)
push(4)
push(5)
push(6)
pop()

while top.link != None:
    print(top.data, end='->')
    top = top.link
print(top.data)
```

```
5->4->3
```

---

:white_check_mark: **객체 지향 프로그래밍(Object-Oriented Programming)**

- 객체는 함수와 변수를 하나의 단위로 묶을 수 있는 방법이다.
- 객체(Object)는 속성(Attribute)과 동작(action)을 가지고 있다.
- 클래스로부터 객체를 생성하여야 한다.

- `__init__()` : 객체를 초기화하기 위해 클래스안에 작성하는 특별한 함수
  - 생성자(constructor)라고 하며 외부에서 전달되는 초기값들을 받을 수 있음
- `self` : 객체 자신을 의미하며 자기 자신을 참조하는 의미

---

<br>

### 13.5 우선순위 큐

#### (1) 배열을 이용한 우선순위 큐

- 구현
  - 원소를 삽입하는 과정에서 우선순위를 비교하여 적절한 위치에 삽입하는 구조
  - 가장 앞에 최고 우선순위의 원소가 위치하게 됨
- 문제점
  - 배열을 사용하므로, 삽입이나 삭제 연산이 일어날 때 원소의 재배치가 발생함
  - 이에 소요되는 시간이나 메모리 낭비가 큼

<br>

#### (2) 연결 리스트를 이용한 우선순위 큐

- 구현
  - 원소를 삽입하는 과정에서 리스트 내 노드의 원소들과 비교하여 적절한 노드를 삽입하는 구조
  - 리스트의 가장 앞쪽에 최고 우선순위가 위치하게 됨
- 배열 대비 장점
  - 삽입 / 삭제 연산 이후 원소의 재배치가 필요 없음
  - 메모리의 효율적인 사용이 가능함

---

:warning: **실제로는 힙(Heap)을 이용하여 우선순위 큐를 구현한다.**

- 최대 힙으로 정렬하면 결과는 내림차순 정렬
- 최소 힙으로 정렬하면 결과는 오름차순 정렬

---

<br>

------

<br>

## 14. 9월03일(14일차)

### 14.1 [예제] 수열합치기

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link

def addtoFirst(data):
    global Head
    Head = Node(data, Head)


def add(pre, data):
    pre.link = Node(data, pre.link)


def addtoLast(data):
    global Head
    if Head == None:
        Head = Node(data, None)
    else:
        p = Head
        while p.link != None:
            p = p.link
        p.link = Node(data, None)

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    arr = list(map(int, input().split()))
    Head = None
    for i in range(len(arr)):
        addtoLast(arr[i])
    add_arr = [list(map(int, input().split())) for _ in range(M - 1)]
    length = 0
    for add_list in add_arr:
        node = Head
        length += len(add_list)
        for j in range(length):
            if node.data > add_list[0]:
                if j == 0:
                    for i in range(len(add_list) - 1, -1, -1):
                        addtoFirst(add_list[i])
                    break
                elif j == 1:
                    for i in range(len(add_list) - 1, -1, -1):
                        add(Head, add_list[i])
                    break
                else:
                    for i in range(len(add_list) - 1, -1, -1):
                        add(prev_node, add_list[i])
                    break
            if not j:
                node = Head.link
            else:
                node = node.link
                if j > 1:
                    prev_node = prev_node.link
                else:
                    prev_node = Head.link
        else:
            for i in range(len(add_list) - 1, -1, -1):
                add(prev_node, add_list[i])

    result = []
    count = 0
    while Head.link != None:
        count += 1
        if (length + N) - count <= 9:
            result.insert(0, str(Head.data))
        Head = Head.link
    result.insert(0, str(Head.data))
    print('#{} {}'.format(a + 1, ' '.join(result)))
```

<br>

### 14.2 [예제] 암호

```python
T = int(input())

for a in range(T):
    N, M, K = map(int, input().split())
    arr = list(map(int, input().split()))
    now = 0
    for _ in range(K):
        position = (now + M) % len(arr)
        value = arr[position - 1] + arr[position]
        if position == 0:
            arr.append(value)
            now = -1
        else:
            arr.insert(position, value)
            now = position
    if len(arr) <= 10:
        print('#{} {}'.format(a + 1, ' '.join([str(num) for num in arr[::-1]])))
    elif len(arr) > 10:
        result = []
        count = 0
        for num in arr[::-1]:
            count += 1
            result.append(str(num))
            if count == 10:
                break
        print('#{} {}'.format(a + 1, ' '.join(result)))
```