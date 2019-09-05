import sys
sys.stdin = open('input.txt', 'r')

for a in range(10):
    N = int(input())
    original_secret = list(map(str, input().split()))
    inst_count = int(input())
    instruction = list(map(str, input().split()))
    idx = 0
    cnt = 0
    while True:
        if cnt == inst_count:
            break
        if instruction[idx] == 'I':
            x, y = int(instruction[idx + 1]), int(instruction[idx + 2])
            for s in range(y):
                original_secret.insert(x + s, instruction[idx + 3 + s])
            idx = idx + 3 + s + 1
            cnt += 1
        elif instruction[idx] == 'D':
            x, y = int(instruction[idx + 1]), int(instruction[idx + 2])
            for s in range(y):
                original_secret.pop(x)
            idx = idx + 3
            cnt += 1
        elif instruction[idx] == 'A':
            y = int(instruction[idx + 1])
            for s in range(y):
                original_secret.append(instruction[idx + 2 + s])
            idx = idx + 2 + s + 1
            cnt += 1
    print('#{} {}'.format(a + 1, ' '.join(original_secret[:10])))