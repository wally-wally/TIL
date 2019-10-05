import sys
sys.stdin = open('input_10026.txt', 'r')
sys.setrecursionlimit(10**7)

def DFS(x, y, check_list, picture):
    check_list[x][y] = True
    dx, dy = (0, +1, 0, -1), (+1, 0, -1, 0)
    for posi in range(4):
        new_x, new_y = x + dx[posi], y + dy[posi]
        if 0 <= new_x < N and 0 <= new_y < N:
            if not check_list[new_x][new_y] and picture[x][y] == picture[new_x][new_y]:
                DFS(new_x, new_y, check_list, picture)

N = int(input())
normal_pic, abnormal_pic = [], []
for a in range(N):
    nor_elem, abnor_elem = [], []
    for section in input():
        if section == 'G':
            nor_elem.append(section)
            abnor_elem.append('R')
        else:
            nor_elem.append(section)
            abnor_elem.append(section)
    normal_pic.append(nor_elem)
    abnormal_pic.append(abnor_elem)

visited_nor = [[False] * N for b in range(N)]
visited_abnor = [[False] * N for b in range(N)]
nor_cnt, abnor_cnt = 0, 0
for i in range(N):
    for j in range(N):
        if not visited_nor[i][j]:
            DFS(i, j, visited_nor, normal_pic)
            nor_cnt += 1
        if not visited_abnor[i][j]:
            DFS(i, j, visited_abnor, abnormal_pic)
            abnor_cnt += 1
print(nor_cnt, abnor_cnt)