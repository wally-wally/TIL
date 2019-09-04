import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    data = input()
    result = []
    for b in range(1, 11):
        pattern = data[:b]
        check_list = []
        element = ''
        for c in data[b:]:
            element += c
            if len(element) == b:
                check_list.append(element)
                element = ''
        if element:
            check_list.append(element)
        element = ''
        if b in [1, 2, 3, 5, 6, 10]:
            for check in check_list:
                if pattern != check:
                    break
            else:
                result.append(b)
        elif b in [4, 7, 8, 9]:
            for i in range(len(check_list)):
                compare = check_list[i]
                if i == len(check_list) - 1:
                    remain = pattern[:30-b*(i+1)]
                    if compare != remain:
                        break
                elif i != len(check_list) - 1:
                    if pattern != compare:
                        break
            else:
                result.append(b)
    print('#{} {}'.format(a + 1, min(result)))