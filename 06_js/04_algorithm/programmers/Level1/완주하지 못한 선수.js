function solution(participant, completion) {
  let sortedParticipant = participant.sort()
  let sortedCompletion = completion.sort()
  let peopleCnt = completion.length
  for (let i = 0; i < peopleCnt; i++) {
      if (sortedParticipant[i] !== sortedCompletion[i]) {
          return sortedParticipant[i]
      }
  }
  return sortedParticipant[peopleCnt]
}

console.log(solution(['marina', 'josipa', 'nikola', 'vinko', 'filipa'], ['josipa', 'filipa', 'marina', 'nikola']))