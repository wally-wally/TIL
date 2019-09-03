import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    for setting in range(1 << N):
        A, B = [], []
        for c in range(N):
            if setting & (1 << c):
                A.append(c)
            else:
                B.append(c)
        if len(A) == len(B):
            print(A, B)
            
# import sys
# sys.stdin = open('sample_input.txt', 'r')

# T = int(input())

# for a in range(T):
#     N = int(input())
#     arr = []
#     for b in range(N):
#         arr.append(list(map(int, input().split())))
    
#     # index 부분집합 생성
#     subset_cnt = 0
#     for i in range(1 << N):
#         A, B = [], []
#         for j in range(N):
#             if i & (1 << i):
#                 A.append(i)
#             else:
#                 B.append(i)
#         if len(A) == len(B):
#             subset_cnt += 1
    