function checkSkillTree(skill, tree) {
  let skillTable = skill.split('').map(s => [s, false]);
  for (const s of tree) {
    if (!skill.includes(s)) {
      continue;
    }
    const skillIndex = skillTable.findIndex(info => info[0] === s);
    const priorCheck = skillTable.slice(0, skillIndex).every(info => info[1]);
    if (!priorCheck) {
      return 0;
    }
    skillTable[skillIndex][1] = true;
  }
  return 1;
}

function solution(skill, skill_trees) {
  let answer = 0;
  for (const tree of skill_trees) {
    answer += checkSkillTree(skill, tree);
  }
  return answer;
}

console.log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']))