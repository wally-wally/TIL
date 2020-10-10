import sys
sys.stdin = open('input_1389.txt', 'r')

def make_user_info(user1, user2, info):
    if user1 not in info:
        info[user1] = [user2]
    else:
        info[user1].append(user2)
    return info

N, M = map(int, input().split())
user_info = dict()
for _ in range(M):
    A, B = map(int, input().split())
    user_info = make_user_info(A, B, user_info)
    user_info = make_user_info(B, A, user_info)

answer = (0xffff, 0xffff) # 케빈 베이컨 수, 사람 번호
for i in range(1, N + 1):
    visited = [-1 for _ in range(N + 1)]
    kevin_becon_number = 0
    queue = [i]
    visited[i] = 0
    while queue:
        now_user_number = queue.pop(0)
        for j in user_info[now_user_number]:
            if visited[j] == -1:
                visited[j] = visited[now_user_number] + 1
                queue.append(j)
    now_kevin_becon = sum(visited[1:])
    if answer[0] > now_kevin_becon:
        answer = (now_kevin_becon, i)
print(answer[1])