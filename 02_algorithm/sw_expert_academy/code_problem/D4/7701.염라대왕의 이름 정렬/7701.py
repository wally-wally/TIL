import sys
sys.stdin = open('input_7701.txt', 'r')

for a in range(int(input())):
    N = int(input())
    names = [input() for i in range(N)]
    alpha_cnt_list = [[] for i in range(51)]
    for name in names:
        if name not in alpha_cnt_list[len(name)]:
            alpha_cnt_list[len(name)].insert(0, name)
    print('#{}'.format(a + 1))
    for cnt in alpha_cnt_list:
        for element in sorted(cnt):
            if not len(cnt):
                break
            else:
                print(element)