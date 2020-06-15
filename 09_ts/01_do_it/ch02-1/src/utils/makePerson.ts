export function makePerson(name: string, age: number) {
  return {name: name, age: age}
}

export function testMakePerson() {
  console.log(
    makePerson('Wally', 27),
    makePerson('HoHo', 26)
  )
}