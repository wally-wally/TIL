import sys
sys.stdin = open('input_3190.txt', 'r')

from collections import deque

dx, dy = (0, 1, 0, -1), (1, 0, -1, 0) # 우(0)-하(1)-좌(2)-상(3)

def change_dir(now_dir, direction):
    if direction == 'L':
        return (now_dir - 1) % 4
    else:
        return (now_dir + 1) % 4


def check_crash_my_body(snake_info, head):
    return head in snake_info


def check_crash_wall(head):
    return head[0] < 1 or head[0] > N or head[1] < 1 or head[1] > N


N = int(input()) # 보드 크기
K = int(input()) # 사과 개수
apple_positions = [tuple(map(int, input().split())) for _ in range(K)]
L = int(input()) # 뱀의 방향 변환 횟수
rotate_info = dict() # 뱀의 방향 변환 정보
for _ in range(L):
    time, direction = map(str, input().split())
    rotate_info[int(time)] = direction

snake_info = deque() # 뱀이 차지 있고 공간 정보
snake_info.append((1, 1))
time, now_dir = 1, 0
while True:
    snake_head = snake_info[-1]
    next_snake_head = (snake_head[0] + dx[now_dir], snake_head[1] + dy[now_dir])
    # 벽에 부딪혔는지 or 자기자신의 몸과 부딪혔는지
    if check_crash_wall(next_snake_head) or check_crash_my_body(snake_info, next_snake_head):
        print(time)
        break
    snake_info.append(next_snake_head)
    if next_snake_head in apple_positions:
        apple_idx = apple_positions.index(next_snake_head)
        apple_positions.pop(apple_idx)
    else:
        snake_info.popleft()
    if time in rotate_info: # 회전 하는 타이밍일 때 뱀 이동 방향 변환하기
        now_dir = change_dir(now_dir, rotate_info[time])
    time += 1