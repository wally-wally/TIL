# 1.f-string을 이용한 간단한 문장 출력하기
name = '심규현'
print(f'안녕하세요, {name} 입니다.')

# 2. 점심 메뉴 추천
import random

menu = ['냉국수', '치즈돈가스', '냉모밀']
lunch = random.choice(menu)

print(f'오늘의 점심은 {lunch}입니다.')

# 3. 로또 추천
numbers = range(1,46) #1~45까지의 수 중에서 뽑는 것이므로 45가 아닌 46임을 주의!
lotto = random.sample(numbers, 6)

print(f'오늘의 로또 당첨 번호는 {sorted(lotto)}입니다.')

# 4. 필요하면 이렇게도 해보자(문자열끼리 합치기)
name = '홍길동'
print('안녕하세요, ' + name + '입니다.')