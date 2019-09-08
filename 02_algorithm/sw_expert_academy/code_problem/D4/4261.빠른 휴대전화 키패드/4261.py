import sys
sys.stdin = open('input.txt', 'r')

key_pad = {
    '2' : ['a', 'b', 'c'],
    '3' : ['d', 'e', 'f'],
    '4' : ['g', 'h', 'i'],
    '5' : ['j', 'k', 'l'],
    '6' : ['m', 'n', 'o'],
    '7' : ['p', 'q', 'r', 's'],
    '8' : ['t', 'u', 'v'],
    '9' : ['w', 'x', 'y', 'z']
}

for a in range(int(input())):
    S, N = map(str, input().split())
    words = list(map(str, input().split()))
    correct_cnt = 0
    for word in words:
        shorted_keynum = ''
        for letter in word:
            for number, alpha in key_pad.items():
                if letter in alpha:
                    shorted_keynum += number
                    break
        if shorted_keynum == S:
            correct_cnt += 1
    print('#{} {}'.format(a + 1, correct_cnt))