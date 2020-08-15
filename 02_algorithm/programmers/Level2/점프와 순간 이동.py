def solution(n):
    answer = 0
    while (n > 0):
        mok, nmg = divmod(n, 2)
        answer += nmg
        n = mok
    return answer