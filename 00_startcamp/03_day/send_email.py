import smtplib
from email.message import EmailMessage
import getpass
password = getpass.getpass('PASSWORD : ')

msg = EmailMessage()
msg['Subject'] = '월급내역서_2'
msg['From'] = 'wally0213@naver.com'
msg['To'] = 'wallys0213@gmail.com', 'tlarbgus0213@naver.com'
msg.set_content('옛다 월급이다')

ssafy = smtplib.SMTP_SSL('smtp.naver.com', 465)
ssafy.login('wally0213', password)
ssafy.send_message(msg)

print('이메일 전송 완료!')