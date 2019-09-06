import sys

class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addLast(data):              # 마지막노드 추가
    global pHead
    if pHead==None:
        pHead = Node(data, None)
    else:
        p = pHead
        while p.link != None:
            p = p.link
        p.link = Node(data, None)
    return

def add(data, idx):             # idx 위치에 새 노드 추가
    global pHead
    p = pHead
    n = 0
    while n<idx-1:
        p = p.link
        n += 1
    t = p.link
    p.link = Node(data, t)    
    return

def get(idx):                       # idx의 데이터 리턴
    p = pHead
    n = 0
    while n<idx:
        p = p.link
        n += 1
    return p.data

sys.stdin = open('input.txt', 'r')
T = int(input())

for tc in range(1, T+1):
    N, M, L = map(int, input().split())
    pHead = None

    s = list(map(int, input().split()))   # 미완성 수열 저장
    for i in range(N):
       addLast(s[i])
 
    for i in range(M):                                  # M개의 숫자 추가
        idx, data = map(int, input().split()) 
        add(data, idx)
        
    print('#{} {}'.format(tc, get(L)))
