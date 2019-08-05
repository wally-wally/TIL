arr = [[9, 20, 2, 18, 11],
[19, 1, 25, 3, 21],
[8, 24, 10, 17, 7],
[15, 4, 16, 5, 6],
[12, 13, 22, 23, 14]]

N, M = len(arr), len(arr[0])

# dx, dy 각각 리스트로 저장
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]

for x in range(N):
    for y in range(M):
        Sum = 0
        test = []
        for i in range(4):
            tx, ty = x + dx[i], y + dy[i]
            if tx < 0 or tx == N or ty < 0 or ty == N:
                continue
            test.append(abs(arr[tx][ty]-arr[x][y]))
        print('%2d' % sum(test), end = ' ')
    print()