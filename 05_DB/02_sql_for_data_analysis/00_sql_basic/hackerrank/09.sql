SELECT name
FROM students
WHERE marks > 75
-- RIGHT 함수를 사용한 방법
ORDER BY RIGHT(name, 3), id
-- SUBSTR 함수를 사용한 방법
-- ORDER BY SUBSTR(name, -3), id