import requests
from bs4 import BeautifulSoup

url = 'https://www.naver.com/'
html = requests.get(url).text # text 형태로 html 소스 전부 html에 할당
soup = BeautifulSoup(html,'html.parser')
ranks = soup.select('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_r')
searchs = soup.select('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k')
## ranks, searchs는 list 형태
for i in range(0, 20):
    print(f'{ranks[i].text} {searchs[i].text}')
with open('naver_rank2.txt', 'w', encoding='UTF-8') as f:
    for i in range(0, 20) :
        f.write(f'{ranks[i].text} {searchs[i].text}\n')