# 01_SQL_Intermediate

---

:heavy_check_mark: <b>참고 사이트</b>

- W3School : https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all - 회원가입 필요 없음
- HackerRank : https://www.hackerrank.com/domains/sql - 회원가입 필요
- LeetCode : https://leetcode.com - 회원가입 필요
- SQL Join Visualizer : https://sql-joins.leopard.in.ua/ - SQL JOIN이 헷갈릴 때 참고할만한 사이트

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

## 2. 조건문

### (1) `CASE` 사용법

- `CASE` ~ `WHEN` 구문으로 조건을 설정할 수 있다.

```sql
SELECT CASE
			WHEN categoryid = 1 THEN '음료'
            WHEN categoryid = 2 THEN '조미료'
            ELSE '기타'
       END AS 'categoryName', *
FROM Products
```

![캡처](https://user-images.githubusercontent.com/52685250/87240822-eb791000-c457-11ea-9beb-818d3400290b.PNG)

- 물론 조건문에 비교 연산자와 아래와 같이 논리 연산자를 함께 사용해서 조건을 지정할 수 있다.

```SQL
SELECT CASE
            WHEN categoryid = 1 AND SupplierID = 1 THEN '음료'
            WHEN categoryid = 2 THEN '조미료'
            ELSE '기타'
       END AS 'categoryName', *
FROM Products
```

- `CASE`로 만든 조건문을 가지고 `GROUP BY`를 할 수 있다.
  - 즉, 새로 만든 컬럼을 가지고 그룹핑해서 평균, 합계와 같은 집계 함수를 이용해서 계산할 수 있다.

```SQL
SELECT CASE 
            WHEN categoryid = 1 THEN '음료'
            WHEN categoryid = 2 THEN '소스'
            ELSE '이외'
       END AS new_category
     , AVG(price)
FROM Products
GROUP BY new_category
```

![캡처02](https://user-images.githubusercontent.com/52685250/87240051-dc429400-c450-11ea-9106-eaf9a5f67e5e.PNG)

---

- Hackerrank Questions
  - Type of Triangle(`08.sql`) : https://www.hackerrank.com/challenges/what-type-of-triangle/problem?h_r=internal-search

---

<br>

### (2) `CASE`를 활용한 테이블 피봇

- `CASE`와 집계 함수를 사용해서 엑셀의 테이블 피봇과 같이 세로로 표시되는 테이블 결과물을 가로 방향으로 볼 수 있다.
- 아래 코드와 같이 `CASE`로 각 컬럼에 맞는 데이터만 출력하고 나머지는 `NULL` 값을 출력해서 각 컬럼에서 보고싶은 연산 결과(`AVG`, `SUM`, `COUNT` 등)의 결과를 보여준다.

```SQL
SELECT AVG(CASE
           WHEN categoryid = 1 THEN price
           ELSE NULL
	   END) AS category1_avg_price
     , SUM(CASE
           WHEN categoryid = 2 THEN price
           ELSE NULL
	   END) AS category2_sum_price
     , MAX(CASE
           WHEN categoryid = 3 THEN price
           ELSE NULL
	   END) AS category3_max_price
FROM Products
```

![캡처04](https://user-images.githubusercontent.com/52685250/87240806-d8664000-c457-11ea-8925-980b3d2d8cc6.PNG)

---

- Leetcode Questions
  - 1179_Reformat Department Table(`01.sql`) : https://leetcode.com/problems/reformat-department-table/

---

<br>

## 3. 테이블 결합

### (1) INNER JOIN

:bookmark_tabs: <b>`Students` Table</b>

| id   | StudentName | Age  |
| ---- | ----------- | ---- |
| 1    | wally-wally | 27   |
| 2    | Hong        | 25   |
| 3    | Mike        | 24   |

:bookmark_tabs: <b>`Classes` Table</b>

| StudentId | ClassNumber | TeacherName |
| --------- | ----------- | ----------- |
| 1         | A           | Ace         |
| 2         | B           | Boa         |
| 3         | C           | Cally       |

- 예전 방법

  - Cartisan Product를 이용해서 두 테이블을 조합해서 나올 수 있는 모든 경우를 다 구한다.

  ```sql
  SELECT * FROM Students, Classes
  ```

  | id   | StudentName | Age  | StudentId | ClassNumber | TeacherName |
  | ---- | ----------- | ---- | --------- | ----------- | ----------- |
  | 1    | wally-wally | 27   | 1         | A           | Ace         |
  | 2    | Hong        | 25   | 1         | A           | Ace         |
  | 3    | Mike        | 24   | 1         | A           | Ace         |
  | 1    | wally-wally | 27   | 2         | B           | Boa         |
  | 2    | Hong        | 25   | 2         | B           | Boa         |
  | 3    | Mike        | 24   | 2         | B           | Boa         |
  | 1    | wally-wally | 27   | 3         | C           | Cally       |
  | 2    | Hong        | 25   | 3         | C           | Cally       |
  | 3    | Mike        | 24   | 3         | C           | Cally       |

  - 그리고 나서 `WHERE`절에 `Students` 테이블의 `id`와 `Classes` 테이블의 `StudentId`가 같은 행만 가져온다.

  ```sql
  SELECT *
  FROM Students, Classes
  WHERE Students.id = Classes.StudentId
  ```

  | id   | StudentName | Age  | StudentId | ClassNumber | TeacherName |
  | ---- | ----------- | ---- | --------- | ----------- | ----------- |
  | 1    | wally-wally | 27   | 1         | A           | Ace         |
  | 2    | Hong        | 25   | 2         | B           | Boa         |
  | 3    | Mike        | 24   | 3         | C           | Cally       |

- `INNER JOIN`을 활용한 새로운 방법

  ```SQL
  SELECT *
  FROM Students
  INNER JOIN Classes ON Students.id = Classes.StudentId
  ```

  | id   | StudentName | Age  | StudentId | ClassNumber | TeacherName |
  | ---- | ----------- | ---- | --------- | ----------- | ----------- |
  | 1    | wally-wally | 27   | 1         | A           | Ace         |
  | 2    | Hong        | 25   | 2         | B           | Boa         |
  | 3    | Mike        | 24   | 3         | C           | Cally       |

- `INNER JOIN`에는 각 테이블에 해당 컬럼이 모두 있는 경우에만 출력된다.
  
- 즉, 위 테이블에서 `Students` 테이블에 `4`라는 id값이 있지만 `Classes` 테이블에 `4`라는 `StudentId`가 없으면 해당 데이터는 JOIN한 결과물에 나타나지 않는다.
  
- SQL Tryit Editor 예제

  ```sql
  -- 왼쪽에 Orders 테이블, 오른쪽에 Customers 테이블이 붙는다.
  SELECT *
  FROM Orders
      INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
  ```

  ![01](https://user-images.githubusercontent.com/52685250/87241408-cab3b900-c45d-11ea-8ce0-914ab5e956cb.PNG)

  ```SQL
  SELECT *
  FROM Orders
      INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
      -- 테이블을 추가로 붙이고 싶으면 INNER JOIN을 이어서 작성하면 된다.
      INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
  ```

<br>

### (2) OUTER JOIN

- `INNER JOIN`을 제외한 나머지 `JOIN` 들을 모두 `OUTER JOIN`이라고 한다.

:bookmark_tabs: <b>`Students` Table</b>

| id   | StudentName | Age  |
| ---- | ----------- | ---- |
| 1    | wally-wally | 27   |
| 2    | Hong        | 25   |
| 3    | Mike        | 24   |

:bookmark_tabs: <b>`Classes` Table</b>

| StudentId | ClassNumber | TeacherName |
| --------- | ----------- | ----------- |
| 1         | A           | Ace         |
| 2         | B           | Boa         |

- `LEFT JOIN`

  - 왼쪽 테이블을 기준으로 JOIN할 때 사용
  - 왼쪽 테이블에는 데이터가 있고 오른쪽 테이블에는 데이터가 없을 때

  ```SQL
  SELECT *
  FROM Students
      LEFT JOIN Classes ON Students.id = Classes.StudentId
  ```

  | id   | StudentName | Age  | StudentId | ClassNumber | TeacherName |
  | ---- | ----------- | ---- | --------- | ----------- | ----------- |
  | 1    | wally-wally | 27   | 1         | A           | Ace         |
  | 2    | Hong        | 25   | 2         | B           | Boa         |
  | 3    | Mike        | 24   | NULL      | NULL        | NULL        |

  - 만약 `LEFT JOIN` 대신에 `INNER JOIN`을 한 경우 `id`가 `3`인 행은 아예 출력되지 않는다.
  - Class 정보가 없는 학생들만 보고 싶을 때 `WHERE` 절을 섞어서 아래와 같이 작성하면 된다.

  ```SQL
  SELECT *
  FROM Students
      LEFT JOIN Classes ON Students.id = Classes.StudentId
  WHERE StudentId IS NULL
  ```

  | id   | StudentName | Age  | StudentId | ClassNumber | TeacherName |
  | ---- | ----------- | ---- | --------- | ----------- | ----------- |
  | 3    | Mike        | 24   | NULL      | NULL        | NULL        |

- `RIGHT JOIN`
  - `RIGHT JOIN`은 `LEFT JOIN`과 반대로 생각하면 된다.
  - 하지만 주로 `LEFT JOIN`을 사용한다.
  - `RIGHT JOIN`과 섞어서 사용하면 `JOIN` 방향이 헷갈릴 수 있기 때문이다.

---

- Hackerrank Questions
  - African Cities(`09.sql`) : https://www.hackerrank.com/challenges/african-cities/problem?h_r=internal-search
  - Asian Population(`10.sql`) : https://www.hackerrank.com/challenges/asian-population/problem?h_r=internal-search
  - Average Population of Each Continent(`11.sql`) : https://www.hackerrank.com/challenges/average-population-of-each-continent/problem?h_r=internal-search

---

- Leetcode Questions
  - 183_Customers Who Never Order(`02.sql`) : https://leetcode.com/problems/customers-who-never-order/

---

:heavy_check_mark: <b>INNER JOIN, OUTER JOIN(LEFT JOIN) 정리</b>

- INNER JOIN

  ![01](https://user-images.githubusercontent.com/52685250/87242333-ac9e8680-c466-11ea-8366-ddd199fe02a6.PNG)

- LEFT JOIN(1)

  ![02](https://user-images.githubusercontent.com/52685250/87242335-adcfb380-c466-11ea-9ab6-58dded4c5e24.PNG)

- LEFT JOIN(2)

  ![03](https://user-images.githubusercontent.com/52685250/87242336-ae684a00-c466-11ea-8dc2-6e0d36ab3bf8.PNG)

---

<br>

### (3) SELF JOIN

- 자기 자신의 테이블을 JOIN하는 것을 `SELF JOIN`이라고 한다.

- [Leetcode Question]181_Employees Earning More Than Their Managers(`03.sql`)

  - https://leetcode.com/problems/employees-earning-more-than-their-managers/
  - Manager보다 더 많이 버는 직원을 찾는 문제
  - 왼쪽 테이블을 직원 테이블, 오른쪽 테이블을 매니저 테이블로 생각해서 JOIN할 것이다.

  ```sql
  SELECT Employee.Name AS employee_name
       , Employee.Salary AS employee_salary
       , Manager.Name AS manager_name
       , Manager.Salary AS manager_salary
  FROM Employee
    INNER JOIN Employee AS Manager ON Employee.managerid = Manager.id
  ```

  ```json
  {"headers": ["employee_name", "employee_salary", "manager_name", "manager_salary"], "values": [["Joe", 70000, "Sam", 60000], ["Henry", 80000, "Max", 90000]]}
  ```

  - `WHERE` 절에 매니저보다 더 많이 버는 직원을 추출하는 조건식을 작성한다.

  ```sql
  SELECT Employee.Name AS Employee
  FROM Employee
    INNER JOIN Employee AS Manager ON Employee.managerid = Manager.id
  WHERE Employee.Salary > Manager.Salary
  ```

  ```json
  {"headers": ["Employee"], "values": [["Joe"]]}
  ```

- [Leetcode Question] 197_Rising Temperature(`04.sql`) - 잘못된 풀이

  - https://leetcode.com/problems/rising-temperature/
  - 어제보다 기온이 높은 날의 오늘 id를 출력하는 문제

  ```sql
  SELECT today.id AS today_id
       , today.RecordDate AS today_recordDate
       , today.Temperature AS today_temperature
       , yesterday.id AS yesterday_id
       , yesterday.RecordDate AS yesterday_recordDate
       , yesterday.Temperature AS yesterday_temperature
  FROM Weather AS today
    INNER JOIN Weather AS yesterday ON yesterday.id + 1 = today.id
  ```

  ```json
  {
      "headers": [
          "today_id",
          "today_recordDate",
          "today_temperature",
          "yesterday_id",
          "yesterday_recordDate",
          "yesterday_temperature"],
      "values": [
          [2, "2015-01-02", 25, 1, "2015-01-01", 10],
          [3, "2015-01-03", 20, 2, "2015-01-02", 25],
          [4, "2015-01-04", 30, 3, "2015-01-03", 20]
      ]
  }
  ```

  - `WHERE`절로 기온을 비교하는 조건식을 추가해서 작성한다.

  ```SQL
  SELECT today.id AS Id
  FROM Weather AS today
    INNER JOIN Weather AS yesterday ON yesterday.id + 1 = today.id
  WHERE today.temperature > yesterday.temperature
  ```

  ```json
  {"headers": ["Id"], "values": [[2], [4]]}
  ```

  - 하지만 이렇게 풀면 테스트 케이스는 통과하지만 실제 코드를 제출하면 틀렸다고 나온다.
  - 그 이유는 다른 테스트 케이스에서 날짜 정렬이 오름차순이 아니고 랜덤한 경우가 있기 때문이다. 그래서 `id`를 기준으로 `INNER JOIN`을 하면 안 된다.

---

:white_check_mark: <b>[참고] MySQL 시간(날짜) 더하기, 빼기</b>

- `DATE_ADD(기준날짜, INTERVAL)`
  - SELECT DATE_ADD(NOW(), INTERVAL 1 SECOND)
  - SELECT DATE_ADD(NOW(), INTERVAL 1 MINUTE)
  - SELECT DATE_ADD(NOW(), INTERVAL 1 HOUR)
  - SELECT DATE_ADD(NOW(), INTERVAL 1 DAY)
  - SELECT DATE_ADD(NOW(), INTERVAL 1 MONTH)
  - SELECT DATE_ADD(NOW(), INTERVAL 1 YEAR)
  - SELECT DATE_ADD(NOW(), INTERVAL -1 YEAR) = SELECT DATE_SUB(NOW(), INTERVAL 1 YEAR)
- `DATE_SUB(기준날짜, INTERVAL)`
  - SELECT DATE_SUB(NOW(), INTERVAL 1 SECOND) = SELECT DATE_ADD(NOW(), INTERVAL -1 SECOND)
- 위 잘못된 풀이에서 `INNER JOIN`할 때 `id`값에 `+1`한 것과 같이 날짜 데이터에도 똑같이 적용해서 `yesterday.recordDate + 1 = today.recordDate`로 될 것 같지만 날짜 데이터에는 이와 같이 작성할 수 없다.

---

- [Leetcode Question] 197_Rising Temperature(`04.sql`) - `DATE_ADD()` 함수 적용한 올바른 풀이

  ```sql
  SELECT today.id AS Id
  FROM Weather AS today
    INNER JOIN Weather AS yesterday ON DATE_ADD(yesterday.recordDate, INTERVAL 1  DAY) = today.recordDate
  WHERE today.temperature > yesterday.temperature
  ```

- <b>`SELF JOIN`에서 핵심은 똑같은 테이블을 `JOIN`하는 것이기 때문에 alias를 확실하게 구별하게 작성해야 한다!</b>

<br>