const addOneItem = (state, todoItem)  => {
  const obj = {completed: false, item: todoItem}
  localStorage.setItem(todoItem, JSON.stringify(obj))
  state.todoItems.push(obj)
}

const removeOneItem = (state, payload) => {
  localStorage.removeItem(payload.todoItem.item)
  state.todoItems.splice(payload.index, 1) // slice() : 기존 배열 변경 X, splice() : 기존 배열 변경 O
}

const toggleOneItem = (state, payload) => {
  // todoItem.completed = !todoItem.completed => anti pattern
  // 컴포넌트간의 경계를 명확하게 하기 위해 넘어온 데이터에 바로 접근하여 수정하는 위의 코드 보다는 아래와 같이 작성하는 것이 좋다.
  // App.vue가 Container Component(실질적인 동작 수행), TodoList.vue가 Presentational Component(markup의 역할)의 역할로 분명하게 하기 위해
  state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
  // localStroage는 update 하는 API가 없으므로 item을 지우고 바뀐 것을 다시 넣어줘야 한다.
  localStorage.removeItem(payload.todoItem.item)
  localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
}

const clearAllItems = (state) => {
  localStorage.clear()
  state.todoItems = []
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems }