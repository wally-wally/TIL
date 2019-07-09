# Create dummy files
import os
import random

family = ['김','이','박','최','황','오','강','한','제갈','하','정','송','현','손','조']
given = ['길동','준','민준','소미','수진','지은','동해','민태','준호','세정','지훈','성우','성원']

for i in range(500):
    cmd = f"touch {i+1}_{random.choice(family)}{random.choice(given)}.txt"
    print(cmd)
    os.system(cmd)