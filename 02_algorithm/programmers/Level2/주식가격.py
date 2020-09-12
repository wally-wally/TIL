def solution(prices):
    answer = []
    price_count = len(prices)
    for i in range(price_count):
        for j in range(i, price_count):
            if prices[i] > prices[j]:
                answer.append(j - i)
                break
        else:
            answer.append(j - i)
    return answer

print(solution([1, 2, 3, 2, 3]))