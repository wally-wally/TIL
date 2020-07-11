# 01_SQL_Intermediate

---

:heavy_check_mark: <b>참고 사이트</b>

- W3School : https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all - 회원가입 필요 없음
- HackerRank : https://www.hackerrank.com/domains/sql - 회원가입 필요
- LeetCode : https://leetcode.com - 회원가입 필요

---

<br>

## 1. 집계함수

:bookmark_tabs: <b>`Products` Table((1)~(4)는 아래 표를 참고)</b>

| ID   | Name | Price |
| ---- | ---- | ----- |
| 1    | A    | 10    |
| 2    | B    | 20    |
| 3    | A    | 30    |
| 4    | C    | 40    |
| 5    | NULL | NULL  |

### (1) `COUNT()`

```sql
-- Products 테이블에 있는 행(데이터)의 개수
SELECT COUNT(*) -- 5
FROM Products
```

```sql
-- 만약 Products 테이블에 Price 컬럼에 NULL 값이 있는 경우 NULL이 있는 행만 제외한 나머지 행들의 개수
SELECT COUNT(Price) -- 4
FROM Products
```

```sql
-- Products 테이블에서 중복을 제외한 Name의 개수(당연히 이 때도 NULL은 제외됨)
SELECT COUNT(DISTINCT Name) -- 3
FROM Products
```

<br>

### (2) `SUM()`

- 숫자 데이터를 가진 컬럼에서 합계를 출력하는 `SUM()` 함수를 사용할 수 있다.

```SQL
SELECT SUM(Price) -- 100
FROM Products
```

<br>

### (3) `AVG()`

```SQL
-- AVG() 함수를 사용하면 NULL 값은 제외된다.
-- (10+20+30+40)/4 = 25
SELECT AVG(Price)
FROM Products
```

```sql
-- SUM()함수와 COUNT()함수를 이용해서 NULL 값을 0으로 고려해서 개수에 포함하는 경우
-- (10+20+30+40+0)/5 = 20
SELECT SUM(Price)/COUNT(*)
FROM Products
```

<br>

### (4) `MIN()`, `MAX()`

```SQL
SELECT MIN(Price) -- 40
FROM Products
```

```sql
SELECT MAX(Price) -- 10
FROM Products
```

<br>

### (5) `GROUP BY`

- 그룹핑하는 컬럼명은 `SELECT` 절에서 반드시 적어준다.

```SQL
-- 그룹핑 기준 한 개
SELECT SupplierID
     , AVG(Price) -- 그룹핑해서 얻고 싶은 집계 결과를 작성하면 된다.
FROM Products
GROUP BY SupplierID -- 그룹핑 하고 싶은 컬럼명 작성
```

```SQL
-- 그룹핑 기준 두 개 이상
SELECT SupplierID
     , CategoryID
     , AVG(Price)
FROM Products
GROUP BY SupplierID, CategoryID
```

```SQL
-- MySQL은 그룹핑할 때 컬럼명을 1, 2와 같이 숫자로 적을 수 있다.
-- 하지만 굳이 이렇게까지 하라고는 권장하지 않는다.
-- 어떤 컬럼명으로 그룹핑했는지 명확히 알기 위해 숫자 대신 컬럼명으로 적자.
SELECT SupplierID
     , CategoryID
     , AVG(Price)
FROM Products
GROUP BY 1, 2 -- SELECT 절에 있는 첫 번째 컬럼과 두 번째 컬럼을 기준으로 그룹핑하라는 의미
```

```SQL
SELECT SupplierID
     , CategoryID
     , AVG(Price)
FROM Products
GROUP BY SupplierID, CategoryID
ORDER BY AVG(Price) DESC -- Price 평균값을 기준으로 내림차순 정렬해서 보고 싶을 때
```

<br>

### (6) `HAVING`

- `GROUP BY`에 대해 조건을 주고 싶을 때 `HAVING` 절을 작성하면 된다.
- `SQL`문 실행 순서가 `WHERE`절을 실행하고 `GROUP BY`절을 실행하기 때문에  `WHERE` 절로 작성하면 안 된다!
  - `SQL`문 실행 순서 : `FROM` =>  `WHERE` => `GROUP BY` => `HAVING` => `SELECT` => `ORDER BY`

```SQL
SELECT SupplierID
     , CategoryID
     , AVG(Price) AS avg_price -- AS : 해당 컬럼에 별칭을 붙일 수 있다.
FROM Products
GROUP BY SupplierID, CategoryID
HAVING avg_price >= 100
```

---

- Hackerrank Questions
  - Revising Aggregations - Averages (`01.sql`) : https://www.hackerrank.com/challenges/revising-aggregations-the-average-function/problem
  - Revising Aggregations - The Sum Function (`02.sql`) : https://www.hackerrank.com/challenges/revising-aggregations-sum/problem
  - Revising Aggregations - The Count Function (`03.sql`) : https://www.hackerrank.com/challenges/revising-aggregations-the-count-function/problem
  - Average Population (`04.sql`) : https://www.hackerrank.com/challenges/average-population/problem?h_r=internal-search
  - Population Density Difference (`05.sql`) : https://www.hackerrank.com/challenges/population-density-difference/problem?h_r=internal-search
  - Weather Observation Station 4 (`06.sql`) : https://www.hackerrank.com/challenges/weather-observation-station-4/problem
  - Top Earners(`07.sql`) : https://www.hackerrank.com/challenges/earnings-of-employees/problem?h_r=internal-search

---

<br>