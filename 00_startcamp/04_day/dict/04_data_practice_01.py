ssafy = {
    'location': ['서울', '대전', '구미', '광주'],
    'language': {
        'python': {
            'python standard library': ['os', 'random', 'webbrowser'],
            'frameworks': {
                'flask': 'micro',
                'django': 'full-functioning'
            },
            'data_science': ['numpy', 'pandas', 'scipy', 'sklearn'],
            'scraping': ['requests', 'bs4'],
        },
        'web' : ['HTML', 'CSS']
    },
    'classes': {
        'dj': {
            'lecturer': 'harry',
            'manager': '노구하',
            'class president': '박나율',
            'groups': {
                'A': ['이길현', '우동균', '이승현', '이가경', '이병재'],
                'B': ['차진권', '박성진', '심규현', '남승현'],
                'C': ['신승호', '조현호', '이병주', '박홍은'],
                'D': ['조규홍', '조수지', '임소희', '이해인'],
                'E': ['박상원', '고병권', '김준호', '신정우', '박나율']
            }
        },
        'gj': {
            'lecturer': 'change',
            'manager': 'pro-gj'
        }
    }
}


"""
난이도* 1. 지역(location)은 몇 개 있나요?
출력예시)
4
"""
print('==== Q1 ====')
print(len(ssafy.get('location')))


"""
난이도** 2. python standard library에 'requests'가 있나요?
출력예시)
False
"""
print('\n==== Q2 ====')
# 내가 푼 방법
if 'requests' in ssafy.get('language').get('python').get('python standard library'):
    print('True')
else:
    print('False')

# 강사가 푼 방법
print('requests' in ssafy['language']['python']['python standard library'])


"""
난이도** 3. dj 반의 반장의 이름을 출력하세요.
출력예시)
박나율
"""
print('\n==== Q3 ====')
print(ssafy.get('classes').get('dj').get('class president'))


"""
난이도*** 4. ssafy에서 배우는 언어들을 출력하세요.
출력 예시)
python
web
"""
print('\n==== Q4 ====')
for lang in ssafy.get('language').keys():
    print(lang)


"""
난이도*** 5 ssafy gj반의 강사와 매니저의 이름을 출력하세요.
출력 예시)
change
pro-gj
"""
print('\n==== Q5 ====')
for value in ssafy.get('classes').get('gj').values():
    print(value)


"""
난이도***** 6. framework 들의 이름과 설명을 다음과 같이 출력하세요.
출력 예시)
flask는 micro이다.
django는 full-functioning이다.
"""
print('\n==== Q6 ====')
for name, attr in ssafy.get('language').get('python').get('frameworks').items():
    print(f'{name}는 {attr}이다.')


"""
난이도***** 7. 오늘 당번을 뽑기 위해 groups의 E 그룹에서 한명을 랜덤으로 뽑아주세요.
출력예시)
오늘의 당번은 김준호
"""
print('\n==== Q7 ====')
import random
person = random.choice(ssafy.get('classes').get('dj').get('groups').get('E'))
print(f'오늘의 당번은 {person}')