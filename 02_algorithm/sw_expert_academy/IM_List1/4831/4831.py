import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
for i in range(T):
    data = list(map(int, input().split())) # data1, data2, data3 = map(int, input().split())
    bus_stop_No = list(map(int, input().split()))
    bus_electronic = data[0] + 1 # for문을 돌 때 마다 bus_electronic(전기량)을 -1하므로 처음에는 4(=3+1)라고 선언해줌
    charge_count = 0 # 충전 횟수 변수 선언
    stop_idx = 0
    for j in range(data[1]):
        bus_electronic -= 1 # 정류장 하나 이동할 때마다 전기량 -1
        if bus_electronic < 0: # 전기량이 부족해서 더 이상 갈 수 없는 경우 0을 출력
            charge_count = 0
            break # 그리고 for문 탈출(그 뒤의 정류장에 대해서는 더 이상 할 필요가 없기 때문)
        if j in bus_stop_No:
            stop_idx += 1
            if stop_idx < len(bus_stop_No):
                if bus_electronic < bus_stop_No[stop_idx] - bus_stop_No[stop_idx - 1]:
                    bus_electronic = data[0]
                    charge_count += 1
            else: # 현재 정류장 위치가 충전소가 있는 마지막 정류장에 왔으면
                if bus_electronic < data[1] - bus_stop_No[stop_idx - 1]:
                    bus_electronic = data[0]
                    charge_count += 1
    print('#{} {}'.format(i+1, charge_count))