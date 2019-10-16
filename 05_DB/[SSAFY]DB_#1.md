# [SSAFY]DB_#1(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]DB_#1`은 정규과정 `DB`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 1. 10월16일(1일차)

### 1.1 데이터베이스(DB)

#### (1) 데이터베이스란?

- 체계화된 데이터의 모임
- <b>몇 개의 자료 파일을 조직적으로 통합</b>하여 <b>자료 항목의 중복</b>을 없애고 <b>자료를 구조화</b>하여 기억시켜 놓은 자료의 집합체
- RDBMS(관계형 데이터베이스 관리 시스템) : 관계형 모델을 기반으로하는 데이터베이스 관리시스템
  - 종류 : MySQL, SQLite, PostgreSQL, ORACLE, MS SQL
  - 모든 데이터를 2차원 테이블로 표현
  - 테이블은 row(record, tuple)과 column(field, item)으로 이루어진 기본 데이터 저장 단위
  - 상호 관련성을 가진 테이블의 집합
  - 만들거나 이용하기도 비교적 쉽고, 확장이 매우 용이하다.

<br>

#### (2) 데이터베이스로 얻는 장점들

- 데이터 중복 최소화
- 데이터 무결성 : 정확한 정보를 보장
- 데이터 일관성
- 데이터 독립성 : 물리적 독립성과 논리적 독립성
- 데이터 표준화
- 데이터 보안 유지

<br>

#### (3) 데이터베이스 관련 기본 용어 정리

<img src="https://user-images.githubusercontent.com/52685250/66893305-b5be0c80-f028-11e9-85c7-88fa3278ddff.JPG" width="550px">

- `스키마(schema)` : 데이터베이스에서 자료의 구조, 표현방법, 관계등을 정의한 구조(meta 속성)
- `열(Column)` : 고유한 데이터 형식이 지정
- `행(row)`(레코드) : 테이블의 데이터가 저장됨
- `기본키(PK)` : 각 행(레코드)의 고유값으로 반드시 설정하여야 하며, 데이터베이스 관리 및 관계 설정시 주요하게 활용
  - DB를 조작할 때를 `PK` 대신에 `id` 즉, column 명으로 조작해야 한다.

<br>

### 1.2 SQL(Structured Query Language)

---

:book: <b>sqlite3 알.쓸.신.잡</b>

- `.` : sqlite3 프로그램의 기능을 실행하는 것
- `;` : 세미콜론 까지가 하나의 명령(Query)으로 간주
- SQL 문법은 소문자로 작성해도 된다. (단, 대문자를 권장)
- 하나의 DB에는 여러 개의 table이 존재한다.

---

#### (1) SQL 이란?

- 관계형 데이터베이스 관리시스템(RDBMS)의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어
- RDBMS에서 자료의 검색과 관리 데이터베이스 스키마 생성과 수정, 데이터베이스 객체 접근 조정 관리를 위해 고안되었다.

<br>

#### (2) SQL 종류

| 언어 | 개념                                       | 예시                                              |
| ---- | ------------------------------------------ | ------------------------------------------------- |
| DDL  | 데이터를 정의하기 위한 언어                | CREATE, DROP, ALTER                               |
| DML  | CRUD와 관련된 언어(저장, 수정, 삭제, 조회) | <b>INSERT(C), SELECT(R), UPDATE(U), DELETE(D)</b> |
| DCL  | DB 사용자의 권한 제어를 위해 사용되는 언어 | GRANT, REVOKE, COMMIT, ROLLBAK                    |

<br>

### 1.3 Database 생성, Table 생성 및 삭제 (`hellodb.csv`)

#### (1) Database 생성

:checkered_flag: Ready for sqlite3

```sqlite
sqlite3 tutorial.sqlite3 -- tutorial.sqlite3 DB 파일 생성 및 조회
.databases -- database 생성
.mode csv -- csv 모드로 변경
.import hellodb.csv examples -- hellodb.csv 파일을 이용한 examples 라는 테이블 생성
```

:checkered_flag: 테이블 전체 조회

```sqlite
SELECT * FROM examples; -- 테이블 전체 조회
```

```
1,"길동","홍",600,"충청도",010-2424-1232
```

:checkered_flag: 보기 편하게 출력 형태 변경

```sqlite
.headers on
.mode column
SELECT * FROM examples;
```

```
id          first_name  last_name   age         country     phone
----------  ----------  ----------  ----------  ----------  -------------
1           길동          홍           600         충청도         010-2424-1232
```

<br>

#### (2) Table 생성

```sqlite
CREATE TABLE classmates (
id INTEGER PRIMARY KEY,
name TEXT );
.tables -- 테이블 목록 조회
```

```sql
classmates  examples -- 하나의 큰 데이터베이스 안에 classmates, examples 두 개의 테이블이 있다.
```

```sqlite
.schema classmates -- `스키마 조회
```

```sql
CREATE TABLE classmates (
id INTEGER PRIMARY KEY,
name TEXT );
```

- `Datatype`

<img src="https://user-images.githubusercontent.com/52685250/66879523-5f85a500-eff9-11e9-82d8-47398c49e371.JPG" width="650px">

- SQLite는 동적 데이터 타입으로, 기본적으로 affinity에 맞게 들어간다.
  - `동적 데이터 타입` : 사용자가 어느정도 맞춰 쓰면 sqlite가 자동으로 형변환을 해준다.
  - ex) INTEGER type으로 설정한 column에 '123' 이라고 입력해도 자동으로 123으로 바꿔준다.
- BOOLEAN은 정수 0, 1 으로 저장된다.
- `BLOB` : 데이터 타입이 없고 큰 데이터 덩어리를 의미한다.
- 주로 `INTEGER`, `TEXT`, `DATETIME`을 사용한다.

<br>

#### (3) Table 삭제

```sqlite
DROP TABLE classmates;
.tables
```

```sql
examples -- 기존에 있던 classmates 테이블 자체가 삭제되고 examples 테이블만 남아있다.
```

<br>

### 1.4 SQLite로 CRUD 접근 (DML) (`hellodb.csv`)

> `현재 classmates 테이블 상태`
>
> ```sqlite
> CREATE TABLE classmates (
> name TEXT,
> age INT,
> address TEXT );
> ```

#### (1) Data 추가(INSERT)

```sqlite
INSERT INTO classmates (name, age)
VALUES ('홍길동', 23);
```

```
name        age         address
----------  ----------  ----------
홍길동         23
```

```sqlite
INSERT INTO classmates (name, age, address)
-- 모든 column의 데이터를 넣을 때는 ( ) 이 부분 생략 가능하여 바로 VALUES 부터 쓰면 된다.
-- 즉, 모든 열에 데이터를 넣을 때에는 column을 명시할 필요가 없다.
-- INSERT INTO classmates VALUES('홍길동', 30, '서울');
VALUES ('홍길동', 30 , '서울');
```

```
name        age         address
----------  ----------  ----------
홍길동         23
홍길동         30          서울
```

> :heavy_check_mark: <b>숨겨진 id값까지 확인</b>
>
> ```sqlite
> SELECT rowid, * FROM classmates;
> ```
>
> - SQLite는 따로 PRIMARY KEY 속성의 컬럼을 작성하지 않으면 값이 자동으로 증가하는 PK 옵션을 가진 rowid 컬럼을 정의한다.
>   - rowid는 64bit 정수 타입의 유일한 식별 값이다.
>   - <b><u>id를 `INTEGER PRIMARY KEY` 타입으로 컬럼을 만들면 이는 rowid 를 대체한다.</u></b>
>
> ```
> rowid       name        age         address
> ----------  ----------  ----------  ----------
> 1           홍길동         23
> 2           홍길동         30          서울
> ```

<br>

#### (2) NOT NULL

- 꼭 필요한 정보라면 공백으로 비워두면 안된다는 `NOT NULL` 조건을 추가할 수 있다.

- `DROP TABLE classmates;` 로 테이블 삭제 후 다시 시작

  ```sqlite
  CREATE TABLE classmates (
  id INTEGER PRIMARY KEY, -- PRIMARY KEY는 INT는 안 되고 INTEGER 만 사용 가능!
  name TEXT NOT NULL,
  age INT NOT NULL,
  address TEXT NOT NULL );
  ```

  ```sqlite
  INSERT INTO classmates (name, age) VALUES ('홍길동', 23);
  ```

  ```
  Error: NOT NULL constraint failed: classmates.address
  ```

  ```sqlite
  INSERT INTO classmates (name, age, address) VALUES ('홍길동', 23, '서울'); -- 이건 가능
  ```

- rowid는 자동으로 작성 되었는데 직접 id 컬럼을 만든 후에는 입력할 컬럼을 명시하지 않으면 자동으로 입력되지 않는다.

  ```sqlite
  INSERT INTO classmates VALUES ('김영희', 30, '대전'); -- 이건 안 됨(rowid 일 때 와는 다르다)
  ```

- 그래서 앞으로는 아래와 같이 테이블 생성하여 PK 컬럼을 rowid를 통해 자동으로 작성되도록 한다!

  ```sqlite
  CREATE TABLE classmates (
  name TEXT NOT NULL,
  age INT NOT NULL,
  address TEXT NOT NULL );
  ```

  ```sqlite
  INSERT INTO classmates VALUES ('홍길동', 30, '서울'), ('김철수', 23, '대전'), (
  '박나래', 23, '광주'), ('이요셉', 33, '구미');
  ```

  ```sqlite
  SELECT * FROM classmates;
  ```

  ```
  name        age         address
  ----------  ----------  ----------
  홍길동         30          서울
  김철수         23          대전
  박나래         23          광주
  이요셉         33          구미
  ```

<br>

#### (3) Data 조회(SELECT)

- classmates에서 id, name column 값만 가져오기

  ```sqlite
  SELECT rowid, name FROM classmates;
  ```

  ```
  rowid       name
  ----------  ----------
  1           홍길동
  2           김철수
  3           박나래
  4           이요셉
  ```

- `LIMIT` 속성을 이용하여 classmates에서 id, name cloumn 값을 하나만 가져오기

  ```SQlite
  SELECT rowid, name FROM classmates LIMIT 1;
  ```

  ```
  rowid       name
  ----------  ----------
  1           홍길동
  ```

- `LIMIT`, `OFFSET` 속성을 이용하여 classmates에서 id, name column 값을 세번째에 있는 값 하나만 가져오기(`LIMIT`와 `OFFSET`은 한 세트!)

  ```sqlite
  SELECT rowid, name FROM classmates LIMIT 1 OFFSET 2; -- OFFSET에 적은 숫자 이후부터 시작!
  ```

  ```
  rowid       name
  ----------  ----------
  3           박나래
  ```

- `WHERE` 속성을 이용하여 classmates에서 id, name column 주소가 서울인 사람만 가져오기

  ```sqlite
  SELECT rowid, name FROM classmates WHERE address='서울';
  ```

  ```
  rowid       name
  ----------  ----------
  1           홍길동
  ```

- `DISTINCT` 속성을 이용하여 classmates에서 age 값 전체를 중복없이 가져오기

  ```sqlite
  SELECT DISTINCT age FROM classmates;
  ```

  ```
  age
  ----------
  30
  23
  33
  ```

<br>

#### (4) Data 삭제(DELETE)

- 중복이 불가능한(UNIQUE) 값인 rowid를 기준으로 data를 삭제하자.

- classmates 테이블에 id가 4인 레코드 삭제하기

  ```sqlite
  DELETE FROM classmates WHERE rowid=4;
  SELECT rowid, * FROM classmates;
  ```

  ```
  rowid       name        age         address
  ----------  ----------  ----------  ----------
  1           홍길동         30          서울
  2           김철수         23          대전
  3           박나래         23          광주
  ```

- 위와 같은 테이블 상황에서 새로운 데이터 추가

  SQLite는 기본적으로 일부 행을 삭제하고 새 행을 삽입하면 삭제 된 행의 값을 재사용하려고 시도한다.

  ```sqlite
  INSERT INTO classmates VALUES ('최철순', 45, '서울');
  SELECT rowid, * FROM classmates;
  ```

  ```
  rowid       name        age         address
  ----------  ----------  ----------  ----------
  1           홍길동         30          서울
  2           김철수         23          대전
  3           박나래         23          광주
  4           최철순         45          서울
  ```

- `AUTOINCREMENT` 속성을 사용하면 삭제 된 행의 값을 재사용하지 않고 새로운 값이 적용된다.

  ```sqlite
  CREATE TABLE tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL );
  INSERT INTO tests (id, name) VALUES (1, '홍길동'), (2, '김철수');
  SELECT * FROM tests;
  ```

  ```
  id          name
  ----------  ----------
  1           홍길동
  2           김철수
  ```

  ```sqlite
  DELETE FROM tests WHERE id=2;
  INSERT INTO tests (name) VALUES ('최철순');
  SELECT * FROM tests;
  ```

  ```
  id          name
  ----------  ----------
  1           홍길동
  3           최철순
  ```

- 하지만 SQLite는 <b><u>특정한 요구사항(삭제된 행의 값을 재사용하지 못하게 한다면)이 없다면</u></b> <b><u>`AUTOINCREMENT` 속성을 사용하지 않아야 한다</u></b>고 공식문서에 명세되어 있다.

  - 내부적으로 CPU, 메모리, 디스크 공간을 추가로 불필요하게 사용하므로 엄격하게 필요하지 않을 경우 사용을 피해야 한다.
  - rowid의 최대값은 <u>64비트 8바이트 실수의 최대값</u> = `9,223,372,036,854,775,807`
  - rowid의 최대값에 도달했을 때의 상황(INSERT INTO를 한다면)
    - AUTOINCREMENT가 없을 때 : 중간에 없는 ID를 재사용하므로 에러가 나지 않을 것.
    - AUTOINCREMENT가 있을 때 : 최대 레코드를 넘어서기 때문에 에러가 발생함.

<br>

#### (5) Data 수정(UPDATE)

- classmates 테이블에서 id가 4인 레코드를 이름은 홍길동으로, 주소를 제주도로 바꾸기

  ```sqlite
  UPDATE classmates SET name='홍길동', address='제주도' WHERE rowid=4;
  SELECT rowid, * FROM classmates;
  ```

  ```
  rowid       name        age         address
  ----------  ----------  ----------  ----------
  1           홍길동         30          서울
  2           김철수         23          대전
  3           박나래         23          광주
  4           홍길동         45          제주도
  ```

<br>

---

:heavy_check_mark: <b>데이터 추가, 읽기, 수정, 삭제 정리</b>

<img src="https://user-images.githubusercontent.com/52685250/66893625-7643f000-f029-11e9-8004-92998c4c67d9.JPG" width="650px">

---

<br>

### 1.5 심화 내용 (`users.csv`)

:checkered_flag: Ready for sqlite3

```sqlite
.mode csv -- csv 모드로 변경
.import users.csv users -- hellodb.csv 파일을 이용한 examples 라는 테이블 생성
.tables
.headers on
```

#### (1) WHERE 심화

- users에서 age가 30 이상인 사람만 가져오기

  ```sqlite
  SELECT * FROM users WHERE age>=30;
  ```

- users에서 age가 30 이상인 사람의 이름만 가져오기

  ```SQLite
  .schema -- 스키마로 column명을 먼저 확인하자
  ```

  ```
  CREATE TABLE users(
    "id" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "age" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "balance" TEXT
  );
  ```

  ```sqlite
  SELECT first_name FROM users WHERE age>=30;
  ```

- users에서 `age가 30 이상`<b><u>이고</u></b> `성이 김`인 사람의 성과 나이만 가져오기

  ```sqlite
  SELECT last_name, age FROM users WHERE age>=30 and last_name='김';
  ```

<br>

#### (2) 계산함수 - `COUNT()`, `AVG()`, `MAX()`, `MIN()`

- users 테이블의 레코드 총 개수 - `COUNT()`

  레코드의 개수 반환 : `SELECT COUNT(column) FROM table;`

  ```sqlite
  SELECT COUNT(*) FROM users; -- 어떤 column인지 안 나와 있으므로 *로 작성함
  ```

  ```
  COUNT(*)
  1000
  ```

- 30살 이상인 사람들의 평균 나이는? - `AVG()`

  `AVG()`, `SUM()`, `MIN()`, `MAX()` : 이 표현식들은 기본적으로 숫자(INTEGER)일 때만 가능함

  ```SQLITE
  SELECT AVG(age) FROM users WHERE age>=30;
  ```

  ```
  AVG(age)
  35.1763285024155
  ```

- users에서 계좌 잔액(balance)이 가장 높은 사람과 액수는? - `MAX()`

  ```sqlite
  SELECT first_name, MAX(balance) FROM users;
  ```

  ```
  first_name,MAX(balance)
  "선영",990000
  ```

- users에서 30살 이상인 사람의 계좌 평균 잔액은? - `AVG()`

  ```SQLite
  SELECT AVG(balance) FROM users WHERE age >= 30;
  ```

  ```
  AVG(balance)
  153541.425120773
  ```

<br>

#### (3) LIKE(wild cards)

- `_` : 반드시 이 자리에 한 개의 문자가 존재해야 한다.
- `%` : 이 자리에 문자열이 있을수도, 없을수도 있다.

<img src="https://user-images.githubusercontent.com/52685250/66888622-4b9e6b00-f01a-11e9-8d74-30ac61b41267.JPG" width="650px">

- `2_3_%` : 무조건 세번째 값이 3임(2035) / `2_%3_%` : 세번째 값이 3이 될 수도 있고 안 될 수도 있음(20035)

- users에서 20대인 사람만 뽑기

  ```sqlite
  SELECT * FROM users WHERE age LIKE '2%'; -- age가 2로 시작하는 경우
  ```

- users에서 지역번호가 02인 사람만 뽑기

  ```sqlite
  SELECT * FROM users WHERE phone LIKE '02-%';
  ```

- users에서 이름이 '준'으로 끝나는 사람만 뽑기

  ```sqlite
  SELECT * FROM users WHERE first_name LIKE '%준';
  ```

- users에서 중간 번호가 5114인 사람만 뽑기

  `%5114%`로 하면 5114가 끝자리인 사람이 나올 수도 있다.

  ```sqlite
  SELECT * FROM users WHERE phone LIKE '%-5114-%';
  ```

<br>

#### (4) ORDER(정렬)

- 오름차순 : `ASC` (default 이므로 생략 가능) / 내림차순 : `DESC`

- users에서 나이순으로 오름차순 정렬하여 상위 10개만 뽑기

  ```sqlite
  SELECT * FROM users ORDER BY age ASC LIMIT 10; -- ASC는 생략 가능
  ```

- users에서 나이순, 성 순으로 오름차순 정렬하여 상위 10개만 뽑기

  ```sqlite
  SELECT * FROM users ORDER BY age, last_name ASC LIMIT 10;
  ```

- users에서 계좌잔액순으로 <b><u>내림차순</u></b> 정렬하여 해당하는 사람의 성과 이름을 10개만 뽑기

  ```sqlite
  SELECT last_name, first_name FROM users ORDER BY balance DESC LIMIT 10;
  ```

  ```
  "김","선영"
  "나","상현"
  "이","정호"
  "이","상철"
  "최","지아"
  "박","준서"
  "문","미영"
  "고","하윤"
  "유","은정"
  "안","서윤"
  ```

<br>

### 1.6 ALTER

#### (1) 테이블명 변경

- `ALTER TABLE exist_table RENAME TO new_table;`

- 새로운 테이블 articles 생성

  - 조건 title : TEXT NOT NULL, content : TEXT NOT NULL

  ```sqlite
  CREATE TABLE articles (
  title TEXT NOT NULL,
  content TEXT NOT NULL );
  INSERT INTO articles VALUES ('1번제목', '1번 내용');
  ```

  ```sqlite
  .tables
  ```

  ```
  articles    classmates  examples    tests       users
  ```

  ```sqlite
  ALTER TABLE articles RENAME TO news;
  ```

  ```SQLITE
  classmates  examples    news        tests       users -- articles => news
  ```

<br>

#### (2) 새로운 컬럼 추가

- `ALTER TABLE table ADD COLUMN col_name DATATYPE;`

- 새로운 컬럼 created_at 추가(created_at : DATETIME)

  ```SQLITE
  ALTER TABLE news ADD COLUMN created_at DATETIME NOT NULL;
  ```

  - 기존 데이터에 NOT NULL 조건으로 인해 NULL 값으로 새로운 컬럼이 추가될 수 없으므로 아래와 같은 에러가 발생한다. NOT NULL 조건을 없애거나 기본값(DEFAULT)을 지정해야 한다.

  ```
  Error: Cannot add a NOT NULL column with default value NULL
  ```

- 에러 해결 방법(1) - NOT NULL  조건 없애기

  ```SQLITE
  ALTER TABLE news ADD COLUMN created_at DATETIME;
  INSERT INTO news VALUES ('title', 'content', datetime('now', 'localtime'));
  SELECT * FROM news;
  ```

  ```
  title,content,created_at
  "1번제목","1번 내용",      => 기존에 추가한 것은 DATETIME 칸에 공백으로 저장됨
  title,content,"2019-10-16 14:10:39"
  ```

- 에러 해결 방법(2) - DEFAULT 지정

  ```SQLITE
  ALTER TABLE news ADD COLUMN subtitle TEXT NOT NULL DEFAULT 1;
  SELECT * FROM news;
  ```

  ```
  title       content     created_at  subtitle
  ----------  ----------  ----------  ----------
  1번제목        1번 내용                   1
  title       content     2019-10-16  1
  ```

  