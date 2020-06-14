x = {'a': 10, 
     'b': 20,
     'c': 30,
     'd': 40
    }

# 1. 딕셔너리의 키와 값 모두 출력하기
print('====#1====')
for key, value in x.items():
    print(key, value)


# 2. 딕셔너리의 키만 출력하기
print('====#2====')
for key in x.keys():
    print(key, end=' ')


# 3. 딕셔너리의 값만 출력하기
print('\n====#3====')
for value in x.values():
    print(value, end=' ')