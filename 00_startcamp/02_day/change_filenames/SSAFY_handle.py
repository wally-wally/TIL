import os

# 1. 해당 파일들이 있는 위치로 이동
os.chdir(r'C:\Users\student\Desktop\TIL\00_startcamp\02_day\change_filenames')

# 2. 현재 폴더 안에 모든 파일 이름은 수집
filenames = os.listdir('.') # 현재 위치를 나타내는 것은 .(온점) 하나만 찍으면 됨.(이미 os.chdir로 위치를 이동했기 때문)

# 3. 각각의 파일명을 돌면서 수정
#for filename in filenames:
#    os.rename(filename, f'SAMSUNG_{filename}')

# 4. SAMSUNG을 SSAFY로 변환
for filename in filenames:
    os.rename(filename, filename.replace('SAMSUNG_', 'SSAFY_'))