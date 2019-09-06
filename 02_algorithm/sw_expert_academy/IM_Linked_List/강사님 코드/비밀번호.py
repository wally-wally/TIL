import sys

class Node:
    def __init__(self, data, pre, link):     # 이중 연결리스트
        self.data = data
        self.pre = pre
        self.link = link

def addLast(data):              # 순환 이중 연결리스트 생성
    global pHead
    if pHead==None:
        pHead = Node(data, None, None)
        pHead.pre = pHead
        pHead.link = pHead
    else:
        p = pHead.pre                           # 맨 뒤의 노드를 찾고
        p.link = Node(data, p, pHead)       # 그뒤에 새 노드를 추가
        pHead.pre = p.link                          # 맨 앞노드의 이전 노드를 새 노드로 변경
    return

def addNumbers():             # M번째 칸 추가
    global pHead
 
    p = pHead
    for j in range(K):
        for i in range(M):
            p = p.link
        p.pre.link = Node(p.pre.data+p.data, p.pre, p) # p와 p.pre 사이에 새 노드 추가
        p.pre = p.pre.link                                  # p의 앞 노드를 p.pre로 저장
        p = p.pre                                             # 새 노드를 p로 지정
    return

def get():
    global pHead
    p = pHead.pre                               # 마지막 노드
    for i in range(10):
        print(p.data, end =' ')
        p = p.pre                       
        if p == pHead.pre:                      # 10개 미만인 경우 맨 앞 노드에서 중단
            break
    print()


sys.stdin = open('input.txt', 'r')
T = int(input())

for tc in range(1, T+1):
    N, M, K =map(int, input().split())  
    pHead = None
    s = list(map(int, input().split()))
    for i in range(N):
        addLast(s[i])                               # N개의 숫자를 리스트에 저장
    addNumbers()                                # 비밀번호 생성
    print('#{}'.format(tc), end = ' ')
    get()
