import sys
sys.stdin = open('input_5644.txt', 'r')

def calc_charge_amount(battery_charger, A_charger_cnt, B_charger_cnt):
    charge_amounts = [0, 0]
    # case 1. 두 사람 중 한 사람만 BC 범위가 있는 경우
    if (A_charger_cnt == 0 and B_charger_cnt) or (A_charger_cnt and B_charger_cnt == 0):
        add_charger_idx = 0 if A_charger_cnt else 1
        temp_amount = 0
        for charge_idx in battery_charger[add_charger_idx]:
            temp_amount = max(temp_amount, BC_info[charge_idx][3])
        charge_amounts[add_charger_idx] = temp_amount

    # case 2. 두 사람 모두 BC 범위에 있는데 BC 범위 리스트를 합쳤을 때 하나도 안 겹치는 경우
    elif (A_charger_cnt and B_charger_cnt):
        if len(set(battery_charger[0] + battery_charger[1])) == A_charger_cnt + B_charger_cnt:
            for add_charger_idx in range(2):
                temp_amount = 0
                for charge_idx in battery_charger[add_charger_idx]:
                    temp_amount = max(temp_amount, BC_info[charge_idx][3])
                charge_amounts[add_charger_idx] = temp_amount

        # case 3. 두 사람의 BC 범위가 하나 이상 겹치는 경우
        else:
            for A_charger_idx in battery_charger[0]:
                for B_charger_idx in battery_charger[1]:
                    if A_charger_idx != B_charger_idx:
                        temp_charges = [BC_info[A_charger_idx][3], BC_info[B_charger_idx][3]]
                        if sum(charge_amounts) < sum(temp_charges):
                            charge_amounts = temp_charges
                    else:
                        if sum(charge_amounts) < BC_info[A_charger_idx][3]:
                            charge_amounts = [BC_info[A_charger_idx][3] // 2, BC_info[A_charger_idx][3] // 2]

    return charge_amounts


for tc in range(int(input())):
    M, A = map(int, input().split()) # M: 이동 시간, A: BC의 개수
    move_info = []
    move_info.append(list(map(int, input().split())))
    move_info.append(list(map(int, input().split())))
    BC_info = [] # BC 정보
    for _ in range(A):
        X, Y, C, P = map(int, input().split())
        BC_info.append([Y - 1, X - 1, C, P])
    direction = { 0: [0, 0], 1: [-1, 0], 2: [0, 1], 3: [1, 0], 4: [0, -1] } # 이동 방향 관련 정보
    charge_sum = [0, 0] # 두 사람의 각 충전량 합
    position_A, position_B = [0, 0], [9, 9]

    for time in range(M + 1):
        # (1) 충전 과정
        # (1-1) 현재 위치가 어떤 BC 영역에 속하는지 확인
        battery_charger = [[], []]
        for idx in range(A):
            distance = abs(position_A[0] - BC_info[idx][0]) + abs(position_A[1] - BC_info[idx][1])
            if distance <= BC_info[idx][2]:
                battery_charger[0].append(idx)
        for idx in range(A):
            distance = abs(position_B[0] - BC_info[idx][0]) + abs(position_B[1] - BC_info[idx][1])
            if distance <= BC_info[idx][2]:
                battery_charger[1].append(idx)
        # (1-2) 최대 충전량 계산
        if len(battery_charger[0]) + len(battery_charger[1]):
            charge_amounts = calc_charge_amount(battery_charger, len(battery_charger[0]), len(battery_charger[1]))
            charge_sum[0] += charge_amounts[0]
            charge_sum[1] += charge_amounts[1]

        # (2) 이동 과정
        if time == M: continue
        position_A = [position_A[0] + direction[move_info[0][time]][0], position_A[1] + direction[move_info[0][time]][1]]
        position_B = [position_B[0] + direction[move_info[1][time]][0], position_B[1] + direction[move_info[1][time]][1]]

    print('#{} {}'.format(tc + 1, sum(charge_sum)))