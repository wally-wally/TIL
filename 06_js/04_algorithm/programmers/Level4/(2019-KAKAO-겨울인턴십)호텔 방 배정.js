function solution(k, room_number) {
  let answer = [];
  let assignedRooms = new Map();

  const findRoom = (room) => {
    if (!assignedRooms.has(room)) {
      assignedRooms.set(room, room + 1);
      return room
    } else {
      const newAssignRoom = findRoom(assignedRooms.get(room));
      assignedRooms.set(room, newAssignRoom + 1);
      return newAssignRoom;
    }
  }

  for (const room of room_number) {
    const assignRoomNumber = findRoom(room);
    answer.push(assignRoomNumber);
  }
  return answer;
}

console.log(solution(10, [1, 3, 4, 1, 3, 1]));