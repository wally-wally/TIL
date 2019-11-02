import sys
sys.stdin = open('input.txt', 'r')

N, K = map(int, input().split())
medals = [list(map(int, input().split())) for _ in range(N)]
sort_medal = sorted(medals, key = lambda x:(x[1], x[2], x[3]), reverse=True)
idx = 0
for i in range(N):
    if sort_medal[i][0] == K:
        idx = i
        break
while sort_medal[idx - 1][1:] == sort_medal[idx][1:]:
    idx -= 1
print(idx + 1)