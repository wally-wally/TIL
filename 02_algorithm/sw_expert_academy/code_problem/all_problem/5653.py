import sys
sys.stdin = open('input_5653.txt', 'r')

# from pprint import pprint

dx, dy = [-1, 0, +1, 0], [0, +1, 0, -1] # 4방향
for tc in range(int(input())):
    N, M, K = map(int, input().split())
    result = 0
    life_data = {} # 각 셀의 위치, 생명력 데이터
    for i in range(N):
        line = list(map(int, input().split()))
        for j in range(M):
            if line[j] > 0:
                # value의 첫 번째 인자 : 생명력 초기 값
                # value의 두 번째 인자 : 시간이 지남에 따라 감소하는 생명력 값
                # value의 세 번째 인자 : 세포 상태 - 0(비활성), 1(활성), -1(죽은 상태)
                # value의 네 번째 인자 : 번식 유무 - 0(번식 안 함), 1(번식함)
                life_data.update({(i, j): (line[j], 2 * line[j], 0, 0)})
                result += 1
    for _ in range(K):
        temp_dict = {}
        for key, value in life_data.items():
            life_data[key] = (value[0], value[1] - 1, value[2], value[3])
            v0, v1, v2, v3 = value[0], value[1] - 1, value[2], value[3]
            if v2 == -1: continue
            if v0 == v1 and v2 == 0:
                life_data[key] = (v0, v1, 1, 0)
            elif v2 == 1 and v3 == 0:
                life_data[key] = (v0, v1, v2, 1)
                for k in range(4):
                    new_x, new_y = key[0] + dx[k], key[1] + dy[k]
                    if (new_x, new_y) not in life_data:
                        if (new_x, new_y) in temp_dict:
                            if temp_dict[(new_x, new_y)][0] >= v0: continue
                        temp_dict.update({(new_x, new_y): (v0, 2 * v0, 0, 0)})
                        result += 1
            if v1 == 0:
                life_data[key] = (0, 0, -1, 1)
                result -= 1
        for k, v in temp_dict.items():
            life_data.update({k: v})
    print('#{} {}'.format(tc + 1, result))