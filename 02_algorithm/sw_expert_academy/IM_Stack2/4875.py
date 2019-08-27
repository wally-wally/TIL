import sys
sys.stdin = open('sample_input_4875.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    dx = [-1, 0, +1, 0] # 상 우 하 좌
    dy = [0, +1, 0, -1] # 상 우 하 좌
    start_x, start_y = 0, 0 # 2 위치
    end_x, end_y = 0, 0 # 3 위치
    maze = []
    for b in range(N):
        line = []
        data = input()
        num = 0
        for c in data:
            line.append(int(c))
            if c == '2':
                start_x = b
                start_y = num
            num += 1
        maze.append(line)
    memory_x = start_x
    memory_y = start_y
    # print(maze, start_x, start_y, end_x, end_y)

    init_crossroads = 0
    for p in range(4): # 초기 위치 갈림길 개수 확인
        if start_x + dx[p] >= 0 and start_y + dy[p] >= 0:
            if start_x + dx[p] < N and start_y + dy[p] < N:
                if maze[start_x + dx[p]][start_y + dy[p]] == 0:
                    init_crossroads += 1
    # print(init_crossroads)

    stack = [[-1, -1, -2]]
    result = 0
    position = 0
    compare = 0
    while True:
        blockage = 1
        for i in range(position, 4):  # 4방향 0 확인
            if start_x + dx[i] >= 0 and start_y + dy[i] >= 0:
                if start_x + dx[i] < N and start_y + dy[i] < N:
                    if start_x + dx[i] != stack[-1][0] or start_y + dy[i] != stack[-1][1]:
                        if maze[start_x + dx[i]][start_y + dy[i]] == 0:
                            stack.append([start_x, start_y, i])
                            start_x = start_x + dx[i]
                            start_y = start_y + dy[i]
                            blockage = 0
                            position = 0
                            # print("stack : {}".format(stack))
                            # print(stack[-1])
                            # print(start_x, start_y)
                            break
                        elif maze[start_x + dx[i]][start_y + dy[i]] == 3:
                            result = 1
                            break
        if result:
            break
        if blockage and len(stack) >= 2:
            move = stack.pop()
            if move[0] == memory_x and move[1] == memory_y:
                compare += 1
            start_x, start_y, position = move[0], move[1], move[2]+1
        #     print("out stack : {}".format(stack))
        # print(compare)
        if stack == [[-1, -1, -2]] and compare == init_crossroads:
            result = 0
            break
    print('#{} {}'.format(a + 1, result))



'''
        if (start_x, start_y) in visited:
            stack.pop()
            start_x, start_y = stack[-1][0], stack[-1][1]
        else:
            for i in range(4): # 4방향 0 확인
                if start_x + dx[i] >= 0 and start_y + dy[i] >= 0:
                    if start_x + dx[i] < N and start_y + dy[i] < N:
                        if maze[start_x + dx[i]][start_y + dy[i]] == 0 or maze[start_x + dx[i]][start_y + dy[i]] == 3:
                            stack.append((start_x + dx[i], start_y + dy[i]))
                            visited.append((start_x + dx[i], start_y + dy[i]))
                            print("stack : {}".format(stack))
                            print("visited : {}".format(visited))
                            break
        if maze[stack[-1][0]][stack[-1][1]] == 3:
            result = 1
            break
        # start_x, start_y = stack[-1][0], stack[-1][1]
        # print(start_x, start_y)
    print('#{} {}'.format(a + 1, result))
'''
