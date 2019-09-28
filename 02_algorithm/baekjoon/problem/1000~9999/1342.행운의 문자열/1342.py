import sys
sys.stdin = open('input_1342.txt', 'r')

def comb(k):
    if k:
        for idx in range(k - 1):
            if order[idx] == order[idx + 1]:
                return
        else:
            if k == L:
                answer_list.append(''.join(order))
                return
    for i in range(L):
        if not visited[i]:
            visited[i] = True
            order.append(data[i])
            comb(k + 1)
            visited[i] = False
            order.pop()
    

data = input()
L = len(data)
visited = [False] * L
answer_list = []
order = []
comb(0)
print(len(set(answer_list)))