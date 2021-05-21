const calPoints = (ops) => {
  class Game {
    constructor() {
      this.scores = [];
    }

    getScores() {
      return this.scores;
    }

    getScoreCount() {
      return this.scores.length;
    }

    addScore(score) {
      const scores = this.getScores();

      scores.push(score);
    }

    sumTwoPreviousScores() {
      const scores = this.getScores();
      const scoreCount = this.getScoreCount();

      if (scoreCount < 2) {
        return;
      }

      const previousIndex = scoreCount - 1;
      const morePreviousIndex = scoreCount - 2;

      const sumValue = scores[previousIndex] + scores[morePreviousIndex];

      this.addScore(sumValue);
    }

    doublePreviousScore() {
      const scores = this.getScores();
      const scoreCount = this.getScoreCount();

      if (scoreCount < 1) {
        return;
      }

      const previousIndex = scoreCount - 1;

      const doubleValue = scores[previousIndex] * 2;

      this.addScore(doubleValue);
    }

    removePreviousScore() {
      const scores = this.getScores();
      const scoreCount = this.getScoreCount();

      if (scoreCount < 1) {
        return;
      }

      scores.pop();
    }

    getResult() {
      const scores = this.getScores();

      return scores.reduce((acc, curr) => acc += curr, 0);
    }
  }

  const game = new Game();

  ops.forEach((op) => {
    if (!isNaN(op)) {
      game.addScore(+op);
      return;
    }

    if (op === '+') {
      game.sumTwoPreviousScores();
      return;
    }

    if (op === 'D') {
      game.doublePreviousScore();
      return;
    }

    if (op === 'C') {
      game.removePreviousScore();
    }
  });

  return game.getResult();
}

console.log(calPoints(['5', '2', 'C', 'D', '+'])); // 30
console.log(calPoints(['5', '-2', '4', 'C', 'D', '9', '+', '+'])); // 27
console.log(calPoints(['1'])); // 1