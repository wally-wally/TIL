import sys
sys.stdin = open('input.txt', 'r')

# 첫 번째 풀이방법
'''
N = int(input())
check_num = ['3', '6', '9']
result = ''

for i in range(1, N+1):
    convert_string = str(i)
    personnel = ''
    for j in convert_string:
        if j in check_num:
            personnel += '-'
        else:
            personnel += j
    if '-' in personnel:
        personnel = '-' * personnel.count('-')
    else:
        personnel = convert_string
    result += personnel + ' '
print(result)
'''

# 두 번째 풀이방법
T = int(input())
for i in range(1, T+1):
    count = 0
    for j in str(i):
        if j in '369':
            count += 1
    if count:
        print('-'*count, end = ' ')
    else:
        print(i, end = ' ')