import sys
sys.stdin = open('input_10845.txt', 'r')

# [참고] 입력 값 받을 때 input() 보다 sys.stdin.readline()을 사용하는 것이 코드 실행시간 단축하는데 도움이 된다!

queue = []
for _ in range(int(sys.stdin.readline())):
    command = sys.stdin.readline().split()
    if command[0] == 'push':
        queue.append(command[1])
    elif command[0] == 'pop':
        print(queue.pop(0) if len(queue) else -1)
    elif command[0] == 'size':
        print(len(queue))
    elif command[0] == 'empty':
        print(1 - int(bool(queue)))
    elif command[0] == 'front':
        print(queue[0] if len(queue) else -1)
    else:
        print(queue[-1] if len(queue) else -1)