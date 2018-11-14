export default {
  SET_LOADING(state, bool) {
    console.log("INFO - Setting loading wheel");
    state.loading = bool;
  },
  SET_TODOS(state, todos) {
    console.log("INFO - Setting todos");
    state.todos = todos;
  },
  SET_NEW_TODO(state, todo) {
    console.log("INFO - Setting new todo");
    state.newTodo = todo;
  },
  ADD_TODO(state, todo) {
    console.log("INFO - Add todo", todo);
    state.todos.push(todo);
  },
  CLEAR_NEW_TODO(state) {
    console.log("INFO - Clearing new todo");
    state.newTodo = "";
  },
  CLEAR_ALL_DONE_TODOS(state) {
    console.log("INFO - Clearing all done todos");
    state.todos = state.todos.filter(obj => obj.completed === false);
  },
  CLEAR_ALL_TODOS(state) {
    console.log("INFO - Clearing all todos");
    state.todos = [];
  },
  MARK_TODO_COMPLETED(state, index) {
    console.log("INFO - MARK_TODO_COMPLETED");
    state.todos[index].completed = !state.todos[index].completed;
  }
};
