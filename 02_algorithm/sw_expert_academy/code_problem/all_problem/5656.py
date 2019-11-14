import sys
sys.stdin = open('input_5656.txt', 'r')

import copy

def perm(n, cnt, array, brick_cnt):
    global result

    if n == cnt or brick_cnt == bricks:
        if result < brick_cnt:
            result = brick_cnt
        return
    
    for col in range(W):
        copy_array = copy.deepcopy(array)

        points = []
        r = 0
        while True:
            if r == H:
                break
            if copy_array[r][col] >= 1:
                points.append((r, col))
                break
            r += 1

        if len(points):
            queue = [(r, col)]
            visited = [[0] * W for _ in range(H)]
            if copy_array[r][col] >= 2:
                visited[r][col] = 1
            dx, dy = [-1, 0, +1, 0], [0, +1, 0, -1]
            while queue:
                elem = queue.pop(0)
                brick_no = copy_array[elem[0]][elem[1]]
                for times in range(1, brick_no):
                    for k in range(4):
                        new_r, new_c = elem[0] + dx[k] * times, elem[1] + dy[k] * times
                        if 0 <= new_r < H and 0 <= new_c < W:
                            if copy_array[new_r][new_c] >= 1:
                                if (new_r, new_c) not in points:
                                    points.append((new_r, new_c))
                                if copy_array[new_r][new_c] >= 2:
                                    if not visited[new_r][new_c]:
                                        visited[new_r][new_c] = 1
                                        queue.append((new_r, new_c))

        if not(points): continue
        for point in points:
            copy_array[point[0]][point[1]] = 0

        # 블록 떨어뜨리기 - 선생님 방법
        # for c_idx in range(W):
        #     idx_num = H - 1
        #     for r_idx in range(H - 1, -1, -1):
        #         if copy_array[r_idx][c_idx]:
        #             copy_array[idx_num][c_idx], copy_array[r_idx][c_idx] = copy_array[r_idx][c_idx], copy_array[idx_num][c_idx]
        #             idx_num -= 1

        # 블록 떨어뜨리기 - 내 방법
        for width in range(W):
            col_line = ''
            for height in range(H):
                col_line += str(copy_array[height][width])
            zero_cnt = col_line.count('0')
            col_line = '0' * zero_cnt + col_line.replace('0', '')
            for h_idx in range(H):
                copy_array[h_idx][width] = int(col_line[h_idx])

        perm(n, cnt + 1, copy_array, brick_cnt + len(points))


for tc in range(int(input())):
    N, W, H = map(int, input().split())
    bricks = 0 # 벽돌의 총 개수 (나중에 벽돌의 총 개수 - 제거된 블록 수로 계산할 예정)
    result = 0
    arr = []
    for i in range(H):
        temp_list = list(map(int, input().split()))
        for j in range(W):
            if temp_list[j] > 0:
                bricks += 1
        arr.append(temp_list)
    perm(N, 0, arr, 0)
    print('#{} {}'.format(tc + 1, bricks - result))