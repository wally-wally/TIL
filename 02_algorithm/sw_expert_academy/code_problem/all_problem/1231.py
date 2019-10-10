import sys
sys.stdin = open('input_1231.txt', 'r')

def inorder(n): # 중위 순회
    if n != 0:
        inorder(child[n][0])
        print(letter[n], end='')
        inorder(child[n][1])

for tc in range(10):
    V = int(input()) # 간선의 수
    child = [[0, 0] for i in range(V + 1)]
    letter = [0]
    for idx in range(V):
        data = list(map(str, input().split()))
        letter.append(data[1])
        if len(data) == 4:
            child[idx + 1] = [int(data[2]), int(data[3])]
        elif len(data) == 3:
            child[idx + 1] = [int(data[2]), 0]
            
    print('#{} '.format(tc + 1), end='')
    inorder(1)
    print()