def solution(seoul):
    for i in range(len(seoul)):
        if seoul[i] == 'Kim':
            return '김서방은 {}에 있다'.format(i)

print(solution(["Queen", "Tod", "Kim"]))