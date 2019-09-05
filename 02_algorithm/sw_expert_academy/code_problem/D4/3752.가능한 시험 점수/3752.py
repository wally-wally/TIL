import sys
sys.stdin = open('input.txt', 'r')

for a in range(int(input())):
    N = int(input())
    numbers = list(map(int, input().split()))
    case_set = set()
    case_set.add(numbers[0])
 
    for i in range(1, N):
        for j in list(case_set):
            case_set.add(numbers[i] + j)
        case_set.add(numbers[i])
 
    print('#{} {}'.format(a + 1, len(case_set) + 1)) # 0점도 있으므로 +1을 추가함