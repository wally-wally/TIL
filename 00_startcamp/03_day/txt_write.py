# 1. 변수에 만들고 싶은 파일을 open() 해야 한다.
# open() 할 때 r은 읽기, w는 쓰기(+덮어씌워짐), a는 추가
f = open('ssafy.txt', 'w') #open('만들 파일 명', '행동')
for i in range(10):
    f.write(f'This is line {i+1}.\n') # \n은 enter의 역할 / 0부터 시작하므로 i+1로 해야 함
f.close() # 끝나고 반드시 파일을 닫아줘야 한다.

# 2. with 구문 (context manager)으로 작성하기
with open('with_ssafy.txt', 'w') as f: # line3, 6을 한 줄로 작성됨
    for i in range(10):
        f.write(f'This is line {i+1}.\n')

# 3. writelines() 이용한 파일 작성
# writelines() : list를 넣어주면 요소 하나당 한 줄씩 작성한다.
#                \n을 요소마다 끝에 넣어줘야 한 줄씩 작성된다.(안 쓰면 전부 다 한 줄로 작성)
with open('ssafy.txt', 'w') as f:
    f.writelines(['0\n', '1\n', '2\n', '3\n'])