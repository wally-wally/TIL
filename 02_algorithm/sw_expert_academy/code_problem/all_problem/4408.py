import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    arr = [0 for _ in range(200)]
    for b in range(int(input())):
        now, goal = map(int, input().split())
        '''
        re_now = (now - 1) // 2
        re_goal = (goal - 1) // 2
        min_num, max_num = min(re_now, re_goal), max(re_now, re_goal)
        '''
        min_num, max_num = min((now - 1) // 2, (goal - 1) // 2), max((now - 1) // 2, (goal - 1) // 2) # 위 DOCString 부분을 한 줄로 작성
        for c in range(min_num, max_num + 1):
            arr[c] += 1
    print('#{} {}'.format(a + 1, max(arr)))