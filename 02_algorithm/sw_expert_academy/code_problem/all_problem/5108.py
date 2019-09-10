import sys
sys.stdin = open('input_5108.txt', 'r')

# 내가 푼 방법
T = int(input())

for a in range(T):
    N, M, L = map(int, input().split())
    numbers = list(map(int, input().split()))
    for _ in range(M):
        idx, num = map(int, input().split())
        numbers.insert(idx, num)
    print('#{} {}'.format(a + 1, numbers[L]))


# 강사님이 푼 방법
# class Node: # 새 노드 생성
#     def __init__(self, data, link):
#         self.data = data
#         self.link = link
#
# def addLast(data): # 마지막 노드 추가
#     global pHead
#     if pHead == None:
#         pHead = Node(data, None)
#     else:
#         p = pHead
#         while p.link != None:
#             p = p.link
#         p.link = Node(data, None)
#     return
#
#
# def add(data, idx): # idx 위치에 새 노드 추가
#     global pHead
#     p = pHead
#     n = 0
#     while n < idx - 1:
#         p = p.plink
#         n += 1
#     t = p.link
#     p.link = Node(data, t)
#     return
#
#
# def get(idx): # idx의 데이터 리턴
#     p = pHead
#     n = 0
#     while n < idx:
#         p = p.link
#         n += 1
#     return p.data
#
# T = int(input())
#
# for tc in range(1, T + 1):
#     N, M, L = map(int, input().split())
#     pHead = None
#     ...