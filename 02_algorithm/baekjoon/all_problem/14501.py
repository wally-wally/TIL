import sys
sys.stdin = open('input.txt', 'r')

def retire(n, time, price):
    result = [0 for i in range(n)]

    # 초기 상태(마지막 날은 1일간만 상담해야 들어갈 수 있음)
    if time[n - 1] == 1:
        result[n - 1] = price[n - 1]
    
    # 뒤에서부터 계산(백트래킹?)
    for i in range(n - 2, -1, -1):
        if i + time[i] == n:
            result[i] = max(price[i], result[i + 1])
        elif i + time[i] < n:
            result[i] = max(price[i] + result[i + time[i]], result[i + 1])
        elif i + time[i] > n:
            result[i] = result [i + 1]
    return result[0]

N = int(input())
time_list, price_list = [], []
for _ in range(N):
    t, p = map(int, input().split())
    time_list.append(t)
    price_list.append(p)

print(retire(N, time_list, price_list))