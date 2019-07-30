import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
for i in range(T):
    NM = list(map(int, input().split()))
    N = NM[0] # 헷갈릴까봐 따로 변수 선언
    M = NM[1] # 헷갈릴까봐 따로 변수 선언
    numbers = list(map(int, input().split()))
    check_list = []

    # 앞에서 부터 지정된 M개 만큼 더한 합을 check_list 리스트에 삽입
    for j in range(N-M+1):
        sum = 0
        for k in range(j, j+M):
            sum += numbers[k]
        check_list.append(sum)

    length = len(check_list) # check_list 리스트의 길이

    # 버블 정렬로 check_list 오름차순 정렬
    # 정렬 후 맨 앞은 가장 작은 수, 맨 뒤는 가장 큰 수 이므로 찾기가 쉽다.
    for k in range(length-1, 0, -1):
        for m in range(k):
            if check_list[m] > check_list[m+1]:
                check_list[m], check_list[m+1] = check_list[m+1], check_list[m]

    # check_list의 맨 뒤 요소에서 맨 앞의 요소를 빼주면 된다.
    print('#{} {}'.format(i+1, check_list[length-1]-check_list[0]))