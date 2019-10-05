import sys # 코드 올릴 때 이 줄은 빼고 올리자
sys.stdin = open('input.txt', 'r') # 코드 올릴 때 이 줄은 빼고 올리자

for k in range(10):
    N = int(input())
    arr = list(map(int, input().split())) # split 내부에 ' ' 이런식으로 쓰지 말자
    view_apt_count = 0

    for i in range(N):
        if arr[i] == 0:
            pass
        else:
            for j in range(arr[i]):
                if arr[i] > arr[i-1] and arr[i] > arr[i+1]:
                    if arr[i] > arr[i-2] and arr[i] > arr[i+2]:
                        view_apt_count += 1
                        arr[i] -= 1
                else:
                    break
    print('#{} {}'.format(k+1, view_apt_count))