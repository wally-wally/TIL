/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = (obstacleGrid) => {
  const ROW_LENGTH = obstacleGrid.length;
  const COL_LENGTH = obstacleGrid[0].length;
  
  // 기본값이 0인 배열로 초기화
  let routeCountInfo = Array.from({ length: ROW_LENGTH }, () => Array.from({ length: COL_LENGTH }, () => 0));
  
  for (let i = 0; i < ROW_LENGTH; i++) {
    for (let j = 0; j < COL_LENGTH; j++) {
      // 장애물 자리인 경우
      if (obstacleGrid[i][j] === 1) {
        continue;
      }
      // 장애물이 없는 출발점 위치
      if (i === 0 && j === 0) {
        routeCountInfo[0][0] = 1;
        continue;
      }
      // 상단 모서리
      if (i === 0) {
        routeCountInfo[0][j] = routeCountInfo[0][j - 1];
        continue;
      }
      // 좌측 모서리
      if (j === 0) {
        routeCountInfo[i][0] = routeCountInfo[i - 1][0];
        continue;
      }
      routeCountInfo[i][j] = routeCountInfo[i][j - 1] + routeCountInfo[i - 1][j];
    }
  }
  return routeCountInfo[ROW_LENGTH - 1][COL_LENGTH - 1];
};
