import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    words = input()
    dash_count = int(input())
    front_dash = ''
    word_list = [word for word in words]
    dash_position = list(map(int, input().split()))
    for position in dash_position:
        if not position:
            front_dash += '-'
        else:
            word_list[position-1] += '-'
    print('#{} {}'.format(a + 1, front_dash + ''.join(word_list)))
    