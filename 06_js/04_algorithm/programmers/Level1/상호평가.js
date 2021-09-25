const setGrade = ({ sumScore, studentCount }) => {
  if (sumScore === 0 && studentCount === 0) {
    return 'F';
  }

  const average = sumScore / studentCount;
  
  const gradeMap = [[90, 'A'], [80, 'B'], [70, 'C'], [50, 'D'], [0, 'F']]

  return gradeMap.find((scoreRange) => scoreRange[0] <= average)[1];
}

const isUniqueHighestOrLowestScore = (scores, targetScore) => {
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  if (targetScore !== maxScore && targetScore !== minScore) {
    return false;
  }

  return scores.filter((score) => score === targetScore).length === 1;
}

const solution = (scores) => {
  const allStudentCount = scores.length;

  return Array(allStudentCount).fill().map((_, studentNo) => {
    const studentScores = Array(allStudentCount).fill().map((_, i) => scores[i][studentNo]);

    const myselfScore = studentScores[studentNo];

    if (isUniqueHighestOrLowestScore(studentScores, myselfScore)) {
      studentScores[studentNo] = -1;
    }

    const { sumScore, studentCount } = studentScores.reduce((infoForAverage, score) => {
      if (score === -1) {
        return infoForAverage;
      }

      return {
        sumScore: infoForAverage.sumScore + score,
        studentCount: infoForAverage.studentCount + 1,
      }
    }, {
      sumScore: 0,
      studentCount: 0,
    });

    return setGrade({ sumScore, studentCount });
  }).join('');
}

console.log(solution([
  [100, 90, 98, 88, 65],
  [50, 45, 99, 85, 77],
  [47, 88, 95, 80, 67],
  [61, 57, 100, 80, 65],
  [24, 90, 94, 75, 65]
]));