# 1.파일 문자열 쓰기 & 읽기

# (1) 파일에 문자열 쓰기
"""
<파일에 문자열 쓰는 과정>
 - file = open() : 파일 열기
 - file.write() : 파일 쓰기
 - file.close() : 파일 닫기
"""

file = open('hello.txt', 'w')
file.write('Hello, world!')
file.close()

# (2) 파일에서 문자열 읽기
"""
<파일에서 문자열 읽는 과정>
 - file = open() : 파일 열기
 - file.read() : 파일 읽기
 - file.close() : 파일 닫기
"""

print('====#1====')
file = open('hello.txt', 'r')
s = file.read()
print(s)
file.close()

# (3) 자동으로 파일 객체 닫기(앞으로 이거로 사용!)
with open('hello.txt', 'r') as file: # with as를 사용하면 파일 객체를 자동으로 닫아준다.(file.close()를 쓸 필요가 없음)
    s = file.read()
    print(s)


# 2. 문자열 여러 줄에 파일에 쓰기, 읽기

# (1) 반복문으로 문자열 여러 줄을 파일에 쓰기
with open('hello2.txt', 'w') as file:
    for i in range(3):
        file.write('Hello, world! {0}\n'.format(i))


# (2) 리스트에 들어있는 문자열을 파일에 쓰기
contents = ['안녕하세요.\n', '파이썬\n', '학습중입니다.\n']
with open('hello3.txt', 'w') as file:
    file.writelines(contents)

# (3) 파일의 내용을 한 줄씩 리스트로 가져오기
print('\n====#2====')
with open('hello3.txt', 'r') as file:
    contents_2 = file.readlines()
    print(contents_2)

# (4) 파일의 내용을 한 줄씩 읽기
with open('hello3.txt', 'r') as file:
    content = None # 변수 content를 None을 초기화(반드시 있어야 함)
    while content != '':
        content = file.readline()
        print(content.strip('\n')) # 이미 파일에 \n이 들어있으므로 strip을 이용하여 \n을 지워줘야 줄바꿈이 한 번만 일어난다.

# (5) for 반복문으로 파일의 내용을 줄 단위로 읽기
with open('hello3.txt', 'r') as file:
    for line in file: # 파일 객체는 이터레이터이다.
        print(line.strip('\n'))


# 3. 파이썬 객체를 파일에 저장하기, 가져오기
"""
 - 피클링(pickling) : 파이썬 객체를 파일에 저장하는 과정
 - 언피클링(unpickling) : 파일에서 객체를 읽어오는 과정
"""

# (1) 파이썬 객체를 파일에 저장하기
import pickle
name = 'wally'
age = 1
address = 'Earth'
scores = {
    'python': 90,
    'web': 85,
    'database': 93
}
with open('wally.p', 'wb') as file: # 'wb' : 컴퓨터만이 처리할 수 있는 쓰기 방식
    pickle.dump(name, file)
    pickle.dump(age, file)
    pickle.dump(address, file)
    pickle.dump(scores, file)

# (2) 파일에서 파이썬 객체 읽기
print('\n====#3====')
with open('wally.p', 'rb') as file: # 'wb' : 컴퓨터만이 처리할 수 있는 읽기 방식
    name = pickle.load(file)
    age = pickle.load(file)
    address = pickle.load(file)
    scores = pickle.load(file)
    print(name)
    print(age)
    print(address)
    print(scores)