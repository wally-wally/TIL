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

## 2. ERD & 데이터 타입

### (1) ERD(Entity Relationship Diagram)

- ERD 내용 참고 문서 : https://www.lucidchart.com/pages/er-diagrams#section_5

- ERD : 테이블 간의 관계를 쉽게 파악하기 위해 시각화한 것

- Entity(개체)

  - 데이터베이스에 저장된 <b>테이블 하나하나</b>를 의미

- Attribute(속성)

  - 각 Entity가 가지고 있는 특징이자 각 <b>컬럼</b>을 의미
  - `PK`(Primary Key, 기본키)
    - 테이블을 대표하는 Key
    - 각 테이블의 주키로 두 개 이상의 기본키가 존재할 수 없다.
    - `PK`는 중복되어 저장될 수 없다.
  - `FK`(Foreign Key, 외래키)
    - 외부 식별자로 부름
    - 다른 엔티티의 `PK`에서 참조되는 키
    - 참조되는 테이블의 기본키와 대응되어 테이블 간에 참조 관계를 표현하는데 중요한 도구
  - 선으로 표현하는 테이블 간에 관계

  ![01](https://user-images.githubusercontent.com/52685250/87399971-22cff400-c5f3-11ea-9d93-dccd9a52f6f5.PNG)

  ​	(이미지 출처 : https://www.lucidchart.com/pages/er-diagrams#section_5)

- Relationship(관계)

  - 개체 간의 관계 또는 속성 간의 관계

<br>

### (2) 데이터 타입

<img src="https://user-images.githubusercontent.com/52685250/66879523-5f85a500-eff9-11e9-82d8-47398c49e371.JPG" width="650px">

- 숫자
  - 정수 : `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `BIGINT`
  - 실수 : `DECIMAL`, `DOUBLE`, `FLOAT`
    - `DECIMAL` : 정밀하게 숫자를 계산해야 할 때(ex. 돈)
    - `DOUBLE` : 일반적으로 사용되는 실수 타입
    - `FLOAT` : 정확성은 떨어지지만 속도가 빠름

- 문자 
  - `VARCHAR`(글자 수가 다양한 문자), `CHAR`(글자 수 일정한 문자)
  - 주로 `VARCHAR`를 사용한다.
- 날짜, 시간
  - `DATE` : 1000-01-01 ~ 9999-12-31
  - `DATETIME` : 1000-01-01 00:00:00.000000 ~ 9999-12-31 23:59:59.999999(= `DATE` + TIME)
  - `TIMESTAMP` = `DATETIME` + `TIMEZONE`

- 간혹 어떤 테이블에는 날짜 데이터가 들어가는 컬럼의 데이터 타입을 `DATETIME`이나 `TIMESTAMP`로 하지 않고 `VARCHAR` 형태로 지정한다.
  - 왜냐하면 `DATETIME`, `TIMESTAMP`의 형태로 저장되어 있지 않고 12/08/2019와 같은 형태의 텍스트로 저장되어 있을 수 있기 때문이다.
  - 그래서 이와 같이 저장되어 있으면 저번에 살펴보았던 `DATE_ADD` 함수를 이용한 시간이나 날짜 계산을 할 수가 없다.
  - 이러한 문제를 해결하기 위해 `MySQL`에서는 문자형 데이터를 DATE형으로 바꿔주는 함수(`str_to_date()`)가 있다.
  - 참고 문서 : https://stackoverflow.com/questions/38677002/mysql-convert-string-to-datetime
  - 다른 데이터베이스에서도 string을 date형으로 바꿔주는 함수가 있으니 구글링을 통해서 살펴보도록 하자.