# 02_SQL_Advanced

---

:heavy_check_mark: <b>참고 사이트</b>

- W3School : https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all - 회원가입 필요 없음
- HackerRank : https://www.hackerrank.com/domains/sql - 회원가입 필요
- LeetCode : https://leetcode.com - 회원가입 필요

---

<br>

## 1. DML

:bookmark_tabs: <b>`Users` table</b>

| id   | Name  | Age  |
| ---- | ----- | ---- |
| 1    | Wally | 27   |
| 2    | Hong  | 25   |
| 3    | Mike  | 24   |

### (1) INSERT

- 테이블 전체에 데이터 추가하는 방법

```sql
INSERT INTO 테이블명 VALUES(value_list)
```

```sql
INSERT INTO Users VALUES(4, 'Sally', 26) -- 전체 컬럼에 데이터 추가
```

```sql
INSERT INTO Users(id, Name) VALUES(5, 'Minsu') -- 특정 컬럼만 데이터 추가
-- NULL이 default인 경우 지정되지 않은 Age 칸은 NULL로 채워진다
```

<br>

### (2) UPDATE

- 존재하는 데이터를 수정할 때 사용

```SQL
UPDATE 테이블명 SET 컬럼 = 값
```

```SQL
UPDATE Users SET Age = Age + 1 -- 컬럼 전체에 데이터 업데이트
-- 여기서 사용된 '='은 비교 연산자가 아니라 대입 연산자이다.
```

```sql
UPDATE Users SET Name = 'Song' WHERE id = 2 -- 특정 행만 업데이트
```

<br>

### (3) DELETE

- 데이터를 삭제할 때 사용

```SQL
DELETE FROM 테이블명
```

```SQL
DELETE FROM Users -- 테이블 전체에 데이터 삭제 => 컬럼명만 남음
```

```sql
DELETE FROM Users WHERE id = 2 -- 특정 행만 삭제
```

---

- Leetcode Questions
  - 627_Swap Salary(`01.sql`) : https://leetcode.com/problems/swap-salary/
  - 196_Delete Duplicate Emails(`02.sql`) : https://leetcode.com/problems/delete-duplicate-emails/

---

<br>

