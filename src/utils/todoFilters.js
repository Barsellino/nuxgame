export function filterTodos(todos, { status, userId, search }, isFavorite) {
  const query = search.trim().toLowerCase()

  return todos.filter((todo) => {
    if (userId !== 'all' && todo.userId !== Number(userId)) {
      return false
    }

    if (status === 'completed' && !todo.completed) {
      return false
    }

    if (status === 'uncompleted' && todo.completed) {
      return false
    }

    if (status === 'favorites' && !isFavorite(todo.id)) {
      return false
    }

    if (query && !todo.title.toLowerCase().includes(query)) {
      return false
    }

    return true
  })
}

export function getUniqueUserIds(todos) {
  const ids = [...new Set(todos.map((todo) => todo.userId))]
  return ids.sort((a, b) => a - b)
}
