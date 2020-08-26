def solution(s):
    for i in range(len(s), 0, -1):
        for j in range(len(s) - i + 1):
            if s[j : j + i] == s[j : j + i][::-1]:
                return i
    return 1

print(solution('abcdcba'))
print(solution('abacde'))