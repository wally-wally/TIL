import sys
sys.stdin = open('input_17779.txt', 'r')

def calc_gerrymandering(r, c, max_d1, max_d2):
    global answer
    for d1 in range(1, max_d1 + 1):
        for d2 in range(1, max_d2 + 1):
            election_districts = [0, 0, 0, 0, 0]
            if d1 + d2 <= max_d1 + max_d2:
                for idx in range(N * N):
                    row, col = idx // N, idx % N
                    # No.1 election_district
                    if (0 <= row < r + d1 and 0 <= col <= c) and row + col < r + c:
                        election_districts[0] += city_map[row][col]
                    # No.2 election_district
                    elif (0 <= row <= r + d2 and c < col <= N - 1) and col - row > c - r:
                        election_districts[1] += city_map[row][col]
                    # No.3 election_district
                    elif (r + d1 <= row <= N - 1 and 0 <= col < c - d1 + d2) and (row - col) > (r + d1) - (c - d1):
                        election_districts[2] += city_map[row][col]
                    # No.4 election_district
                    elif (r + d2 < row <= N - 1 and c - d1 + d2 <= col <= N - 1) and (row + col) > (r + d1 + d2) + (c - d1 + d2):
                        election_districts[3] += city_map[row][col]
                    # No.5 election_district
                    else:
                        election_districts[4] += city_map[row][col]
                now_diff = max(election_districts) - min(election_districts)
                if now_diff < answer:
                    answer = now_diff


def check_boundary_length(r, c):
    max_d1, max_d2 = 0, 0
    # check max d1
    virtual_calc_d1 = c
    max_d1 = virtual_calc_d1 if r + virtual_calc_d1 < N - 1 else N - 1 - r - 1
    # check max d2
    virtual_calc_d2 = N - 1 - c
    max_d2 = virtual_calc_d2 if r + virtual_calc_d2 < N - 1 else N - 1 - r - 1
    return max_d1, max_d2


N = int(input())
city_map = [list(map(int, input().split())) for _ in range(N)]

answer = 0xffffff
for r in range(N - 2):
    for c in range(1, N - 1):
        max_d1, max_d2 = check_boundary_length(r, c)
        calc_gerrymandering(r, c, max_d1, max_d2)

print(answer)