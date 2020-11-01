import sys
sys.stdin = open('input_15558.txt', 'r')

def BFS():
    queue = [[0, 0]]
    for i in range(N):
        for _ in range(len(queue)):
            r, c = queue.pop(0)
            for new_r, new_c in [(r, c - 1), (r, c + 1), (not r, c + K)]:
                if new_c >= N:
                    return 1
                if new_c > i and not visit[new_r][new_c]:
                    if arr[new_r][new_c] == '1':
                        queue.append([new_r, new_c])
                        visit[new_r][new_c] = 1
    return 0

N, K = map(int, input().split())
arr = [list(input().strip()) for _ in range(2)]
visit = [[0] * N for _ in range(2)]
print(BFS())