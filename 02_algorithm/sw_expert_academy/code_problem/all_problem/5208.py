import sys
sys.stdin = open('input_5208.txt', 'r')

def battery_check(idx, remain_battery, charge_cnt):
    global result
    if result < charge_cnt or remain_battery < 0:
        return
    if result >= charge_cnt:
        if idx == N - 1:
            result = charge_cnt
            return
        else:
            battery_check(idx + 1, remain_battery - 1, charge_cnt)
            battery_check(idx + 1, charge_spot[idx] - 1, charge_cnt + 1)


for test_case in range(int(input())):
    data = list(map(int, input().split()))
    N, charge_spot = data[0], data[1:]
    result = 10000000
    charge_cnt = 0
    battery_check(1, charge_spot[0] - 1, charge_cnt) # 다음 판별 위치, 남은 배터리 양, 충전 횟수
    print('#{} {}'.format(test_case + 1, result))