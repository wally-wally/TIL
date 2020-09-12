# 1 heap 자료 구조로 해결한 방법
import heapq as hq

def solution(operations):
    heap = []
    for operation in operations:
        oper, number = operation.split()
        if oper == 'I':
            hq.heappush(heap, int(number))
        elif oper == 'D' and len(heap):
            if number == '-1':
                hq.heappop(heap)
            else:
                heap.pop()
    return [0, 0] if not len(heap) else [max(heap), min(heap)]

# 2 일반 리스트로 해결한 방법
# def solution(operations):
#     numbers = []
#     for operation in operations:
#         oper, number = operation.split()
#         if oper == 'I':
#             numbers.append(int(number))
#         elif oper == 'D' and len(numbers):
#             if number == '-1':
#                 numbers.pop(numbers.index(min(numbers)))
#             else:
#                 numbers.pop(numbers.index(max(numbers)))
#     return [0, 0] if not len(numbers) else [max(numbers), min(numbers)]
    
print(solution(['I 16', 'D 1']))
print(solution(['I 7', 'I 5', 'I -5', 'D -1']))