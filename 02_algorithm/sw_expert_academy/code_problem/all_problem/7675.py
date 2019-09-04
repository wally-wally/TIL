import sys
sys.stdin = open('s_input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    arr = []
    sentence = ''
    data = input()
    for i in data:
        sentence += i
        if i in '.?!':
            arr.append(sentence)
            sentence = ''
    # print(arr)

    result_list = []

    for j in range(N):
        name_count = 0
        data = list(map(str, arr[j].split()))
        print(data)
        for word in data:
            if len(word) == 1 and word.isupper(): # 테스트 케이스만 보지말고 문제에 제시된 대문자 한글자인 경우도 고려하자!
                name_count += 1
            if word.istitle():
                if word[1:].islower() and word[1:].isalpha():
                    name_count += 1
                elif word[-1] in '.' and word[:-1].isalpha():
                    name_count += 1
                elif word[-1] in '?!':
                    if word[1:len(word)-1].islower() and word[:len(word)-1].isalpha():
                        name_count += 1
        result_list.append(str(name_count))
    # print(result_list)
    print('#{} {}'.format(a + 1, ' '.join(result_list)))