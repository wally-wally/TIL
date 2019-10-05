import sys
sys.stdin = open('input.txt', 'r')

def check(distance):
    count = 1
    cur_home = home[0]
    for i in range(1, N):
        if distance <= home[i] - cur_home:
            count += 1
            cur_home = home[i]
    
    return count

N, C = map(int, input().split())
home = sorted([int(input()) for _ in range(N)])
start, end, answer = 1, home[-1] - home[0], 0
end = home[-1] - home[0]
while start <= end:
    mid = (start + end) // 2
    router_cnt = check(mid)
    if router_cnt < C:
        end = mid - 1
    elif router_cnt >= C:
        answer = mid
        start = mid + 1
print(answer)