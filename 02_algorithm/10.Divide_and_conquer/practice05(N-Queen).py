# N-Queen 문제

N = 8
# cnt = 0
visit = [0] * N
cols = [0] * N    # 퀸의 열 값을 저장(여기세 순열을 저장함)

def Possible(k, c):    # k번 퀸의 열 값이 답이 되는 선택인지 조사
    for i in range(k):    # 0 ~ k - 1번 퀸과 대각선에 있는지 조사
        if k - i == abs(c - cols[i]):
            return False
    return True
def nQueen(k):
    if k == N:
        # global cnt
        # cnt += 1
        return 1
    else:
        ret = 0
        for i in range(N):
            if visit[i] or not Possible(k, i): continue
            visit[i] = 1
            cols[k] = i    # k번 퀸의 열 값을 i로 결정
            ret += nQueen(k + 1)
            visit[i] = 0
        return ret
print(nQueen(0))
# print(cnt)