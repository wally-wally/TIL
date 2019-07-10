# 1. read() 함수 이용하여 파일 읽기
# read() : 개행문자를 포함한 하나의 문자열
#          즉, 내용 전체가 하나의 문자열임.
with open('with_ssafy.txt', 'r') as f:
    all_text = f.read() # 다른 곳에서 사용하기 위해 변수를 선언해줘야 함
    print(all_text)

# 2. readlines() 함수 이용하여 파일 읽기
# readlines() : 파일의 모든 라인을 읽어서 각각의 줄을 요소로 갖는 list로 만들어냄.
#               즉, This is line 1.과 This is line 2.는 서로 다른 리스트의 요소임.
with open('with_ssafy.txt', 'r') as f:
    lines = f.readlines() # 변수로 따로 지정해줘야 for문 안에서 리스트 요소가 출력됨
    for line in lines:
        print(line.strip()) # '문자열'.strip() : 양 쪽 빈 공백을 지워줌
                          # print() 내에는 \n이 숨겨져 있어서 strip을 이용하여 \n을 지워줌.