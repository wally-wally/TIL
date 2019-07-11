# 딕셔너리 반복문 활용하기
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