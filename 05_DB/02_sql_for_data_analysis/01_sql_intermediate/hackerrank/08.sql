-- SQL 에서 조건문 작성시 작성 순서도 매우 중요하다!
SELECT CASE
          WHEN A = B AND B = C THEN 'Equilateral' -- 정삼각형인 경우 이 조건에 만족하고 아래 구문은 실행하지 않는다.
          WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle' -- 20, 20, 40인 경우 이등변삼각형은 아니기 때문에 삼각형이 아닌 경우를 먼저 작성해야 한다.
          WHEN A = B OR B = C OR A = C THEN 'Isosceles' -- 이 조건이 정삼각형도 만족하지만 이미 위 조건에서 걸리기 때문에 여기까지 넘어오지 않는다.
          ELSE 'Scalene'
       END
FROM triangles