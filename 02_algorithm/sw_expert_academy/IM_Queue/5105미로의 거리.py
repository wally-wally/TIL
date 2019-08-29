import sys
sys.stdin = open('5105_input.txt', 'r')

def IsSafe(y,x):
    return 0 <= y < N and 0<= x < N and (Maze[y][x] == 0 or Maze[y][x] == 3)

def BFS(start_y, start_x):
    global D_result
    Q.append((start_y, start_x))
    visited.append((start_y, start_x))

    while Q:
        start_y, start_x = Q.pop(0)
        for dir in range(4):
            NewY = start_y + dy[dir]
            NewX = start_x + dx[dir]
            if IsSafe(NewY, NewX) and (NewY, NewX) not in visited:
                Q.append((NewY, NewX))
                visited.append((NewY, NewX))
                Distance[NewY][NewX] = Distance[start_y][start_x] +1
                if Maze[NewY][NewX] == 3:
                    D_result = Distance[NewY][NewX] -1
                    return


TC = int(input())
for tc in range(1, TC+1):
    N = int(input())
    Maze = [list(map(int, input())) for _ in range(N)]
    visited = [[0]*N for _ in range(N)]

    for y in range(N):
        for x in range(N):
            if Maze[y][x] == 2:
                start_y, start_x = y, x

    dy = [1, -1, 0, 0]
    dx = [0, 0, -1, 1]

    D_result = 0
    Q = []
    Distance = [[0]*N for _ in range(N)]
    BFS(start_y, start_x)
    print('#{} {}'.format(tc, D_result))



# 아래 코드는 분명히 맞는거 같은데 왜 안될까요...
# 테스트케이스 10개 중에서 9개는 맞는데 1개만 계속 틀리다고 떠요...
'''
def find():
    dRow = [0, 1, 0, -1]
    dCol = [1, 0, -1, 0]
    s = []
    s.append([sRow, sCol]) # 입구로 이동
    visit_variable = 4
    maze[sRow][sCol] = visit_variable # 처음 방문 표시
    while True:
        temp_list = []
        visit_variable += 1
        while (len(s) != 0):
            n = s.pop() # 갈수있는 칸 좌표를 꺼내
            for i in range(4): # 주변 좌표 계산
                nRow = n[0] + dRow[i]
                nCol = n[1] + dCol[i]
                if nRow >= 0 and nRow < N and nCol > 0 and nCol < N: # 미로 내부
                    if maze[nRow][nCol] < 4:
                        if maze[nRow][nCol] == 3: # 출구인 경우 1 반환
                            return visit_variable - 5
                        elif maze[nRow][nCol] == 0: # 갈 수 있는 곳 저장
                            temp_list.append([nRow, nCol])
                            maze[n[0]][n[1]] = visit_variable
        if len(temp_list) == 0:
            return 0 # 출구에 가지 못하고 모든칸 방문
        else:
            for temp in temp_list:
                s.append(temp)

T = int(input())

for tc in range(1, T + 1):
    N = int(input())
    maze = [[int(x) for x in input()] for _ in range(N)]
    for i in range(N):
        if 2 in maze[i]:
            sRow = i
            sCol = maze[i].index(2)
    print('#{} {}'.format(tc, find()))
'''