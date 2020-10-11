import sys
sys.stdin = open('input_15684.txt', 'r')

# pypy3로 제출
import itertools

def check_add_available(point, ladder_points):
    a, b = point
    if ladder_points[a][b - 1] == 1 or ladder_points[a][b + 1] == 1:
        return False
    return True


def check_same_line(ladder_points, col, N, H):
    now_row, now_col = 1, col
    while now_row <= H:
        if ladder_points[now_row][now_col - 1] == 1:
            now_col -= 1
        elif ladder_points[now_row][now_col] == 1:
            now_col += 1
        now_row += 1
    return now_col == col

answer = -1
# 세로선 수, 가로선 수, 세로선마다 가로선 놓을 수 있는 위치 개수
N, M, H = map(int, input().split())
# 가로선 만들 수 있는 지점 확인
ladder_points = [[0 for _ in range(N + 1)] for _ in range(H + 1)]

if M > 0:
    for _ in range(M):
        a, b = map(int, input().split()) # a: 가로선, b: 세로선
        ladder_points[a][b] = 1

    # 우선 현재 상태에서 i => i 형태가 가능한지 체크
    correct_ladder = True
    for col in range(1, N + 1):
        if not check_same_line(ladder_points, col, N, H):
            correct_ladder = False
            break

    if not correct_ladder:
        # 가로선 만들 수 있는 지점 튜플 형태로 저장
        # 단, 연달아 같은 라인에 가로선은 배치할 수 없는 경우들은 제외
        candidate_points = []
        for i in range(1, H + 1):
            for j in range(1, N):
                if ladder_points[i][j] == 0:
                    if check_add_available((i, j), ladder_points):
                        candidate_points.append((i, j))

        # 추가되는 가로선 개수를 1부터 3까지 늘리면서 i => i 형태가 되면 종료
        break_var = 0
        for add_count in range(1, 4):
            for comb in itertools.combinations(candidate_points, add_count):
                for point in comb:
                    ladder_points[point[0]][point[1]] = 1
                for col in range(1, N + 1):
                    if not check_same_line(ladder_points, col, N, H):
                        break
                else:
                    break_var = 1
                    break
                for point in comb:
                    ladder_points[point[0]][point[1]] = 0
            if break_var:
                answer = add_count
                break
    else:
        answer = 0
else:
    answer = 0
print(answer)