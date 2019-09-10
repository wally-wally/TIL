# :notebook_with_decorative_cover: 02_algorithm - Day18

<br>

## 15. 9월09일(18일차)

### 15.1 비트 연산

#### (1) 비트 연산자

<img src="https://user-images.githubusercontent.com/52685250/64497798-f91bb180-d2eb-11e9-8352-4215e0ab83fa.JPG" alt="bit_operation" width=600px>

<br>

#### (2) 비트 연산

##### ① 부분집합 구하기

| <div style="text-align:center">연산</div>           | <div style="text-align:center">의미</div>        |
| --------------------------------------------------- | ------------------------------------------------ |
| <div style="text-align:center">`1 << n`</div>       | 원소가 n개일 경우 모든 부분집합의 수             |
| <div style="text-align:center">`i & (1 << j)`</div> | 계산 결과는 i의 j번째 비트가 1인지 아닌지를 의미 |

> 부분집합 생성 코드
>
> ```python
> arr = [3, 6, 7, 1, 5, 4]
> 
> n = len(arr)	# n : 원소의 개수
> 
> for subset in range(1 << n):	 # 1 << n : 부분 집합의 개수
>  print(subset, end = '> ')	# 부분집합 No.
>  for j in range(n + 1):	# 원소의 수만큼 비트를 비교함
>      if subset & (1 << j):	# subset의 j번째 비트가 1이면 j번째 원소 출력
>          print(arr[j], end=' ')
>  print()
> ```

##### ② 엔디안(Endianness)

> 엔디안 확인 코드
>
> ```python
> n = 0x00111111
> 
> if n & 0xff:
>  print('little endian')
> else:
>  print('big endian')
> ```

> 엔디안 변환 코드
>
> ```python
> def ce(n):
>  return (n << 24 & 0xff000000) | (n << 8 & 0xff0000) | (n >> 8 & 0xff00) | (n >> 24 & 0xff)
> ```

<br>

### 15.2 진수

> 10진수 <=> n진수 상호 변환
>
> ```python
> """
> 10진수 -> 2, 8, 16진수 문자열로 변환
> 2진수      bin( 정수 )
> 8진수      oct( 정수 )
> 16진수    hex( 정수 )
> ----------------------------------------
> x진수 -> 10진수 변환
> 
> 형식 : int( 정수, 진수 ) // 진수에 해당하는 정수 문자열
> 
> ex) int( 12345, 7 ) -> 7진수를 10진수로 변환
> """
> bina = bin(1024)
> octa = oct(1024)
> hexa = hex(1024)
> print(bina, octa, hexa)
> 
> print(type(bina))
> print(type(int(bina, 2)))
> 
> print(int(bina, 2))
> print(int(octa, 8))
> print(int(hexa, 16))
> ```
>
> ```
> 0b10000000000 0o2000 0x400
> <class 'str'>
> <class 'int'>
> 1024
> 1024
> 1024
> ```

> 8진수(135<sub>(8)</sub>) => 10진수(93) 변환
>
> ```python
> arr = [1, 3, 5]
> result = 0
> for val in arr:
>     result = result * 8 + val
> print(result)
> ```

<br>

### 15.3 실수

- 실수 자료형의 유효 자릿수
  - 32 비트 실수형 유효자릿수(십진수) : 6
  - 64 비트 실수형 유효자릿수(십진수) : 15
- 파이썬에서의 실수 표현 범위
  - 파이썬에서는 내부적으로 더 많은 비트를 사용해서 훨씬 넓은 범위의 실수를 표현할 수 있다.
  - 최대로 표현할 수 있는 값 : 약 1.8 X 10<sup>308</sup> (이 이상은 `inf`로 표현)
  - 최소로 표현할 수 있는 값 : 약 5.0 X 10<sup>-324</sup> (이 이하는 `0`으로 표현)

