SELECT today.id AS Id
FROM Weather AS today
  -- id를 기준으로 INNER JOIN하면 안 됨
  -- INNER JOIN Weather AS yesterday ON yesterday.id + 1 = today.id
  INNER JOIN Weather AS yesterday ON DATE_ADD(yesterday.recordDate, INTERVAL 1  DAY) = today.recordDate
WHERE today.temperature > yesterday.temperature