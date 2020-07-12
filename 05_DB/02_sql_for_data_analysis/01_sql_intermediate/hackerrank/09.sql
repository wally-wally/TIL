-- city 테이블과 country 테이블에 모두 name 컬럼이 있기 때문에 city.name 이라고 테이블명도 함께 붙여서 작성하자
SELECT city.name
FROM city
  INNER JOIN country ON city.countrycode = country.code
WHERE country.continent = 'Africa'