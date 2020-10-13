def solution(money):
    money_length = len(money)
    DP = [0 for _ in range(money_length - 1)] # 첫 번째 집부터 턴 경우
    DP2 = [0 for _ in range(money_length)] # 두 번째 집부터 턴 경우

    # 초기화 과정
    DP[0] = money[0]
    DP[1] = money[0]
    DP2[0] = 0
    DP2[1] = money[1]

    for i in range(2, money_length - 1):
        DP[i] = max(DP[i - 2] + money[i], DP[i - 1])

    for i in range(2, money_length):
        DP2[i] = max(DP2[i - 2] + money[i], DP2[i - 1])

    return max(DP[money_length - 2], DP2[money_length - 1])


print(solution([1, 2, 3, 1])) # 4