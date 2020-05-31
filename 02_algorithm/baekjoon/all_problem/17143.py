import sys
sys.stdin = open('input_17143.txt', 'r')

R, C, M = map(int, input().split())
shark_position = dict()
shark_info = []
for m in range(M):
    r, c, s, d, z = map(int, input().split())
    shark_position[(r - 1, c - 1)] = m
    if d == 3:
        d = 4
    elif d == 4:
        d = 3
    shark_info.append((s, d, z))

change_idx_direct = [(1, -1, 1), (-1, 1, -1)]
answer = 0
for fishing_king_idx in range(C):
    sorted_shark_position = sorted(shark_position.items(), key=lambda x: (x[0][1], x[0][0]))
    # 1. 낚시왕이 오른쪽으로 한 칸 이동 후 낚시왕이 있는 열에서 제일 가까운 상어 잡기
    same_col_sharks = list(filter(lambda x: x[0][1] == fishing_king_idx, sorted_shark_position))
    if len(same_col_sharks):
        answer += shark_info[same_col_sharks[0][1]][2]
        del shark_position[same_col_sharks[0][0]]
    
    # 4. 마지막 열에서 상어 잡은 후의 상어 이동은 고려할 필요 없음
    if fishing_king_idx == C - 1:
        print(answer)
        break

    # 2. 상어 이동
    shark_new_position = dict()
    for position in shark_position.items():
        row, col = position[0]
        speed, direct, size = shark_info[position[1]]

        # 2-1. 속력 / (R - 1 또는 C - 1)의 나머지 값 계산
        x, y, z = 0, 0, 0
        criteria = (row, R) if direct <= 2 else (col, C)
        x = criteria[0] if direct % 2 else criteria[1] - 1 - criteria[0]
        y = criteria[1] - 1 - (1 if x == criteria[1] - 1 else 0)
        z = 2 * (criteria[1] - 1) - 1 - (x + y)
        divided_remainder = [x, y, z]

        # 2-2. 계산한 나머지 값에 따른 이동 후 위치 정보 계산
        after_move_remainder = speed % (2 * (criteria[1] - 1))
        increment_change = change_idx_direct[direct % 2]
        temp_remainder, now_change_idx = 0, criteria[0]
        for i in range(3):
            temp_remainder += divided_remainder[i]
            if after_move_remainder <= temp_remainder:
                now_change_idx += ((after_move_remainder - temp_remainder + divided_remainder[i]) * increment_change[i])
                # 2-3. 이동 후 새로운 방향 정보 저장
                if i == 1:
                    new_direction = direct + increment_change[i]
                    shark_info[position[1]] = (speed, new_direction, size)
                break
            else:
                now_change_idx += (divided_remainder[i] * increment_change[i])

        # 2-4. 이동한 위치에 기존에 상어 정보가 있다면 크기 비교해서 저장할 하나의 상어 선정
        new_position = (now_change_idx, col) if direct <= 2 else (row, now_change_idx)
        if new_position not in shark_new_position:
            shark_new_position[new_position] = position[1]
        else:
            exist_idx = shark_new_position[new_position]
            if shark_info[exist_idx][2] < size:
                shark_new_position[new_position] = position[1]

    # 3. 격자판에 남은 상어가 없는 경우 더 이상 할 필요가 없음
    if not len(shark_new_position):
        print(answer)
        break

    shark_position = shark_new_position