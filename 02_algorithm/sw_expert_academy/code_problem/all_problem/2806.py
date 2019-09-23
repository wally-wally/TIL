import sys
sys.stdin = open('input_2806.txt', 'r')

# 내가 작성한 코드
def n_queen(idx_list):
    row_num = -1
    for idx in idx_list:
        row_num += 1
        ori_row_num = row_num
        ori_idx = idx
        while True: # 좌상 대각
            row_num, idx = row_num - 1, idx - 1
            if 0 <= row_num < N and 0 <= idx < N:
                if arr[row_num][idx]:
                    return False
            else:
                break

        row_num = ori_row_num
        idx = ori_idx
        while True:
            row_num, idx = row_num + 1, idx + 1
            if 0 <= row_num < N and 0 <= idx < N:
                if arr[row_num][idx]:
                    return False
            else:
                break

        row_num = ori_row_num
        idx = ori_idx
        while True:
            row_num, idx = row_num - 1, idx + 1
            if 0 <= row_num < N and 0 <= idx < N:
                if arr[row_num][idx]:
                    return False
            else:
                break

        row_num = ori_row_num
        idx = ori_idx
        while True:
            row_num, idx = row_num + 1, idx - 1
            if 0 <= row_num < N and 0 <= idx < N:
                if arr[row_num][idx]:
                    return False
            else:
                break
            
        row_num = ori_row_num
        idx = ori_idx
        arr[row_num][idx] = 1
    return True

import itertools
for test_case in range(int(input())):
    N = int(input())
    nums = [num for num in range(N)]
    result = 0
    if N == 1:
        result = 1
    else:
        for element in itertools.permutations(nums): # 순열로 생성하므로 대각만 체크하면 됨
            arr = [[0] * N for _ in range(N)]
            check = n_queen(element)
            if check: result += 1
    print(result)

# 강사님이 작성한 코드
# for test_case in range(int(input())):
#     N = int(input())
#     cnt = 0
#     visit = [0] * N
#     cols = [0] * N    # 퀸의 열 값을 저장(여기세 순열을 저장함)

#     def Possible(k, c):    # k번 퀸의 열 값이 답이 되는 선택인지 조사
#         for i in range(k):    # 0 ~ k - 1번 퀸과 대각선에 있는지 조사
#             if k - i == abs(c - cols[i]):
#                 return False
#         return True
#     def nQueen(k):
#         if k == N:
#             global cnt
#             cnt += 1
#         else:
#             for i in range(N):
#                 if visit[i] or not Possible(k, i): continue
#                 visit[i] = 1
#                 cols[k] = i    # k번 퀸의 열 값을 i로 결정
#                 nQueen(k + 1)
#                 visit[i] = 0

#     nQueen(0)
#     print('#{} {}'.format(test_case + 1, cnt))