import sys
sys.stdin = open('input_1256.txt', 'r')

for test_case in range(int(input())):
    alphabet = [[] for _ in range(26)]
    K = int(input())
    string_data = input()
    for i in range(len(string_data)):
        sub_data = string_data[i:]
        if sub_data not in alphabet[ord(sub_data[0]) - 97]:
            alphabet[ord(sub_data[0]) - 97].append(sub_data)
    print(alphabet)
    order = 0
    for alpha in alphabet:
        order += len(alpha)
        if order >= K:
            print('#{} {}'.format(test_case + 1, sorted(alpha, reverse=True)[order - K]))
            break
    else:
        print('#{} none'.format(test_case + 1))