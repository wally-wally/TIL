import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    t = input()
    n = len(t)
    result = ''
    for i in range(n//2):
        if t[i] != t[n - i - 1]:
            if t[i] != '*' and t[n - i - 1] != '*':
                result = 'Not exist'
                break
            elif t[i] == '*' or t[n - i - 1] == '*':
                result = 'Exist'
                break
    if result == '':
        result = 'Exist'

    print('#{} {}'.format(a + 1, result))
'''
for a in range(T):
    t = input()
    n = len(t)
    result = ''
    if '*' not in t:
        if t == t[::-1]:
            result = 'Exist'
        else:
            result = 'Not exist'
    else:
        for i in range(n // 2):
            if t[i] != t[n - i - 1]:
                if t[i] != '*' and t[n - i - 1] != '*':
                    break
        else:
            result = 'Exist'
        if not result:
            mark_count = t.count('*')
            mark_idx = []
            for b in range(mark_count):  # '*' 있는 위치 찾기
                if not len(mark_idx):
                    mark_idx.append(t.find('*'))
                else:
                    mark_idx.append(t.find('*', mark_idx[b - 1] + 1))
            print(mark_idx)

            mark_count = len(mark_idx)
            mark_subset = []

            for subset in range(1 << mark_count):
                element = []
                for i in range(mark_count + 1):
                    if subset & (1 << i):
                        element.append(mark_idx[i])
                mark_subset.append(element)
            mark_subset.pop(0)

            t_list = list(t)

            for position in mark_subset:
                for elem in position:
                    t_list[elem] = ''
                re_t = ''.join(t_list)
                re_n = len(re_t)
                for k in range(re_n//2):
                    if re_t[k] != re_t[re_n - k - 1]:
                        if re_t[k] != '*' and re_t[re_n - k - 1] != '*':
                            break
                else:
                    result = 'Exist'
                if result == 'Exist':
                    break
            if not result:
                result = 'Not exist'

    print('#{} {}'.format(a + 1, result))
'''