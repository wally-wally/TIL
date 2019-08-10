import sys
sys.stdin = open('input.txt', 'r')

arr = [[0] * 20 for a in range(20)]

papers = int(input())

for paper in range(papers):
    start_r, start_c, end_r, end_c = list(map(int, input().split()))
    for a in range(end_r):
        for b in range(end_c):
            arr[start_r+a][start_c+b] = paper+1

# 색종이 배치 확인용
for p in range(20): 
    for q in range(20):
        print('{:>2}'.format(arr[p][q]), end=' ')
    print()

for num in range(papers):
    count = 0
    for i in range(20):
        for j in range(20):
            if arr[i][j] == num + 1:
                count += 1
    print(count)