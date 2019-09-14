import sys
sys.stdin = open('input.txt', 'r')

for T in range(int(input())):
    print('#{} {}'.format(T + 1, ''.join([letter for letter in input() if letter not in ['a', 'e', 'i', 'o', 'u']])))