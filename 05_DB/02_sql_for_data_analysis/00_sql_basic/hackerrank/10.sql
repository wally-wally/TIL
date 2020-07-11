SELECT ROUND(long_w, 4) -- long_w 값을 소수점 넷째자리까지 남기고 반올림
FROM station -- station 테이블에서 수행
WHERE lat_n < 137.2345 -- lat_n 값이 137.2345 미만으로 조건 설정
ORDER BY lat_n DESC -- lat_n을 기준으로 내림차순 정렬
LIMIT 1 -- 내림차순 정렬 후 최상위 값만 가져오면 됨