/*
20 20
UNION
20 21
22 23
ORDER BY X
*/

-- 20, 20과 같이 숫자가 같은 경우
SELECT X, Y
FROM functions
WHERE X = Y
GROUP BY X, Y
HAVING COUNT(*) = 2

UNION

-- 8, 18과 같이 앞의 숫자가 뒤의 숫자보다 작은 경우
SELECT f1.X, f1.Y
FROM functions AS f1
    INNER JOIN functions AS f2 ON f1.X = f2.Y AND f1.Y = f2.X
WHERE f1.X < f1.Y -- 20, 21만 필요하고 21, 20은 필요하지 않으므로 f1.X < f1.Y 조건을 추가한다.
ORDER BY X -- 마지막에 ORDER를 작성하면 UNION된 결과를 정렬해준다.(UNION 작성 전 쿼리에는 ORDER BY절을 작성할 수 없다.)