/* 
  SQL문 실행 순서에 의거하여 GROUP BY가 SELECT보다 먼저 실행되기 때문에
  아래와 같은 구문으로 작성하지 않고 서브쿼리를 이용하는 것이 맞다.
  해커랭크에서 사용하는 SQL 인터프리터 특성때문에 발생하는 예외 현상
  추후 서브쿼리를 배운 후 이 문제를 다시 풀어보도록 하자.
*/
SELECT salary * months AS earnings
     , COUNT(*)
FROM employee
GROUP BY earnings
ORDER BY earnings DESC
LIMIT 1