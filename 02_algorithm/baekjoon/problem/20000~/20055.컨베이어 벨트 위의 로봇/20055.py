import sys
sys.stdin = open('input_20055.txt', 'r')

from collections import deque

N, K = map(int, input().split())
converyor_belt = deque(list(map(int, input().split())))
robot_positions = deque([0] * N)
step = 0

while True:
    step += 1
    
    # 1. 벨트 회전 (+ 로봇도 회전, N번째 칸에 있는 로봇은 땅으로 내려가서 없어짐)
    pop_belt = converyor_belt.pop()
    converyor_belt.appendleft(pop_belt)
    pop_robot = robot_positions.pop()
    robot_positions.appendleft(pop_robot)
    robot_positions[-1] = 0

    # 2. 로봇 이동 가능한지 체크
    for i in range(N - 2, -1, -1):
        if robot_positions[i] == 1:
            if robot_positions[i + 1] == 0 and converyor_belt[i + 1] >= 1:
                robot_positions[i + 1] = 1
                robot_positions[i] = 0
                converyor_belt[i + 1] -= 1
    robot_positions[-1] = 0

    # # 3. 올라가는 위치에 로봇이 없다면 로봇 추가
    if robot_positions[0] == 0 and converyor_belt[0] >= 1:
        robot_positions[0] = 1
        converyor_belt[0] -= 1

    # 4. 내구도 0인 칸의 개수가 K개 이상이면 종료
    if converyor_belt.count(0) >= K:
        break

print(step)