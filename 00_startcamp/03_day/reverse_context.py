# 1. quest.txt 파일을 읽고
with open('quest.txt', 'r') as f:
    lines = f.readlines() 
        
# 2. 읽은 것을 기반으로 뒤집고(확인용)
for i in reversed(lines):
    print(i.strip())
    
# 3. reverse_quest.txt 파일 작성하기
with open('reverse_quest.txt', 'w') as f:
    for i in reversed(lines):
        f.writelines(i)