import sys
sys.stdin = open('input_2117.txt', 'r')

# 2117. 홈 방범 서비스 solution 02
for tc in range(int(input())):
    N, M = map(int, input().split()) # N: 도시의 크기, M: 한 집 당 지불 비용
    security_map = [list(map(int, input().split())) for _ in range(N)]

    home_points = [] # 집의 좌표들
    for idx in range(N * N):
        row, col = idx // N, idx % N # 기준점 좌표
        if security_map[row][col] == 1:
            home_points.append((row, col))
    
    result = 0 # 최종 도출할 정답을 담을 변수
    for idx in range(N * N):
        row, col = idx // N, idx % N
        # 맨해튼 거리로 기준점 좌표와 각 집 사이의 거리 계산하여
        # distances의 그 값을 인덱스로 하는 요소를 +1 해준다.
        # 그러면 기준점 좌표를 기준으로 distances의 인덱스 값만큼 떨어져 있는 집의 개수를 알 수 있다.
        distances = [0] * (2 * N)
        for home_point in home_points:
            distances[abs(row - home_point[0]) + abs(col - home_point[1])] += 1

        # 지도를 다 덮을 때까지 K를 증가시키는 최대 범위는 1 부터 2 * N - 1 이다.
        # 2 * N - 1은 각 꼭짓점에서 반대방향 대각선까지(ex. 좌측 상향 대각선에서 우측 하향 대각선까지) 확장하는데 필요한 K 값이다.
        for K in range(1, 2 * N):
            if K > 1: # K가 1인 경우 맨해튼 거리가 0인 집들의 개수만 필요하므로 distances[K - 1] += distances[K - 2] 구문은 실행하지 않는다.
                # K가 2 이상인 경우부터는 K가 확장되면서 방범 영역에 포함되는 집의 개수가 K가 현재 값 - 1 이하까지의 집의 개수들을 모두 포함하므로
                # 이전 distances의 값들을 계속 더해준다.
                distances[K - 1] += distances[K - 2]
            # 즉, K가 x인 경우 방범 영역에 포함되는 집의 총 개수는
            # 기준점 좌표로부터 그 집까지의 거리가 맨해튼 거리가 x - 1 이하인 집들의 총 개수이다.
            home_cnt = distances[K - 1]
            profit = M * home_cnt - (K**2 + (K-1)**2)
            if profit >= 0: # 손해를 보면 안되므로 보안회사의 이익(profit)이 0 이상인 경우 result를 현재 구한 집의 개수(home_cnt)와 비교한다.
                result = max(result, home_cnt)

    print('#{} {}'.format(tc + 1, result))