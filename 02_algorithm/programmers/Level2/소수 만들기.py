def solution(nums):
    answer = 0
    
    def check_prime_number(num):
        div_number = 2
        while div_number < num // 2:
            if num % div_number == 0:
                return False
            div_number += 1
        return True

    number_count = len(nums)
    for i in range(number_count):
        for j in range(i + 1, number_count):
            for k in range(j + 1, number_count):
                if check_prime_number(nums[i] + nums[j] + nums[k]):
                    answer += 1
    return answer


print(solution([1, 2, 3, 4])) # 1
print(solution([1, 2, 7, 6, 4])) # 4