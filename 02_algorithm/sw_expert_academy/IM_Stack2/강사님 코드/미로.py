import sys

def find():
    dRow = [0,1,0,-1]
    dCol = [1,0,-1,0]
    s = []
    s.append([sRow,sCol])               # 입구로 이동           
    maze[sRow][sCol] = 1                 # 방문 표시
    while(len(s)!=0):
        n = s.pop()                                     # 갈수있는 칸 좌표를 꺼내
        for i in range(4):                              # 주변 좌표 계산
            nRow = n[0] + dRow[i]                         
            nCol = n[1] + dCol[i]
            if nRow>=0 and nRow<N and nCol>=0 and nCol<N: # 미로 내부
                if maze[nRow][nCol] == 3:             # 출구인경우 1반환
                    return 1
                elif maze[nRow][nCol] == 0:           # 갈 수 있는 곳 저장
                    s.append([nRow,nCol])
                    maze[n[0]][n[1]] = 1
    return 0                            # 출구에 가지 못하고 모든칸 방문

sys.stdin = open('input.txt', 'r')
T = int(input())

for tc in range(1, T+1):
    N = int(input())
    maze = [[int(x) for x in input()] for i in range(N)] # 미로를 중첩리스트로 저장
    for i in range(N):
        if 2 in maze[i]:
            sRow = i            # 출발 row index
            sCol = maze[i].index(2)            # 출발 column index
    print('#{} {}'.format(tc, find()))