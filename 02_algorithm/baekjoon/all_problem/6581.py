import sys
sys.stdin = open('input_6581.txt', 'r')

idx = 0
while True:
    try:
        for word in input().split():
            if word == '<br>':
                idx = 0
                print()
            elif word == '<hr>':
                print('\n' + '-' * 80 if idx else '-' * 80)
                idx = 0
            else:
                word_length = len(word)
                if idx + word_length > 80:
                    idx = word_length
                    print()
                    print(word, end='')
                else:
                    idx += word_length
                    print(word, end='')
                if idx + 1 > 80:
                    idx = 0
                    print()
                else:
                    idx += 1
                    print(' ', end='')
    except:
        break                