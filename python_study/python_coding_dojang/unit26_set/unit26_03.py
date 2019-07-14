# 1. 반복문으로 세트의 요소를 모두 출력하기

print('====#1====')
a = {1, 2, 3, 4}
for i in a:
    print(i)


# 2. 세트 표현식 사용하기
print('\n====#2====')
b = {i for i in 'apple'}
print(b)

# 3. 세트 표현식에 if 조건문 사용하기
print('\n====#3====')
c = {i for i in 'pineapple' if i not in 'apl'}
print(c)
