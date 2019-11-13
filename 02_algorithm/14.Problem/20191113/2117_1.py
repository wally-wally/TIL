import sys
sys.stdin = open('input_2117.txt', 'r')

# 2117. 홈 방범 서비스 solution 01
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
        # 맨해튼 거리로 기준점 좌표와 각 집 사이의 거리 계산
        distances = [abs(row - home_point[0]) + abs(col - home_point[1]) for home_point in home_points]
        
        # (a)기준점 좌표와 각 꼭지점 사이 거리(맨해튼 거리) 계산 => (b)그 중 가장 큰 값(max_dist) => (c)1부터 max_dist + 1 까지 K 증가하면 됨
        vertax = [(0, 0), (0, N - 1), (N - 1, 0), (N - 1, N - 1)] # (a) / vertax : 각 꼭짓점 좌표
        max_dist = 0
        for ver in vertax:
            max_dist = max(max_dist, abs(row - ver[0]) + abs(col - ver[1])) # (b)

        for K in range(1, max_dist + 2): # (c)
            home_cnt = len(list(filter(lambda x: x < K, distances))) # 방범 영역 안에 있는(맨해튼 거리가 K - 1 이하인 경우) 집의 개수
            if result >= home_cnt: continue # 현재 구한 집의 개수가 현재까지 도출된 result 보다 작거나 같으면 굳이 최종 이익 조건 판단까지 고려할 필요가 없다.
            profit = M * home_cnt - (K**2 + (K-1)**2)
            # 손해를 보면 안되므로 보안회사의 이익(profit)이 0 이상인 경우 result를 현재 구한 집의 개수(home_cnt)와 비교한다.
            if profit >= 0:
                result = max(result, home_cnt)

    print('#{} {}'.format(tc + 1, result))