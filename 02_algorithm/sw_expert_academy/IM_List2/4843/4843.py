import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    num_count = int(input())
    num_list = sorted(list(map(int, input().split())))
    front_list = [num_list[a] for a in range(num_count//2)]
    back_list = [num_list[b] for b in range((num_count//2), num_count)]

    print('#{} '.format(i+1), end = '')
    ten_judge = 0 # 5가 되면 총 10개의 숫자를 출력한 것과 같은 의미임
    for j in range(1, num_count//2 + 1):
        ten_judge += 1
        print(back_list[num_count//2-j], end = ' ')
        print(front_list[j-1], end = ' ')
        if ten_judge == 5:
            break
    print()