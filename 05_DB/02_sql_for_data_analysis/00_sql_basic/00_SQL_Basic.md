# 00_SQL_Basic

---

:heavy_check_mark: <b>참고 사이트</b>

- W3School : https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all - 회원가입 필요 없음
- HackerRank : https://www.hackerrank.com/domains/sql - 회원가입 필요

---

<br>

## 1. SELECT / FROM / LIMIT

- 모든 데이터 가져오기

```SQL
SELECT *
FROM Customers
```

- 특정 컬럼들의 데이터 가져오기

```sql
SELECT CustomerName, ContactName
FROM Customers
```

- 상위 10개의 데이터만 가져오기
  - 주로 데이터베이스의 전반적인 구조를 보고싶을 때 `LIMIT` 속성을 이용해서 확인한다.

```sql
SELECT CustomerName, ContactName
FROM Customers
LIMIT 10
```

---

- HackerRank Questions
  - Select All(`01.sql`) : https://www.hackerrank.com/challenges/select-all-sql/problem
  - Weather Observation Station 1(`02.sql`) : https://www.hackerrank.com/challenges/weather-observation-station-1/problem

---

<br>

## 2. 비교 연산자, 논리 연산자

- 비교 연산자
  - 특정 컬럼이 특정, 값을 가지는 데이터만 불러오기 위해서 사용
  - `=`, `<>`, `>=`, `<=`, `>`, `<`

```SQL
SELECT *
FROM Customers
WHERE Country = 'Germany'
```

```sql
SELECT *
FROM Customers
WHERE CustomerID < 50
```

```sql
SELECT *
FROM Customers
WHERE CustomerName < 'C' -- CustomerName의 첫 문자가 'C' 미만인 경우(즉, 'A', 'B'로 시작)
```

- 논리 연산자
  - 관계식을 작성할 때 사용
  - `AND`, `OR`

```SQL
SELECT *
FROM Customers
WHERE CustomerName < 'C' AND Country = 'Germany' -- 두 조건이 모두 만족하는 경우
```

```SQL
SELECT *
FROM Customers
WHERE CustomerName < 'C' OR Country = 'Germany' -- 두 조건 중 하나라도 만족하는 경우
```

<br>

## 3. LIKE, IN, BETWEEN, IS NULL, DISTINCT

### (1) LIKE

- `WHERE` 절 안에서 문자열의 일부분을 비교하는 부분 검색

```SQL
SELECT *
FROM Customers
WHERE Country LIKE 'Sp%' -- 무조건 Sp로 시작하는 Country명을 가진 데이터만 추출
```

```sql
SELECT *
FROM Customers
WHERE Country LIKE '%p%' -- 앞, 뒤 상관없이 'p'라는 문자가 포함된 Country명을 가진 데이터만 추출
```

<br>

### (2) IN, BETWEEN

- `IN` 을 사용하면 `OR` 연산자를 사용할 때 SQL 구문이 길어지는 것을 방지할 수 있다.

```sql
SELECT *
FROM Customers
WHERE Country IN ('Germany', 'France', 'Portugal') -- Country명이 'Germany'와 'France', 'Portugal' 중 해당되는 데이터
```

```SQL
SELECT *
FROM Customers
WHERE CustomerID 2 AND 4 -- CustomerID가 2 이상 4 이하인 데이터
-- WHERE CustomerID >= 2 AND CustomerID <= 4와 같은 의미
```

<br>

### (3) IS NULL

- 데이터가 비어 있는 것을 감지하기 위해 `IS NULL`을 사용할 수 있다.
- 반대로 `NULL`이 아닌 경우를 찾으려면 `IS NOT NULL`을 사용하면 된다.

```SQL
SELECT *
FROM Customers
WHERE CustomerID IS NULL -- CustomerID가 비어 있는 데이터만 추출
-- WHERE CustomerID = NULL로 작성하지 않도록 주의하자!
```

<br>

### (4) LIKE 추가 내용

- 해당 문자열과 정확히 일치하는 데이터를 가져오고 싶을 때는 아래 구문처럼 `LIKE`를 사용하는 대신에 `=` 비교 연산자를 사용하는 것이 속도가 훨씬 빠르다.

```SQL
SELECT *
FROM Customers
WHERE Country LIKE 'Spain' -- 느림
```

```SQL
SELECT *
FROM Customers
WHERE Country = 'Spain' -- 빠름
```

- `%` (와일드카드)대신에 `_` (한 글자 와일드카드)를 사용하면 `_` 자리에는 반드시 아무 문자가 하나 와야 한다는 의미이다.(몇 개가 있는지 알려주는 힌트 역할을 한다.)
- 즉 아래와 같이 작성하면 `S`로 시작하는 두 글자 Country 명을 가진 데이터를 추출하라는 의미가 되는 것이다.

```SQL
SELECT *
FROM Customers
WHERE Country LIKE 'S_'
```

- 아래와 같이 `_`를 네 개 붙이면 `S`로 시작하면서 총 다섯 글자인 Country 명을 가진 데이터를 추출하라는 의미로 해석될 수 있다.

```sql
SELECT *
FROM Customers
WHERE Country LIKE 'S____'
```

- `%`와 `_` 복합해서 사용

```SQL
SELECT *
FROM Customers
WHERE CustomerName LIKE '_b%' -- 두 번째 글자가 'b'인 CustomerName을 가진 데이터
```

- 만약 문자열안에 '%'나 '_'가 있는 값을 찾기 위해서는 `\`(역슬래시 또는 원화 표시)를 사용해서 아래와 같이 작성하면 된다.(MySQL 기준)
  - 다른 데이터베이스를 사용한다면 '%', '_' 이스케이프 방식이 다를 수 있으므로 구글링을 통해 찾아보자 (ex. `postgresql like % escape` 와 같이 검색)

```sql
SELECT *
FROM Customers
WHERE discount LIKE '50\%'
```

- 위 구문을 활용해서 할인율(`discount`)이 두 자리인 데이터를 찾으려면 아래와 같이 작성하면 된다.

```sql
SELECT *
FROM Customers
WHERE Country LIKE '__\%'
```

<br>

### (5) DISTINCT

- 중복 값을 제거하고 출력하기 위해서는 `DISTINCT`를 사용하면 된다.

```SQL
SELECT DISTINCT Country -- 중복 없이 Country가 출력됨
FROM Customers
WHERE CustomerID <= 100
```

---

- HackerRank Questions
  - Revising the Select Query 1(`03.sql`) : https://www.hackerrank.com/challenges/revising-the-select-query/problem
  - Select By ID(`04.sql`) : https://www.hackerrank.com/challenges/select-by-id/problem
  - Weather Observation Station 6(`05.sql`) : https://www.hackerrank.com/challenges/weather-observation-station-6/problem
  - Weather Observation Station 12(`06.sql`) : https://www.hackerrank.com/challenges/weather-observation-station-12/problem

---

<br>

## 4. ORDER BY - 정렬

- `ORDER BY`는 단순히 정렬해서 데이터를 보여주는 기능이기 때문에 데이터베이스의 원래 저장 순서를 바꾸지 않는다.
- 오름차순은 `ASC`, 내림차순은 `DESC` 옵션을 작성하면 되고 default가 오름차순이므로 `ASC`는 작성하지 않아도 된다.

```sql
SELECT *
FROM Customers
ORDER BY customerid DESC -- customerid를 내림차순으로 정렬
```

```sql
-- 조건절(WHERE절)이 추가된 경우
SELECT *
FROM Customers
WHERE country LIKE 's%'
ORDER BY customerid DESC
```

- 정렬 응용 - `LIMIT` 옵션

```SQL
SELECT *
FROM Products
ORDER BY price DESC
LIMIT 1 -- price가 가장 큰 값만 보고 싶을 때
```

```sql
SELECT *
FROM Products
ORDER BY price ASC
LIMIT 1 -- price가 가장 작은 값만 보고 싶을 때
```

```sql
SELECT *
FROM Products
ORDER BY price DESC
LIMIT 3 -- 비싼 상품 상위 3개만 보고 싶을 때
```

---

- HackerRank Questions
  - Employee Names(`07.sql`) : https://www.hackerrank.com/challenges/name-of-employees/problem
  - Employee Salaries(`08.sql`) : https://www.hackerrank.com/challenges/salary-of-employees/problem
  - Higher Than 75 Marks(`09.sql`) : https://www.hackerrank.com/challenges/more-than-75-marks/problem
  - Weather Observation Station 15(`10.sql`) : https://www.hackerrank.com/challenges/weather-observation-station-15/problem

---

<br>

## 5. 추가 내용

### (1) MySQL 문자열 자르기

- LEFT(컬럼명 또는 문자열, 문자열의 길이)

  - `SELECT LEFT("20200711", 4)` => `2020`

- RIGHT(컬럼명 또는 문자열, 문자열의 길이)

  - `SELECT RIGHT("20200711", 4)` => `0711`

- SUBSTRING(컬럼명 또는 문자열, 시작 위치, 길이) = SUBSTR()

  - `SUBSTR("20200711", 2, 3)` => `020`
  - `SUBSTR("20200711", 2)` => `0200711`

  - `SUBSTR("20200711", -3)` => `711`

<br>

### (2) MySQL 소수점 처리

- CEIL(숫자) : 올림
  - `SELECT CEIL(3.5)` => `4`
- FLOOR(숫자) : 내림
  - `SELECT FLOOR(3.5)` => `3`
- ROUND(숫자, 반올림할 자리 값) : 반올림
  - 반올림할 자리 값이 3인 경우 소수 넷째자리에서 반올림하여 소수 셋째자리까지 표현한다는 의미
  - `ROUND(5.1234, 3)` => `5.123`

<br>

## :heavy_plus_sign: 최종 문제

- https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all 에 접속해서 `SQL Statement` 에 `문제 조건`을 만족하는 SQL 구문을 작성한 후 `Run SQL`을 눌러 아래와 같은 결과가 나오도록 작성하시오. (정답은 `final.sql`에 있음)

![캡처](https://user-images.githubusercontent.com/52685250/87220415-6ed62b00-c39e-11ea-81d3-3fa48fdc79ca.PNG)

- 문제 조건
  - Products 테이블에서 ProductName에 `co`라는 문자열을 포함하고, Price가 10 이상 50 이하인 데이터를 Price 순으로 내림차순 정렬했을 때 상위 3개의 데이터를 출력할 것
  - 단 출력된 테이블의 컬럼은 아래 세 가지 컬럼만 나타나게 할 것
    - ProductID
    - ProductName: ProductName의 앞의 4글자만 출력할 것
    - Price: 반올림하여 소수 첫째자리 까지 나타낼 것

- [참고] SQL AS(Aliases) 구문

  - 테이블에서 컬럼명 작성시 내가 원하는 텍스트로 표시하고 싶을 때 `AS` 구문을 사용하면 된다.
  - 예를 들어 `Students` 테이블에서 기존의 컬럼명이 `Name`이고 바꿔서 표현하고 싶은 컬럼명이 `UserName`인 경우 아래와 같이 작성하면 된다.

  ```sql
  SELECT Name AS UserName
  FROM Students
  ```

  