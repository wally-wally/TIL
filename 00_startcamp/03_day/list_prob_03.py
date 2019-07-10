'''
문제 3.
숫자를 입력 받아 짝수/홀수를 구분하는 코드를 작성하시오.
'''

number = int(input('숫자를 입력하세요: '))

# 아래에 코드를 작성해 주세요.
odd=[]
even=[]
for i in range(1,number+1):
    if i % 2 == 0:
        even.append(i)
    else:
        odd.append(i)

print('홀수' + odd)
print('짝수' + even)