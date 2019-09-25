import sys
sys.stdin = open('input_1799.txt', 'r')

def bishop_2(idx, val):
    global result
    print('#{}'.format(idx))
    if idx == N:
        if val >= result:
            result = val
            return
        else:
            return
    var_check = 0
    for k in range(N):
        if arr[k][idx] == 1:
            arr[k][idx], val = 2, val + 1
            var_check = 1
    if var_check:
        check_direction = [(-1, -1), (-1, +1), (+1, +1), (+1, -1)]
        for var_posi in range(N):
            if arr[var_posi][idx] == 2:
                for n in range(4):
                    a = 1
                    while True:
                        new_x, new_y = idx + a * check_direction[n][0], var_posi + a * check_direction[n][1]
                        if 0 <= new_x < N and 0 <= new_y < N:
                            if arr[new_x][new_y] == 1:
                                arr[new_x][new_y] = 3
                            a += 1
                        else:
                            break
            for elem in arr:
                for ele in elem:
                    print(ele, end=' ')
                print()
            print()
    print(val, idx, used)
    for i in range(N):
        if not used[i]:
            used[i] = True
            print('-------------------------')
            bishop_2(idx + 1, val)
            return
    else:
        bishop_2(N, val)
        return


def bishop(idx, val):
    global result
    # print('#{}'.format(idx))
    if idx == N:
        if val >= result:
            result = val
            return
        else:
            return
    var_check = 0
    for k in range(N):
        if arr[idx][k] == 1:
            arr[idx][k], val = 2, val + 1
            var_check = 1
    if var_check:
        check_direction = [(-1, -1), (-1, +1), (+1, +1), (+1, -1)]
        for var_posi in range(N):
            if arr[idx][var_posi] == 2:
                for n in range(4):
                    a = 1
                    while True:
                        new_x, new_y = idx + a * check_direction[n][0], var_posi + a * check_direction[n][1]
                        if 0 <= new_x < N and 0 <= new_y < N:
                            if arr[new_x][new_y] == 1:
                                arr[new_x][new_y] = 3
                            a += 1
                        else:
                            break
    #         for elem in arr:
    #             for ele in elem:
    #                 print(ele, end=' ')
    #             print()
    #         print()
    # print(val, idx, used)
    for i in range(N):
        if not used[i]:
            used[i] = True
            # print('-------------------------')
            bishop(idx + 1, val)
            return
    else:
        bishop(N, val)
        return
                

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
origin_arr = arr[:]
result = 0
bishop_count = 0
used = [False] * N
for index in range(N):
    used[index] = True
    bishop(index, bishop_count)
    used[index] = False
    arr = origin_arr
bishop_count = 0
used = [False] * N
print(arr)
for index_ in range(N):
    used[index_] = True
    bishop_2(index_, bishop_count)
    used[index_] = False
    arr = origin_arr
print(result)