# 선택 정렬 함수를 재귀적 알고리즘으로 작성하기

arr = [9, 2, 3, 7, 5, 6, 8, 1, 4, 10]

def getMin(s, e):  # 최소값 구하기
    if s == e:   # 기저 사례
        return arr[s]
    else:
        ret = getMin(s, e - 1)  # 매개변수 => 문제의 크기, 반환값 => 문제의 해
        return min(ret, arr[e])

print(getMin(0, len(arr) - 1))

# 분할 정복 도입
# arr = [9, 2, 3, 7, 5, 6, 8, 1, 4, 10]

# def getMin(s, e):  # 최소값 구하기
#     if s == e: 
#         return arr[s]
#     else:
#         mid == (s + e) // 2
#         l = getMin(s, mid)
#         r = getMin(mid + 1, e)
#         return min(l, r)

# print(getMin(0, len(arr) - 1))