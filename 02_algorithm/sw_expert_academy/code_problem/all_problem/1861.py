import sys
sys.stdin = open('input_1861.txt', 'r')

def find_num(r, c, cnt):
    cnt += 1
    while True:
        for direction in [(-1, 0), (0, +1), (+1, 0), (0, -1)]:
            new_r, new_c = r + direction[0], c + direction[1]
            if 0 <= new_r < N and 0 <= new_c < N:
                if arr[new_r][new_c] - arr[r][c] == 1:
                    cnt += 1
                    r, c = new_r, new_c
                    break
        else:
            return cnt

for tc in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    result = 0
    room_number = 0
    for x in range(N * N):
        a, b = x // N, x % N
        # 현재 기준점을 기준으로 4방향을 탐색하여 하나라도 1 큰수가 있고 1 작은 수가 없으면 탐색 시작
        one_more, one_less = False, False
        for direct in [(-1, 0), (0, +1), (+1, 0), (0, -1)]:
            new_a, new_b = a + direct[0], b + direct[1]
            if 0 <= new_a < N and 0 <= new_b < N:
                if arr[new_a][new_b] - arr[a][b] == 1:
                    one_more = True
                if arr[a][b] - arr[new_a][new_b] == -1:
                    one_less = True
        if one_more and one_less:
            value = find_num(a, b, 0)
            if result < value:
                room_number, result = arr[a][b], value
            elif result == value:
                result = value
                if room_number > arr[a][b]:
                    room_number = arr[a][b]
    print('#{} {} {}'.format(tc + 1, room_number, result))