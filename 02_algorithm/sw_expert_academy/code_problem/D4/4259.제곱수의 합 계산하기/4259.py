import sys
sys.stdin = open('input.txt', 'r')

for a in range(int(input())):
    n = int(input())
    S_list = list(map(str, input().split()))
    result = 0
    for S in S_list:
        result += (int(S[0:len(S)-1]) ** int(S[-1]))
    print('#{} {}'.format(a + 1, result))