-- 최종 문제 정답
SELECT ProductID, SUBSTR(ProductName, 1, 4) AS ProductName, ROUND(Price, 1) AS Price
FROM Products
WHERE ProductName LIKE '%co%' AND Price BETWEEN 10 AND 50
ORDER BY Price DESC
LIMIT 3