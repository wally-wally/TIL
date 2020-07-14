-- #1 서브쿼리 이용
DELETE
FROM Person
WHERE Id NOT IN(
SELECT sub.min_id
FROM (
SELECT Email, MIN(Id) AS min_id FROM Person GROUP BY email
) sub)


-- #2 DELETE + INNER JOIN
SELECT *
FROM Person p1
  INNER JOIN Person p2 ON p1.Email = p2.Email
-- 위 SELECT문 출력 결과
-- p1.Id   p1.Email             p2.Id   p2.Email
-- 1       john@example.com     1       john@example.com => 삭제
-- 1       john@example.com     3       john@example.com => 유지
-- 2       bob@example.com      2       bob@example.com => 유지
-- 3       john@example.com     1       john@example.com => 삭제
-- 3       john@example.com     3       john@example.com => 삭제

SELECT *
FROM Person p1
  INNER JOIN Person p2 ON p1.Email = p2.Email
WHERE p1.Id > p2.Id
-- 위 SELECT문 출력 결과
-- p1.Id   p1.Email             p2.Id   p2.Email
-- 1       john@example.com     3       john@example.com
-- 2       bob@example.com      2       bob@example.com

DELETE p1
FROM Person p1
  INNER JOIN Person p2 ON p1.Email = p2.Email
WHERE p1.Id > p2.Id