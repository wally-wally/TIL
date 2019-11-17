import sys
sys.stdin = open('input_10931.txt', 'r')

import hashlib
print(hashlib.sha384(str(input()).encode()).hexdigest())