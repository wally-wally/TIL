import sys
sys.stdin = open('input_5247.txt', 'r')

from collections import deque

def calc():
    operation = [+1, -1, -10]
    result = 0
    queue = deque()
    queue.append((N, 1))
    chk_list[N] = 1
    while queue:
        result += 1
        pop_elem, calc_cnt = queue.popleft()
        for idx in range(4):
            check_val = pop_elem + operation[idx] if idx != 3 else pop_elem * 2
            if check_val == M: return calc_cnt
            # 아래 조건식에서 반드시 해당값이 1 이상 1000000 이하인지 먼저 확인하자!!!
            if 1 <= check_val <= 1000000 and not chk_list[check_val]:
                chk_list[check_val] = 1
                queue.append((check_val, calc_cnt + 1))

for tc in range(int(input())):
    N, M = map(int, input().split())
    chk_list = [0] * 1000001
    print('#{} {}'.format(tc + 1, calc()))