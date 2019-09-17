import sys
sys.stdin = open('input_5202.txt', 'r')

for test_case in range(int(input())):
    N = int(input())
    all_time = []
    for a in range(N):
        data = list(map(int, input().split()))
        if not len(all_time):
            all_time.append(data)
        else:
            for b in range(len(all_time)):
                if all_time[b][1] > data[1]:
                    all_time.insert(b, data)
                    break
                elif all_time[b][1] == data[1]:
                    if all_time[b][0] > data[0]:
                        all_time.insert(b, data)
                        break
            else:
                all_time.append(data)
    criterion = all_time[0]
    result = 1
    for idx in range(1, N):
        if criterion[1] <= all_time[idx][0]:
            criterion = all_time[idx]
            result += 1
    print('#{} {}'.format(test_case + 1, result))       