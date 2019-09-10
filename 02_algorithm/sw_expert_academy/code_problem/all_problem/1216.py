import sys
sys.stdin = open('input.txt', 'r')

# 실행 시간 : 4.20562[s]
for a in range(10):
    T = int(input())
    arr = [input() for b in range(100)] # arr 리스트에 2차원 배열 형태로 데이터 넣기

    max_length = 0 # 회문 길이의 최댓값을 저장할 변수

    for M in range(1, 101): # M : 회문의 길이
        for c in range(100): # 가로줄 회문 검사
            if max_length == M: # 가로줄 검사시 길이가 M일 때 회문을 발견하면 나머지 가로줄 검사들은 할 필요가 없다.
                break
            for d in range(100 - M + 1): # 아니라면 가로줄 회문 검사
                if arr[c][d : d + M] == arr[c][d : d + M][::-1]: # 현재 검사중인 패턴이 회문이라면 max_length 에 M을 할당
                    max_length = M
                    break

        for d in range(100):
            if max_length != M: # 가로줄 검사시 길이가 M일 때 회문을 발견하면(max_length == M) 세로줄 검사는 굳이 할 필요가 없다.
                for e in range(100 - M + 1):
                    col_data = ''
                    for f in range(e, e + M):
                        col_data += arr[f][d]
                    if col_data == col_data[::-1]:
                        max_length = M
                        break
                if max_length == M:
                    break

    print('#{} {}'.format(T, max_length))


"""
실행 시간 : 4.95909[s]

for a in range(10):
    T = int(input())
    arr = []
    for b in range(100):
        arr.append(input())

    max_length = 0
    for M in range(1, 101):
        for c in range(100): # 가로줄 회문 검사
            for d in range(100 - M + 1):
                if arr[c][d : d + M] == arr[c][d : d + M][::-1]:
                    max_length = M
                    break

        for d in range(100):
            for e in range(100 - M + 1):
                col_data = ''
                for f in range(e, e + M):
                    col_data += arr[f][d]
                if col_data == col_data[::-1]:
                    max_length = M
                    break

    print('#{} {}'.format(T, max_length))
"""