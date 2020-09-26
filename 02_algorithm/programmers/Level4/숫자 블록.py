import math

def solution(begin, end):
    answer = []
    
    if begin == 1:
        answer.append(0)
        begin += 1
        
    for block_idx in range(begin, end + 1):
        for i in range(2, int(math.sqrt(block_idx)) + 1):
            mok = block_idx // i
            if mok > 10000000:
                continue
            if block_idx % i == 0:
                answer.append(mok)
                break
        else:
            answer.append(1)
            
    return answer


print(solution(1, 10))