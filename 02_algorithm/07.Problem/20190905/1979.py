import sys
sys.stdin = open('input_1979.txt', 'r')

T = int(input())

for i in range(T):
    N, K = map(int, input().split())
    puzzle = [list(map(int, input().split())) for _ in range(N)]

    able_count = 0
    
    for j in range(2): # j = 0 : 가로줄 검사  / j = 1 : 세로줄 검사
        for a in range(N):
            check = 0
            continue_one = 0
            for b in range(N):
                element = puzzle[a][b] if not j else puzzle[b][a]
                if element and not continue_one:
                    check += 1
                if check == K and not element or check == K and b == N - 1:
                    able_count += 1
                    check = 0
                    continue_one = 0
                elif check > K:
                    check = 0
                    continue_one = 1
                elif check < K and not element:
                    check = 0
                    continue_one = 0

    print('#{} {}'.format(i + 1, able_count))

'''
T = int(input())

for i in range(T):
    N, K = map(int, input().split())
    puzzle = [list(map(int, input().split())) for _ in range(N)]
    
    able_count = 0
    # 가로줄 검사
    for a in range(N):
        check = 0
        continue_one = 0
        for b in range(N):
            if puzzle[a][b]:
                if not continue_one:
                    check += 1
            if check == K and not puzzle[a][b] or check == K and b == N - 1:
                able_count += 1
                check = 0
                continue_one = 0
            elif check > K:
                check = 0
                continue_one = 1
            elif check < K and not puzzle[a][b]:
                check = 0
                continue_one = 0

    # 세로줄 검사
    for c in range(N):
        check = 0
        continue_one = 0
        for d in range(N):
            if puzzle[d][c]:
                if not continue_one:
                    check += 1
            if check == K and not puzzle[d][c] or check == K and d == N - 1:
                able_count += 1
                check = 0
                continue_one = 0
            elif check > K:
                check = 0
                continue_one = 1
            elif check < K and not puzzle[d][c]:
                check = 0
                continue_one = 0
    print('#{} {}'.format(i + 1, able_count))
'''