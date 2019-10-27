# SQL과 django ORM

## 기본 준비 사항

```bash
# 폴더구조

TIL
	00_StartCamp
	...
	04_db
		00_sql # only SQL
			hellodb.csv
			tutorial.sqlite3
			users.csv
		01_sql_orm # SQL + ORM
			...
			users.csv # 해당 디렉토리로 다운로드
```

* django app

  * 가상환경 세팅

  * django project : `sql`

  * django app : `users`

  * `django_extensions` 설치 및 등록

  * users.csv 파일에 맞춰 `models.py` 작성 및 migratation

    ```python
    # users/models.py
    
    from django.db import models
    
    class User(models.Model):
        first_name = models.CharField(max_length=10)
        last_name = models.CharField(max_length=10)
        age = models.IntegerField()
        country = models.CharField(max_length=10)
        phone = models.CharField(max_length=15)
        balance = models.IntegerField()
    ```

    ```bash
    $ python manage.py makemigrations
    $ python manage.py migrate 
    ```

    아래의 명령어를 통해서 실제 쿼리문 확인

    ```bash
    $ python manage.py sqlmigrate users 0001
    ```

* `db.sqlite3` 활용

  * `sqlite3`  실행

    ```bash
    $ ls
    db.sqlite3 manage.py ...
    $ sqlite3 db.sqlite3
    ```

  * csv 파일 data 로드

    ```sqlite
    sqlite > .tables
    auth_group                  django_admin_log
    auth_group_permissions      django_content_type
    auth_permission             django_migrations
    auth_user                   django_session
    auth_user_groups            auth_user_user_permissions  
    users_user
    sqlite > .mode csv
    sqlite > .import users.csv users_user
    sqlite > SELECT COUNT(*) FROM user_users;
    100
    ```

* 확인

  * sqlite3에서 스키마 확인

    ```sqlite
    sqlite > .schema users_user
    CREATE TABLE IF NOT EXISTS "users_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "first_name" varchar(10) NOT NULL, "last_name" varchar(10) NOT NULL, "age" integer NOT NULL, "country" varchar(10) NOT NULL, "phone" varchar(15) NOT NULL, "balance" integer NOT NULL);
    ```



---



## 문제

> 아래의 문제들을 보면서 서로 대응되는 ORM문과 SQL문을 작성하시오.
>
> **vscode 터미널을 좌/우로 나누어 진행하시오. (sqlite / shell_plus)**

`.headers on` 을 켜고 작성해주세요.



### 1. 기본 CRUD 로직

1. 모든 user 레코드 조회

   ```python
   # orm
   from users.models import User
   User.objects.all()
   ```

      ```sql
   -- sql
   SELECT * FROM user_users;
      ```

2. user 레코드 생성

   ```python
   # orm
   User.objects.create(first_name='중구', last_name='이', age=30, country='충청남도', phone='010-1234-5678', balance=45000)
   ```

   ```sql
   -- sql
   INSERT INTO users_user VALUES (102, '중구', '이', 30, '충청남도', '010-1234-5678', 45000)
   ```

   * 하나의 레코드를 빼고 작성 후 `NOT NULL` constraint 오류를 orm과 sql에서 모두 확인 해보세요.

3. 해당 user 레코드 조회

   - `101` 번 id의 전체 레코드 조회

   ```python
   # orm
   User.objects.get(pk=101)
   ```

   ```sql
   -- sql
   SELECT * FROM users_user WHERE id=101;
   ```

4. 해당 user 레코드 수정

   - ORM: `101` 번 글의 `last_name` 을 '김' 으로 수정
   - SQL: `101` 번 글의 `first_name` 을 '철수' 로 수정

   ```python
   # orm
   user = User.objects.get(pk=101)
   user.last_name = '김'
   user.save()
   ```

      ```sql
   -- sql
   UPDATE users_user SET first_name='철수' WHERE id=101;
      ```

5. 해당 user 레코드 삭제

   - ORM: `101` 번 글 삭제
   - `SQL`:  `101` 번 글 삭제 (ORM에서 삭제가 되었기 때문에 아무런 응답이 없음)

   ```python
   # orm
   user = User.objects.get(pk=101)
user.delete()
   ```
   
   ```sql
   -- sql
   DELETE FROM users_user WHERE id=101;
   ```



---



### 2. 조건에 따른 쿼리문

1. 전체 인원 수 

   - `User` 의 전체 인원수

   ```python
   # orm
   User.objects.all().count()
   ```

   ```sql
   -- sql
   SELECT COUNT(*) FROM users_user;
   ```

2. 나이가 30인 사람의 이름

   - `ORM` : `.values` 활용
     - 예시: `User.objects.filter(조건).values(컬럼이름)`

   ```python
   # orm
   User.objects.filter(age=30).values('first_name')
   ######################################################
   # orm을 사용하면 다음과 같이 데이터 조작 가능
   user = User.objects.filter(age=30).values('first_name')
   user[0].get('first_name') # '영환'으로 출력
   ######################################################
   print(User.objects.filter(age=30).values('first_name').query) # .query로 확인가능
   # SELECT "users_user"."first_name" FROM "users_user" WHERE "users_user"."age" = 30 와 같이 출력됨
   ```

      ```sql
   -- sql
   SELECT first_name FROM users_user WHERE age = 30;
      ```

3. 나이가 30살 이상인 사람의 인원 수

   -  ORM: `__gte` , `__lte` , `__gt`, `__lt` -> 대소관계 활용

   ```python
   # orm
   User.objects.filter(age__gte=30).count()
   ```

      ```sql
   -- sql
   SELECT COUNT(*) FROM users_user WHERE age >= 30;
      ```

4. 나이가 20살 이하인 사람의 인원 수 

   ```python
   # orm
   User.objects.filter(age__lte=20).count()
   ```

   ```sql
   -- sql
   SELECT COUNT(*) FROM users_user WHERE age <= 20;
   ```

5. 나이가 30이면서 성이 김씨인 사람의 인원 수

   ```python
   # orm
   User.objects.filter(age=30, last_name='김').count()
   ```

      ```sql
   -- sql
   SELECT COUNT(*) FROM users_user WHERE age=30 and last_name='김';
      ```

6. 나이가 30이거나 성이 김씨인 사람?

   ```python
   # orm
   User.objects.filter(Q(age=30) | Q(last_name='김'))
   ```

   ```sql
   -- sql
   SELECT * FROM users_user WHERE age=30 or last_name='김';
   ```

7. 지역번호가 02인 사람의 인원 수

   - `ORM`: `__startswith` 

   ```python
   # orm
   User.objects.filter(phone__startswith='02-').count()
   ```

      ```sql
   -- sql
   SELECT COUNT(*) FROM users_user WHERE phone LIKE '02-%';
      ```

8. 거주 지역이 강원도이면서 성이 황씨인 사람의 이름

   ```python
   # orm
   User.objects.filter(country='강원도', last_name='황').values('first_name')
#############################################################################
   # 이 문제의 경우 해당되는 결과가 1개 이므로 .get() 메서드를 이용해 .first_name을 붙여 '은정'이라고 가져올 수 있다.
   User.objects.get(country='강원도', last_name='황').first_name
   # 하지만 .filter() 메서드는 QuerySet 객체로 반환하므로 .first_name을 붙여 출력할 수 없고 .values()를 사용해야 한다.
   User.objects.filter(country='강원도', last_name='황').first_name
   
   # [다른 방법]'은정'만 뽑아 올려면 다음과 같이 작성해야 한다.
   # <QuerySet [{'first_name': '은정'}]> => QuerySet의 첫 번째 요소(.first()) 임을 주의!
   User.objects.filter(country='강원도', last_name='황').values('first_name').first().get('first_name')
   User.objects.filter(country='강원도', last_name='황').values('first_name')[0].get('first_name')
   ```
   
      ```sql
   -- sql
   SELECT first_name FROM users_user WHERE country='강원도' and last_name='황';
      ```

9. 나이의 일의 자리 수가 8인 사람의 수(모든 사람의 나이는 10세 이상 99세 이하이다.) (추가 문제)

   ```python
   # orm
   User.objects.filter(age__endswith='8').count()
   ```

   ```sql
   -- sql
   SELECT COUNT(*) FROM users_user WHERE age LIKE '_8';
   ```

10. 전화번호의 가운데 자리 또는 뒷 자리가 6697인 사람들의 계좌 잔액의 합 (추가 문제)

    ```python
    # orm
    User.objects.filter(phone__contains='6697').aggregate(Sum('balance'))
    ```

    ```sql
    -- sql
    SELECT SUM(balance) FROM users_user WHERE phone LIKE '%-6697%';
    ```

    

---



### 3. 정렬 및 LIMIT, OFFSET

1. 나이가 많은 사람순으로 10명

   ```python
   # orm
   User.objects.order_by('-age')[:10]
   ```

      ```sql
   -- sql
   SELECT * FROM users_user ORDER BY age DESC LIMIT 10;
      ```

2. 잔액이 적은 사람순으로 10명

   ```python
   # orm
   User.objects.order_by('balance')[:10]
   ```

      ```sql
   -- sql
   SELECT * FROM users_user ORDER BY balance LIMIT 10;
      ```

3. 잔고는 오름차순, 나이는 내림차순으로 10명?

      ```python
   # orm
   User.objects.order_by('balance', '-age')[:10]
```
   
   ```sql
   -- sql
   SELECT * FROM users_user ORDER BY balance, age DESC LIMIT 10;
   ```
   
4. 성, 이름 내림차순 순으로 5번째 있는 사람

   ```python
   # orm
   User.objects.order_by('-last_name', '-first_name')[4]
```
   
      ```sql
   -- sql
   SELECT * FROM users_user ORDER BY last_name DESC, first_name DESC LIMIT 1 OFFSET 4;
      ```



---



### 4. 표현식

> ORM: `aggregate` 사용
>
> https://docs.djangoproject.com/en/2.2/topics/db/aggregation/#aggregation
>
> - '종합', '합계' 등의 사전적 의미
> - 특정 필드 전체의 합, 평균 등을 계산할 때 사용

1. 전체 평균 나이

   ```python
   # orm
   from django.db.models import Avg, Max, Sum # shell_plus로 켜면 자동으로 import 해준다.
   # python 파일에서 작성할 때는 위 구문을 반드시 작성해줘야 한다.
   User.objects.aggregate(Avg('age'))
   User.objects.aggregate(avg_value=Avg('age')) # aggregate customizing
   ```

      ```sql
   -- sql
   SELECT AVG(age) FROM users_user;
      ```

2. 김씨의 평균 나이

   ```python
   # orm
   # filter와 aggregate 쓰는 순서 주의하자!!
   User.objects.filter(last_name='김').aggregate(Avg('age'))
   ```

      ```sql
   -- sql
   SELECT AVG(age) FROM users_user WHERE last_name='김';
      ```

3. 강원도에 사는 사람의 평균 계좌 잔고

   ```python
   # orm
   User.objects.filter(country='강원도').aggregate('balance')
   ```

   ```sql
   -- sql
   SELECT AVG(balance) FROM users_user WHERE country='강원도';
   ```

4. 계좌 잔액 중 가장 높은 값

   ```python
   # orm
   User.objects.aggregate(Max('balance'))
   ```

      ```sql
   -- sql
   SELECT MAX(balance) FROM users_user;
      ```

5. 계좌 잔액 총액

   ```python
   # orm
   User.objects.aggregate(Sum('balance'))
```
   
      ```sql
   -- sql
   SELECT SUM(balance) FROM users_user;
      ```