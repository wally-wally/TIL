import requests
from bs4 import BeautifulSoup

url = 'https://www.naver.com'

# 1. 요청 보내서 html 파일 받고
html = requests.get(url).text

# 2. BeautifulSoup으로 정제
soup = BeautifulSoup(html, 'html.parser')

# 3. select 메소드로 사용해서 list를 얻어낸다.
searches = soup.select('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a')

# 4. 뽑은 list를 with 구문으로 txt파일을 작성한다.
with open('naver_rank.txt', 'w', encoding='utf-8') as f:
    for search in searches:
        rank = search.select_one('span.ah_r').text
        keyword = search.select_one('span.ah_k').text
        f.write(f'{rank}위 : {keyword}\n')