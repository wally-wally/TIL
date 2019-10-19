import sys
sys.stdin = open('input_2920.txt', 'r')

asc_list = [n for n in range(1, 9)]
desc_list = asc_list[::-1]
input_list = list(map(int, input().split()))
if input_list == asc_list:
    print('ascending')
elif input_list == desc_list:
    print('descending')
else:
    print('mixed')