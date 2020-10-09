import sys
sys.stdin = open('input_15685.txt', 'r')

dx, dy = (0, -1, 0, 1), (1, 0, -1, 0) # 우-상-좌-하

N = int(input())
curve_grid = [[0 for _ in range(101)] for _ in range(101)]
for _ in range(N):
    y, x, d, g = map(int, input().split())
    end_point = (x + dx[d], y + dy[d])

    # 0세대 드래곤 커브 표시
    curve_grid[x][y] = 1
    curve_grid[end_point[0]][end_point[1]] = 1

    if g > 0: # 0세대는 할 필요가 없음
        dir_stack = [d]
        # 1세대 부터 g세대 드래곤 커브 확인
        for _ in range(g):
            new_dir_stack = []
            for i in range(len(dir_stack) - 1, -1, -1):
                rot_dir = (dir_stack[i] + 1) % 4
                new_end_point = (end_point[0] + dx[rot_dir], end_point[1] + dy[rot_dir])
                curve_grid[new_end_point[0]][new_end_point[1]] = 1
                new_dir_stack.append(rot_dir)
                end_point = new_end_point
            dir_stack.extend(new_dir_stack)

# 정사각형의 네 꼭짓점이 모두 드래곤 커브의 일부인 것 개수 구하기
answer = 0
for n in range(100 * 100):
    r, c = divmod(n, 100)
    if curve_grid[r][c] == curve_grid[r][c + 1] == curve_grid[r + 1][c] == curve_grid[r + 1][c + 1] == 1:
        answer += 1
print(answer)