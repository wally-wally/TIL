import sys
sys.stdin = open('input.txt', 'r')

for a in range(10):
    arr = []
    M = int(input())
    for b in range(8):
        arr.append(input())

    palindrome_count = 0
    for c in range(8): # 가로줄 회문 검사
        for d in range(8 - M + 1):
            if arr[c][d : d + M] == arr[c][d : d + M][::-1]:
                palindrome_count += 1

    for d in range(8):
        for e in range(8 - M + 1):
            col_data = ''
            for f in range(e, e + M):
                col_data += arr[f][d]
            if col_data == col_data[::-1]:
                palindrome_count += 1

    print('#{} {}'.format(a + 1, palindrome_count))