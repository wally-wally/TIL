import smtplib
from email.message import EmailMessage
import getpass
password = getpass.getpass('PASSWORD : ')

msg = EmailMessage()
msg['Subject'] = '월급내역서_2'
msg['From'] = '^^'
msg['To'] = '^^', '^^'
msg.set_content('옛다 월급이다')

ssafy = smtplib.SMTP_SSL('smtp.naver.com', 465)
ssafy.login('^^', password)
ssafy.send_message(msg)

print('이메일 전송 완료!')

# Delete personal information