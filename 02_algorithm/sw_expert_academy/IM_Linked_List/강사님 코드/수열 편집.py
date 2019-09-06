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
    while p!=None and n<idx:
        p = p.link
        n += 1
    if p == None:
        return -1
    else:
        return p.data

def delete(idx):                    # idx 위치를 삭제
    p = pHead
    n = 0
    while n<idx-1:
        p = p.link
        n += 1
    p.link = p.link.link
    return

def exchange(data, idx):     # idx위치의 값 변경
    p = pHead
    n = 0
    while n<idx:
        p = p.link
        n += 1
    p.data = data
    return    

sys.stdin = open('input.txt', 'r')
T = int(input())

for tc in range(1, T+1):
    N, M, L = map(int, input().split())
    pHead = None

    s = list(map(int, input().split()))  # 수열 저장
    for i in range(N):
       addLast(s[i])
 
    for i in range(M):
        edit = list(input().split())
        if(edit[0] == 'I'):
            add(edit[2], int(edit[1])) 
        elif(edit[0] == 'D'):
            delete(int(edit[1]));
        elif(edit[0] == 'C'):
            exchange(edit[2], int(edit[1]))
            
    print('#{} {}'.format(tc, get(L)))
