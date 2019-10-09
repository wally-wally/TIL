import sys
sys.stdin = open('input_15486.txt', 'r')

sys.setrecursionlimit(10**7)
def DP(n):
    result = [0 for _ in range(n)]

    # 초기 상태(마지막 날은 1일간만 상담해야 들어갈 수 있음)
    if time_list[n - 1] == 1:
        result[n - 1] = price_list[n - 1]

    # 뒤에서부터 DP로 계산하여 경우를 나누어 판단
    for i in range(n - 2, -1, -1):
        # 상담이 퇴사 날짜 후에 끝나는 경우
        # 퇴사 날짜 이후에 끝나는 상담은 할 수 없으므로,
        # 그 상담을 하지 않은 다음 날짜의 최대 수익이 현재 날짜의 최대 수익이 된다.
        if i + time_list[i] > n:
            result[i] = result[i + 1]
        # 상담이 퇴사 날짜 전에 끝나는 경우
        # 이 상담을 하는 경우 : price_list[i] + result[i + time_list[i]]
        # (현재 상담 수익 + 상담이 끝났을 때의 날짜의 최대 수익)
        # 이 상담을 하지 않은 경우 : result[i + 1](그 다음 날짜의 최대 수익이 현재 날짜의 수익임)
        elif i + time_list[i] < n:
            result[i] = max(result[i + 1], price_list[i] + result[i + time_list[i]])
        # 상담이 정확히 마지막 날에 끝나는 경우
        # 현재 상담 수익과 현재 날짜의 수익을 비교하면 된다.
        else:
            result[i] = max(result[i + 1], price_list[i])
    return result[0]

N = int(input())
time_list, price_list = [], []
for _ in range(N):
    t, p = map(int, input().split())
    time_list.append(t)
    price_list.append(p)
print(DP(N))