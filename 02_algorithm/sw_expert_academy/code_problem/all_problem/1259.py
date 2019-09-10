import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    # '수나사 - 암나사' 한 세트로 분류하기
    stick_count = int(input())
    screw_size_list = list(map(int, input().split()))
    arr = []  # 두 개씩 짝지어 [수나사, 암나사] 꼴이 나타나도록 나사 분류
    for i in range(0, stick_count * 2, 2):
        element = []
        for j in range(i, i + 2):
            element.append(screw_size_list[j])
        arr.append(element)

    # 규칙에 맞게 나사 배열
    screw_arrange = []
    remainder_list = []
    screw_arrange.append(arr[0])
    while True:
        # 처음에는 arr 리스트의 0번째 요소를 넣고 시작했으므로 for문 돌릴 때 1번 인덱스 요소부터 시작한다.
        # 그 다음부터는 0번부터 for문을 돌린다.
        if len(screw_arrange) == 1:
            start = 1
        else:
            start = 0
        for k in range(start, len(arr)):
            n = len(screw_arrange)
            for m in range(n):
                if arr[k][0] == screw_arrange[m][1]: # ex) (5, 2) - (2, 3) 와 같이 '2'가 서로 같을 때(뒷에꺼 비교)
                    screw_arrange.insert(m + 1, arr[k])
                    break
                elif arr[k][1] == screw_arrange[m][0]: # ex) (4, 5) - (5, 2) - (2, 3) 와 같이 '5'가 서로 같을 때(앞에꺼 비교)
                    screw_arrange.insert(m, arr[k])
                    break
            else: # 조건에 맞는 경우가 없는 경우 remainder_list에 넣고 이따가 이 리스트를 가지고 다시 for문을 돌려 규칙에 맞는 위치를 찾는다.
                remainder_list.append(arr[k])
        if remainder_list == []: # remainder_list(나머지들 리스트)가 비어 있으면 즉, 모든 나사를 규칙에 맞게 배열 했으면
            break # while문을 탈출한다.
        arr = remainder_list # remainder_list를 arr 기준 배열로 지정하고 다시 for문을 돌린다.
        remainder_list = [] # remainder_list는 다시 빈 리스트로 초기화 한다.

    # 문제에서 요구한대로 결과값 출력
    result = ''
    for p in range(stick_count):
        for q in range(2):
            result += str(screw_arrange[p][q]) + ' '
    print('#{} {}'.format(a + 1, result))