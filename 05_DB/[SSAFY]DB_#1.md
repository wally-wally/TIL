# [SSAFY]DB_#1(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]DB_#1`은 정규과정 `DB`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 1. 10월16일(1일차) - `RDBMS(SQLite)`

---

:heavy_check_mark: <b>데이터베이스 관련 기본 용어 정리</b>

- `스키마(schema)` : 데이터베이스에서 자료의 구조, 표현방법, 관계등을 정의한 구조(meta 속성)
- `열(Column)` : 고유한 데이터 형식이 지정
- `행(row)`(레코드) : 테이블의 데이터가 저장됨
- `기본키(PK)` : 각 행(레코드)의 고유값으로 반드시 설정하여야 하며, 데이터베이스 관리 및 관계 설정시 주요하게 활용
  - DB를 조작할 때를 `PK` 대신에 `id` 즉, column 명으로 조작해야 한다.

---

<br>

### 11.1 SQL

| 언어 | 개념                            | 예시                                              |
| ---- | ------------------------------- | ------------------------------------------------- |
| DDL  | 데이터를 정의                   | CREATE, DROP, ALTER                               |
| DML  | CRUD와 관련                     | <b>INSERT(C), SELECT(R), UPDATE(U), DELETE(D)</b> |
| DCL  | 데이터베이스 사용자의 권한 제어 | GRANT, REVOKE, COMMIT, ROLLBAK                    |

#### (1) Database 생성

:checkered_flag: Ready for sqlite3

```sqlite
sqlite3 tutorial.sqlite3 -- tutorial.sqlite3 DB 파일 생성
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

---

:book: <b>sqlite3 알.쓸.신.잡</b>

- `.` : sqlite3 프로그램의 기능을 실행하는 것

- `;` : 세미콜론 까지가 하나의 명령(Query)으로 간주

- SQL 문법은 소문자로 작성해도 된다. (단, 대문자를 권장)
- 하나의 DB에는 여러 개의 table이 존재한다.

---

