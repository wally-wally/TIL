import sys
sys.stdin = open('input.txt', 'r')

test_case = 0 # 테스트 케이스 변수가 input.txt 파일에 특별히 지정되어 있지 않으므로 따로 변수를 선언해주고
while True:
    try:
        test_case += 1 # 반복문이 한 번씩 돌 때마다 test_case 변수를 1씩 증가시켜준다.
        moving_count = int(input())
        boxes = list(map(int, input().split()))

        n = len(boxes) # 상자가 쌓여 있는 상자 더미들의 개수(즉, 제약 사항에서 가로의 길이를 의미)

        for j in range(moving_count):
            max_idx = boxes.index(max(boxes))
            boxes[max_idx] -= 1
            min_idx = boxes.index(min(boxes))
            boxes[min_idx] += 1

        max_val = max(boxes[0], boxes[1])
        min_val = min(boxes[0], boxes[1])
        for k in range(2, n):
            max_val = max(boxes[k], max_val)
            min_val = min(boxes[k], min_val)
        print('#{} {}'.format(test_case, max_val - min_val))
    except EOFError:
        break