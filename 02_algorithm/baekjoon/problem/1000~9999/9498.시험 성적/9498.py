import sys
sys.stdin = open('input_9498.txt', 'r')

score = int(input())
grade = {90: 'A', 80: 'B', 70: 'C', 60: 'D'}
for key, value in grade.items():
    if score >= key:
        print(value)
        break
else:
    print('F')