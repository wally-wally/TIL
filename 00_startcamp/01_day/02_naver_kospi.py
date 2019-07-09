import requests
from bs4 import BeautifulSoup

# 1. 원하는 주소로 요청을 보내 응답을 저장한다.
html = requests.get('https://finance.naver.com/sise/').text
# 2. 정보를 조작하기 편하게 바꾸고
soup = BeautifulSoup(html, 'html.parser')
# 3. 바꾼 정보 중 원하는 것만 뽑아서
kospi = soup.select_one('#KOSPI_now').text
# 4. 출력한다.
print(kospi)