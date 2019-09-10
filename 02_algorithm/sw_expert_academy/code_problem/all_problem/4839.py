import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    game_data = list(map(int, input().split()))
    a_start_page = b_start_page = 1
    a_end_page = game_data[0]
    b_end_page = game_data[0]
    a_page = game_data[1]
    b_page = game_data[2]
    result = ''

    while True:
        a_center_page = int((a_start_page + a_end_page) / 2)
        b_center_page = int((b_start_page + b_end_page) / 2)

        # A 이진 탐색
        if a_center_page < a_page:
            a_start_page = a_center_page
        elif a_center_page > a_page:
            a_end_page = a_center_page

        # B 이진 탐색
        if b_center_page < b_page:
            b_start_page = b_center_page
        elif b_center_page > b_page:
            b_end_page = b_center_page

        if a_center_page == a_page and b_center_page == b_page:
            result = 0
            break
        elif a_center_page == a_page:
            result = 'A'
            break
        elif b_center_page == b_page:
            result = 'B'
            break

    print('#{} {}'.format(i+1, result))

