import mutations from "@/store/mutations";

let state;
const todo = {
  completed: true,
  title: "testing sucks"
};
const newTodo = "biscuits";
const doneTodos = [
  {
    completed: true,
    title: "testing sucks"
  },
  {
    completed: false,
    title: "easy testing is fun"
  }
];
const importantTodos = [
  {
    completed: true,
    title: "testing sucks",
    important: true
  }
];

describe("Mutation tests", () => {
  beforeEach(() => {
    state = {};
  });
  it("sets the loading to true", () => {
    mutations.SET_LOADING(state, true);
    expect(state.loading).toBe(true);
  });
  it("sets the loading to false", () => {
    mutations.SET_LOADING(state, false);
    expect(state.loading).toBe(false);
  });

  it("sets all SET_TODOS", () => {
    mutations.SET_TODOS(state, [todo]);
    expect(state.todos.length).toBe(1);
  });

  it("SET_NEW_TODO", () => {
    mutations.SET_NEW_TODO(state, newTodo);
    expect(state.newTodo).toEqual(newTodo);
  });

  it("ADD_TODO", () => {
    state.todos = [];
    mutations.ADD_TODO(state, todo);
    expect(state.todos.length).toBe(1);
  });

  it("CLEAR_NEW_TODO", () => {
    state.newTodo = newTodo;
    mutations.CLEAR_NEW_TODO(state, newTodo);
    expect(state.newTodo).toEqual("");
  });

  it("CLEAR_NEW_TODO", () => {
    state.newTodo = newTodo;
    mutations.CLEAR_NEW_TODO(state);
    expect(state.newTodo).toEqual("");
  });

  it("CLEAR_ALL_DONE_TODOS", () => {
    state.todos = doneTodos;
    mutations.CLEAR_ALL_DONE_TODOS(state);
    expect(state.todos.length).toBe(1);
    expect(state.todos[0].completed).toBe(false);
  });

  it("CLEAR_ALL_TODOS", () => {
    state.todos = doneTodos;
    mutations.CLEAR_ALL_TODOS(state);
    expect(state.todos.length).toBe(0);
  });

  it("MARK_TODO_COMPLETED", () => {
    state.todos = doneTodos;
    mutations.MARK_TODO_COMPLETED(state, 0);
    expect(state.todos[0].completed).toBe(false);
    // check the reversy!
    mutations.MARK_TODO_COMPLETED(state, 0);
    expect(state.todos[0].completed).toBe(true);
  });

  it("it should MARK_TODO_IMPORTANT as false", () => {
    state.todos = importantTodos;
    // TODO - test goes here!
  });

  it("it should MARK_TODO_IMPORTANT as true", () => {
    state.todos = importantTodos;
    // TODO - test goes here!
  });
});
