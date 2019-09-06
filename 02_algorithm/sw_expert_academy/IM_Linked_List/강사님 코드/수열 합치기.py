import sys

class Node:
    def __init__(self, data, pre, link):     # 이중 연결리스트
        self.data = data
        self.pre = pre
        self.link = link

def addLast(data):              # 마지막노드 추가
    global pHead
    global pTail
    if pHead==None:
        pHead = Node(data, None, None)
        pTail = pHead
    else:
        p = pHead
        while p.link != None:
            p = p.link
        p.link = Node(data, p, None)
        pTail = p.link
    return

def addNumbers():             # 새 수열 추가
    global pHead
    global pTail
    p = pHead
    if p == None:         # 첫번째 수열인 경우
        for i in range(N):
            addLast(s[i])
    else:                           # 두번째 이후인 경우
        while p.link != None and p.data<=s[0]:   # s[0]보다 큰 수 검색
            p = p.link
        if p.data > s[0]:               # s[0]보다 큰 수 앞에 추가
            if p.pre==None:                 # 맨 앞에 추가하는 경우
                p.pre = Node(s[0], None, p)
                pHead = p.pre
                for i in range(1,N):
                    p.pre.link = Node(s[i], p.pre, p)
                    p.pre = p.pre.link
            else :    
                for i in range(N):  
                    p.pre.link = Node(s[i], p.pre, p)
                    p.pre = p.pre.link
                    
        else:                                   # 큰 수가 없어서 마지막에 추가하는 경우
            for i in range(N):
                addLast(s[i])
    return

def get():
    global pTail
    p = pTail
    for i in range(10):
        print(p.data, end =' ')
        p = p.pre
    print()

sys.stdin = open('input.txt', 'r')
T = int(input())

for tc in range(1, T+1):
    N, M =map(int, input().split())
    pHead = None
    pTail = None
    for i in range(M):
        s = list(map(int, input().split()))
        addNumbers()
    print('#{}'.format(tc), end = ' ')
    get()
