def solution(arr):
    answer = [0, 0]
    def check_compression(r, c, length, criteria_num):
        if length == 1:
            answer[criteria_num] += 1
            return
        compress = True
        for x in range(r, r + length):
            if not compress:
                break
            for y in range(c, c + length):
                if criteria_num != arr[x][y]:
                    compress = False
                    break
        if compress:
            answer[criteria_num] += 1
            return
        half_length = length // 2
        check_compression(r, c, half_length, arr[r][c])
        check_compression(r, c + half_length, half_length, arr[r][c + half_length])
        check_compression(r + half_length, c, half_length, arr[r + half_length][c])
        check_compression(r + half_length, c + half_length, half_length, arr[r + half_length][c + half_length])

    check_compression(0, 0, len(arr), arr[0][0])

    return answer

print(solution([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1]
]))