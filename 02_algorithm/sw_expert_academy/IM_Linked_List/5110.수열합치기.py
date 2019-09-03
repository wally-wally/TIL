import sys
sys.stdin = open('input_5110.txt', 'r')

class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link

def addtoFirst(data):
    global Head
    Head = Node(data, Head)


def add(pre, data):
    pre.link = Node(data, pre.link)


def addtoLast(data):
    global Head
    if Head == None:
        Head = Node(data, None)
    else:
        p = Head
        while p.link != None:
            p = p.link
        p.link = Node(data, None)

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    arr = list(map(int, input().split()))
    Head = None
    for i in range(len(arr)):
        addtoLast(arr[i])
    add_arr = [list(map(int, input().split())) for _ in range(M - 1)]
    length = 0
    for add_list in add_arr:
        node = Head
        length += len(add_list)
        for j in range(length):
            if node.data > add_list[0]:
                if j == 0:
                    for i in range(len(add_list) - 1, -1, -1):
                        addtoFirst(add_list[i])
                    break
                elif j == 1:
                    for i in range(len(add_list) - 1, -1, -1):
                        add(Head, add_list[i])
                    break
                else:
                    for i in range(len(add_list) - 1, -1, -1):
                        add(prev_node, add_list[i])
                    break
            if not j:
                node = Head.link
            else:
                node = node.link
                if j > 1:
                    prev_node = prev_node.link
                else:
                    prev_node = Head.link
        else:
            for i in range(len(add_list) - 1, -1, -1):
                add(prev_node, add_list[i])

    result = []
    count = 0
    while Head.link != None:
        count += 1
        if (length + N) - count <= 9:
            result.insert(0, str(Head.data))
        Head = Head.link
    result.insert(0, str(Head.data))
    print('#{} {}'.format(a + 1, ' '.join(result)))


# 순차 리스트로 구현(제한시간 초과...)
# for a in range(int(input())):
#     N, M = map(int, input().split())
#     arr = list(map(int, input().split()))
#     add_list = [list(map(int, input().split())) for _ in range(M - 1)]
#     for add_arr in add_list:
#         for i in range(len(arr)):
#             if type(arr[i]) == int:
#                 if arr[i] > add_arr[0]:
#                     arr.append(add_arr)
#                     break
#             elif type(arr[i]) == list:
#                 for j in
#         else:
#             for element in add_arr:
#                 arr.append(element)
#     print('#{} {}'.format(a + 1, ' '.join([str(arr[k]) for k in range(len(arr) - 1, len(arr) - 11, -1)])))



# Pythontutor 테스트 코드(1)
# class Node:
#     def __init__(self, data, link):
#         self.data = data
#         self.link = link
#
# def addtoFirst(data):
#     global Head
#     Head = Node(data, Head)
#
#
# def add(pre, data):
#     if pre == None:
#         print('error')
#     else:
#         pre.link = Node(data, pre.link)
#
#
# def addtoLast(data): # 마지막에 데이터 삽입
#     global Head
#     if Head == None: # 빈 리스트이면
#         Head = Node(data, None)
#     else:
#         p = Head
#         while p.link != None: # 마지막 노드 찾을 때까지
#             p = p.link
#         p.link = Node(data, None)
#
# T = 1
#
# for a in range(T):
#     N, M = 4, 1
#     arr = [2, 3, 4, 5]
#     Head = None
#     for i in range(len(arr)):
#         addtoLast(arr[i])
#     add_arr = [[4, 8, 7, 6], [9, 10, 15, 16], [1, 2, 6, 5]]
#     length = 0
#     for add_list in add_arr:
#         node = Head
#         length += len(add_list)
#         for j in range(length):
#             if node.data > add_list[0]:
#                 if j == 0:
#                     for i in range(len(add_list) - 1, -1, -1):
#                         addtoFirst(add_list[i])
#                     break
#                 else:
#                     for i in range(len(add_list) - 1, -1, -1):
#                         add(prev_node, add_list[i])
#                     break
#             if not j:
#                 node = Head.link
#             else:
#                 node = node.link
#                 if j > 1:
#                     prev_node = prev_node.link
#                 else:
#                     prev_node = Head.link
#         else:
#             for i in range(len(add_list) - 1, -1, -1):
#                 add(prev_node, add_list[i])