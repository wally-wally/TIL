import sys
sys.stdin = open('input.txt', 'r')

# 내가 푼 방법

for test_case_No in range(10):
    test_case_No += 1
    moving_count = int(input())
    boxes = list(map(int, input().split()))

    for j in range(moving_count):
        max_idx = boxes.index(max(boxes))
        boxes[max_idx] -= 1
        min_idx = boxes.index(min(boxes))
        boxes[min_idx] += 1

    max_val = max(boxes[0], boxes[1])
    min_val = min(boxes[0], boxes[1])
    for k in range(2, 100):
        max_val = max(boxes[k], max_val)
        min_val = min(boxes[k], min_val)
    print('#{} {}'.format(test_case_No, max_val - min_val))


# 강사가 푼 방법

for test_case in range(1, 11):
    dump = int(input())
    arr = list(map(int, input().split()))

    cnt = [0] * 101 # 빈도수 저장하는 List
    for val in arr:
        cnt[val] += 1

    minIdx, maxIdx = 0, 100
    i = 0
    while i < dump:
        while cnt[minIdx] == 0:
            minIdx += 1
        while cnt[maxIdx] == 0:
             maxIdx -= 1
        
        cnt[minIdx] -= 1
        cnt[minIdx + 1] += 1
        cnt[maxIdx] -= 1
        cnt[maxIdx - 1] += 1
        i += 1

    if cnt[minIdx] == 0: minIdx += 1
    if cnt[maxIdx] == 0: maxIdx -= 1
    
    print('#%d %d' % (test_case, maxIdx-minIdx))