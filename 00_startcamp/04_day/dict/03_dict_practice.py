"""
Python dictionary 연습 문제
"""

# 1. 평균을 구하시오.
score = {
    '수학': 80,
    '국어': 90,
    '음악': 100
}

# 아래에 코드를 작성해 주세요.
print('==== Q1 ====')
total_score = 0
for subject_score in score.values():
    total_score += subject_score
avg_score = total_score / len(score)
print(avg_score)


# 2. 반 평균을 구하시오. -> 전체 평균
scores = {
    'a': {
        '수학': 80,
        '국어': 90,
        '음악': 100
    },
    'b': {
        '수학': 80,
        '국어': 90,
        '음악': 100
    }
}

# 아래에 코드를 작성해 주세요.
print('==== Q2 ====')
# 내가 푼 방법
total_score_a = total_score_b = 0
for subject_score_a in scores['a'].values():
    total_score_a += subject_score_a
for subject_score_b in scores['b'].values():
    total_score_b += subject_score_b
avg_score = (total_score_a + total_score_b)/(len(scores['a'])+len(scores['b']))
print(avg_score)

# 강사가 푼 방법(이중 for문 사용)
total_score_Q2 = 0
count = 0
for person_score in scores.values():
    for indivisual_score in person_score.values():
        total_score_Q2 += indivisual_score
        count += 1
avg_score_Q2 = total_score_Q2 / count
print(avg_score_Q2)



# 3. 도시별 최근 3일의 온도입니다.
city = {
    '서울': [-6, -10, 5],
    '대전': [-3, -5, 2],
    '광주': [0, -2, 10],
    '부산': [2, -2, 9],
}

# 3-1. 도시별 최근 3일의 온도 평균은?

# 아래에 코드를 작성해 주세요.
print('==== Q3-1 ====')
"""
출력 예시)
서울 : 값
대전 : 값
광주 : 값
부산 : 값
"""
# 내가 푼 방법
seoul_tem_sum = daejeon_tem_sum = gwangju_tem_sum = busan_tem_sum = 0
for a in city['서울']:
    seoul_tem_sum += a
for b in city['대전']:
    daejeon_tem_sum += b
for c in city['광주']:
    gwangju_tem_sum += c
for d in city['부산']:
    busan_tem_sum += d
avg_score_s = seoul_tem_sum / len(city['서울'])
avg_score_d = daejeon_tem_sum / len(city['대전'])
avg_score_g = gwangju_tem_sum / len(city['광주'])
avg_score_b = busan_tem_sum / len(city['부산'])
print(round(avg_score_s,1))
print(round(avg_score_d,1))
print(round(avg_score_g,1))
print(round(avg_score_b,1))

# 강사가 푼 방법
for name, temp in city.items():
    avg_temp = sum(temp) / len(temp)
    print(f'{name} : {avg_temp:.1f}')


# 3-2. [가장 어려움]도시 중에 최근 3일 중에 가장 추웠던 곳, 가장 더웠던 곳은?

# 아래에 코드를 작성해 주세요.
print('==== Q3-2 ====')

count = 0
for name, temp in city.items():
    # 첫 번째 시행 때
    # name = '서울'
    # temp = [-6, -10, 5]
    # 단 한 번만 실행되는 조건이 필요(기준점 잡는 과정이 꼭 있어야 함)
    if count == 0:
        hot_temp = max(temp)
        cold_temp = min(temp)
        hot_city = name
        cold_city = name
    else:
        #최저 온도<cold_temp이면, cold_temp 에 값을 새로 넣고,
        if min(temp) < cold_temp:
            cold_temp = min(temp)
            cold_city = name
        #최고 온도>hot_temp이면, hot_temp 에 값을 새로 넣는다.
        if max(temp) > hot_temp:
            hot_temp = max(temp)
            hot_city = name
    count += 1
print(f'최고로 더웠던 지역은 {hot_city} {hot_temp}도 였고, 최고로 추웠던 지역은 {cold_city} {cold_temp}도 였다.')



# 3-3. 위에서 서울은 영상 2도였던 적이 있나요?

# 아래에 코드를 작성해 주세요.
print('==== Q3-3 ====')
# 내가 푼 방법
count = 0
for i in range(0,len(city['서울'])):
    if city['서울'][i] == 2:
        print('Yes')
    else:
        count += 1
if count == len(city['서울']):
    print('No')

# 강사가 푼 방법(in은 앞으로 많이 쓰인다!)
if 2 in city['서울']:
    print('네 있어요')
else:
    print('아니오 없어요')