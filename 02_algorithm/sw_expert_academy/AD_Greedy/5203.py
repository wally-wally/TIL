import sys
sys.stdin = open('input_5203.txt', 'r')

def baby_gin(lst, chk_num):
    counting_list = [0] * 10
    for num in lst:
        counting_list[num] += 1
    for idx in range(10):
        if counting_list[idx] == 3:
            return 1 if not chk_num else 2
        if idx <= 7:
            if counting_list[idx] >= 1 and counting_list[idx + 1] >= 1 and counting_list[idx + 2] >= 1:
                return 1 if not chk_num else 2


for test_case in range(int(input())):
    player_1, player_2 = [], []
    numbers = list(map(int, input().split()))
    for idx in range(len(numbers)):
        if not idx % 2:
            player_1.append(numbers[idx])
        else:
            player_2.append(numbers[idx])
        if idx >= 4:
            if not idx % 2 and len(player_1) >= 3:
                baby_gin_value = baby_gin(sorted(player_1), idx % 2)
                if baby_gin_value is not None:
                    print('#{} {}'.format(test_case + 1, baby_gin_value))
                    break
            elif idx % 2 and len(player_2) >= 3:
                baby_gin_value = baby_gin(sorted(player_2), idx % 2)
                if baby_gin_value is not None:
                    print('#{} {}'.format(test_case + 1, baby_gin_value))
                    break
    else:
        print('#{} 0'.format(test_case + 1))