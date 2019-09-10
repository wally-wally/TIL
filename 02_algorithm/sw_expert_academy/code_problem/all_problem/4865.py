import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    pattern = input()
    text = input()
    alphabet = ''
    for p in pattern:
        if p not in alphabet:
            alphabet += p
    count_alpha = len(alphabet)

    max_value = 0
    for alpha in alphabet:
        count = 0
        for t in text:
            if alpha == t:
                count += 1
        if max_value <= count:
            max_value = count
    print('#{} {}'.format(a + 1, max_value))