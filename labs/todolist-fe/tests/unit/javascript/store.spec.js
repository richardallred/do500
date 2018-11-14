import store from "@/store";

describe("Initial state tests", () => {
  it("should have no todos by default", () => {
    expect(store.state.todos.length).toBe(0);
  });
  it("should have no newTodo by default", () => {
    expect(store.state.newTodo).toBe("");
  });
  it("should have loading true by default", () => {
    expect(store.state.loading).toBe(true);
  });
});

describe("state getters", () => {
  it("get newTodo should be empty string", () => {
    expect(store.getters.newTodo).toBe("");
  });
  it("should have empty todos on get", () => {
    expect(store.getters.todos.length).toBe(0);
  });
});
