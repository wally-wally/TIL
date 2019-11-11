# 1. DP 적용
def solution(board):
    max_point = 0
    for i in range(len(board)):
        max_point += sum(board[i])
    if max_point == 0: return 0
    max_point = 0
    for i in range(1, len(board)):
        for j in range(1, len(board[0])):
            if board[i][j]==0:
                continue
            else:
                min_point = min(board[i][j - 1], board[i - 1][j], board[i - 1][j - 1])
                min_point += 1
                board[i][j] = min_point
                if max_point < board[i][j]:
                    max_point = board[i][j]
    return 1 if max_point == 0 else max_point ** 2

# 2. 망한 코드(40.8점)
# def check_square(i, j, r, c, board):
#     temp_area = 0
#     s, e = i, j
#     break_var = 0
#     while True:
#         if i == r or j == c: break
#         for idx_i in range(s, i + 1):
#             if break_var: break
#             for idx_j in range(e, j + 1):
#                 if not board[idx_i][idx_j]:
#                     break_var = 1
#                     break
#         else:
#             temp_area = (i + 1 - s) ** 2
#         if break_var : break
#         i, j = i + 1, j + 1
#     return temp_area
            

# def solution(board):
#     answer = 0
#     row_cnt, col_cnt = len(board), len(board[0])
#     DP = [[0] * col_cnt for _ in range(row_cnt)]
#     for i in range(row_cnt):
#         for j in range(col_cnt):
#             if board[i][j]:
#                 answer = max(answer, check_square(i, j, row_cnt, col_cnt, board))
#     return answer