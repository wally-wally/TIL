import sys
sys.stdin = open('input.txt', 'r')

for a in range(10):
    N, data = map(str, input().split())
    string = [num for num in data]
    idx = 0
    while True:
        if idx >= len(string) - 1:
            break
        if string[idx] == string[idx + 1]:
            string.pop(idx)
            string.pop(idx)
            if idx != len(string):
                while True:
                    if string[idx] != string[idx - 1]:
                        break
                    elif string[idx] == string[idx - 1]:
                        string.pop(idx - 1)
                        string.pop(idx - 1)
                        idx -= 1
            else:
                break
        else:
            idx += 1
            
    print('#{}'.format(a + 1), end=' ')
    for n in string:
        if n != -1:
            print(n, end='')
    print()
    

# for a in range(10):
#     N, string = map(str, input().split())
#     lst = [num for num in string]
#     idx = 0
#     while True:
#         if idx >= int(N):
#             break
#         if idx + 1 < int(N):
#             if lst[idx] == lst[idx + 1]:
#                 lst[idx], lst[idx + 1] = -1, -1
#                 f_delta, b_delta = 1, 0
#                 while True:
#                     b_delta += 1
#                     if idx >= 0 and idx + 1 < int(N) - 1:
#                         if lst[idx - f_delta] != lst[idx + 1 + b_delta]:
#                             idx = idx + 1 + delta
#                             break
#                         elif lst[idx - f_delta] == lst[idx + 1 + b_delta]:
#                             lst[idx - delta], lst[idx + 1 + b_delta] = -1, -1
#                     else:
#                         idx = idx + 1 + b_delta
#                         break
#             else:
#                 idx += 1
        
#         else:
#             break
#     print('#{}'.format(a + 1), end=' ')
#     for n in lst:
#         if n != -1:
#             print(n, end='')
#     print()