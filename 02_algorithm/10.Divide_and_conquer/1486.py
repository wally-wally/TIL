import sys
sys.stdin = open('input_1486.txt', 'r')

for i in range(int(input())):
    clerk_count, janghoon_tall = map(int, input().split()) # 점원의 수, 장훈이의 키
    clerk_tall = list(map(int, input().split())) # 점원들의 키 list

    clerk_tower_max = 1000000000 # 점원읖 높이 세운 탑의 높이를 임의로 아주 큰 값으로 설정
    for j in range(1 << clerk_count):
        clerk_tall_sum = 0
        for k in range(clerk_count+1):
            if j & (1 << k):
                clerk_tall_sum += clerk_tall[k]
        if clerk_tall_sum >= janghoon_tall:
            if clerk_tower_max >= clerk_tall_sum:
                clerk_tower_max = clerk_tall_sum
    
    print('#{} {}'.format(i+1, clerk_tower_max - janghoon_tall))