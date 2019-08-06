import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    N = int(input())
    color = []
    for j in range(N):
        color_info = list(map(int, input().split()))
        color.append(color_info)

    arr = [[0] * 10 for a in range(10)]
    data_count = len(color)
    purple_count = 0
    for a in range(data_count):
        for b in range(color[a][1], color[a][3]+1):
            for c in range(color[a][0], color[a][2]+1):
                if arr[b][c] != color[a][4]:
                    arr[b][c] += color[a][4]
                if arr[b][c] == 3:
                    purple_count += 1


    # 색칠 확인용
    for p in range(10):  # 9X9 배열을 보기좋게 작성함
        for q in range(10):
            print('{:>2}'.format(arr[p][q]), end=' ')
        print()

    # 보라색 개수 확인
    print('#{} {}'.format(i+1, purple_count))