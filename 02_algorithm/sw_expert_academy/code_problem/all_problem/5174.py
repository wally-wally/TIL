import sys
sys.stdin = open('input_5174.txt', 'r')

def preorder(n): # 전위 순회
    global result
    if n != 0:
        result += 1
        preorder(child[n][0])
        preorder(child[n][1])

for tc in range(int(input())):
    E, N = map(int, input().split())
    arr = list(map(int, input().split()))
    child = [[0, 0] for i in range(max(arr) + 1)]

    for i in range(E):
        if child[arr[i * 2]][0] == 0: # 부모 노드 i*2에 자식 노드가 없는 경우
            child[arr[i * 2]][0] = arr[i * 2 + 1]
        else: # 이미 자식이 한 개 있는 경우
            child[arr[i * 2]][1] = arr[i * 2 + 1]
    
    result = 0
    preorder(N)
    print('#{} {}'.format(tc + 1, result))