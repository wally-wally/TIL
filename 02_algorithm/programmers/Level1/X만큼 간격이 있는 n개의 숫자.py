def solution(x, n):
    answer = []
    cnt = 1
    while cnt <= n:
        answer.append(x * cnt)
        cnt += 1
    return answer