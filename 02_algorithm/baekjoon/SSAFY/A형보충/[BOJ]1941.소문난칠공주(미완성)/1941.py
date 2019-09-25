import sys
sys.stdin = open('input_1941.txt', 'r')
sys.setrecursionlimit(10**9)

def DFS(x, y, re_visited_chk, cnt):
    global result
    if cnt == 7:
        result += 1
    else:
        direction = [(-1, 0), (0, 1), (1, 0), (0, -1)]
        for idx in range(4):
            new_x, new_y = x + direction[idx][0], y + direction[idx][1]
            if 0 <= new_x < 5 and 0 <= new_y < 5:
                if check_board[new_x][new_y] and not re_visited_chk[new_x][new_y]:
                    re_visited_chk[new_x][new_y] = True
                    cnt += 1
                    DFS(new_x, new_y, re_visited_chk, cnt)

def find():
    global cnt
    for m in range(25):
        if visited[m]:
            x, y = m // 5, m % 5
            re_visited = [[False] * 5 for _ in range(5)]
            re_visited[x][y] = True
            cnt += 1
            DFS(x, y, re_visited, cnt)
            return


def som_check(idx, count, som_cnt):
    if arr[idx // 5][idx % 5] == 'S':
        som_cnt += 1
    visited[idx] = True
    check_board[idx // 5][idx % 5] = True

    if count == 7:
        if som_cnt >= 4:
            find()
    else:
        if count == 4 and som_cnt == 0:
            visited[idx] = False
            check_board[idx // 5][idx % 5] = False
            return
        elif count == 5 and som_cnt == 1:
            visited[idx] = False
            check_board[idx // 5][idx % 5] = False
            return
        elif count == 6 and som_cnt == 2:
            visited[idx] = False
            check_board[idx // 5][idx % 5] = False
            return
        for k in range(i + 1, 25):
            if not visited[k]:
                som_check(k, count + 1, som_cnt)
    visited[idx] = False
    check_board[idx // 5][idx % 5] = False

arr = [[element for element in input()] for _ in range(5)]

result, cnt = 0, 0

for i in range(25):
    visited = [False] * 25
    check_board = [[False] * 5 for _ in range(5)]
    som_check(i, 1, 0)
print(result)