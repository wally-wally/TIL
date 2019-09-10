import sys
sys.stdin = open('sample_input.txt', 'r')
import itertools

T = int(input())

for a in range(T):
    t = input()
    n = len(t)
    result = ''
    for i in range(n//2):
        if t[i] != t[n - i - 1]:
            if t[i] != '?' and t[n - i - 1] != '?':
                result = 'Not exist'
                break
    if not result:
        result = 'Exist'

    print('#{} {}'.format(a + 1, result))


# T = int(input())
#
# alpha = 'abcdefghijklmnopqrstuvwxyz'
#
# for a in range(T):
#
#     t = input()
#     result = ''
#     if '?' not in t: # 문자열 t에 ? 마크가 없는 경우
#         if t == t[::-1]:
#             result = 'Exist'
#         else:
#             result = 'Not exist'
#     else: # 문자열 t에 ? 마크가 있는 경우
#         if t == t[::-1]:
#             result = 'Exist'
#         else:
#             mark_count = t.count('?')
#             mark_idx = []
#             for i in range(mark_count): # '?" 있는 위치 찾기
#                 if not len(mark_idx):
#                     mark_idx.append(t.find('?'))
#                 else:
#                     mark_idx.append(t.find('?', mark_idx[i-1]+1))
#             wild_list = list(itertools.product(alpha, repeat=mark_count)) # a ~ z로 ? 개수만큼 중복순열 생성
#             t_list = [element for element in t] # 문자열 t를 리스트로 변환(와일드 카드를 중복순열의 알파벳으로 대체하기 위해)
#             for wild in wild_list:
#                 t_re = ''
#                 for j in range(mark_count):
#                     t_list[mark_idx[j]] = wild[j]
#                 t_re = ''.join(t_list) # 리스트화된 문자열을 문자열 상태로 되돌리기
#                 if t_re == t_re[::-1]:
#                     result = 'Exist'
#             if not result:
#                 result = 'Not exist'
#
#     print('#{} {}'.format(a + 1, result))