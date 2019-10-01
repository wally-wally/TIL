import sys
sys.stdin = open('input_1244.txt', 'r')

def change_num(s, e, ch_num, ch_cnt, idx_list):
    global result
    if ch_cnt == change:
        if result <= int(ch_num):
            result = int(ch_num)
        return
    for n in range(digit ** 2):
        s, e = n // digit, n % digit
        if idx_list.count(sorted([s, e])) <= 2:
            idx_list.append(sorted([s, e]))
            st_num = [c for c in str(ch_num)]
            if s != e and st_num[s] <= st_num[e]:
                st_num[s], st_num[e] = st_num[e], st_num[s]
                change_num(s, e, ''.join(st_num), ch_cnt + 1, idx_list)
                st_num[s], st_num[e] = st_num[e], st_num[s]

for tc in range(int(input())):
    N, change = map(int, input().split())
    digit, result = len(str(N)), 0
    string_num = [num for num in str(N)]
    for a in range(digit ** 2):
        start, end = a // digit, a % digit
        if start != end: # 가로, 세로 인덱스가 같은 경우 교환을 안하므로 제외시킨다.
            string_num[start], string_num[end] = string_num[end], string_num[start]
            change_num(start, end, ''.join(string_num), 1, [[start, end]])
            string_num[start], string_num[end] = string_num[end], string_num[start]
    print('#{} {}'.format(tc + 1, result))