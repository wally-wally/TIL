import sys
sys.stdin = open('input_1065.txt', 'r')

num = int(input())
result = 99
if num <= 99: # 1부터 99까지는 모두 한수
    print(num)
else:
    for n in range(100, num + 1) :    
        nums = list(map(int, str(n))) # 숫자를 자릿수대로 분리 
        if nums[0] - nums[1] == nums[1] - nums[2] : #등차수열 확인
            result += 1
    print(result)