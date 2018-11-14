import actions from "@/store/actions";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import sinon from "sinon";

const todos = [
  { _id: 1, title: "learn testing", completed: true },
  { _id: 2, title: "learn testing 2", completed: false }
];
let state;

describe("loadTodos", () => {
  beforeEach(() => {
    let mock = new MockAdapter(axios);
    mock.onGet("http://localhost:9000/api/todos").reply(200, todos);
  });
  it("should call commit to the mutation function twice", done => {
    const commit = sinon.spy();
    actions.loadTodos({ commit }).then(() => {
      // console.log(commit)
      expect(commit.calledTwice).toBe(true);
      done();
    });
  });
  it("should first call SET_LOADING", done => {
    const commit = sinon.spy();
    actions.loadTodos({ commit }).then(() => {
      // console.log(commit.firstCall.args[0])
      expect(commit.firstCall.args[0]).toBe("SET_TODOS");
      done();
    });
  });
  it("should second call SET_TODOS", done => {
    const commit = sinon.spy();
    actions.loadTodos({ commit }).then(() => {
      // console.log(commit)
      expect(commit.secondCall.args[0]).toBe("SET_LOADING");
      done();
    });
  });
});

describe("addTodos", () => {
  beforeEach(() => {
    state = {};
    let mock = new MockAdapter(axios);
    // mock.onPost(/http:\/\/localhost:9000\/api\/todos\/.*/, {})
    mock.onPost("http://localhost:9000/api/todos").reply(200, todos);
  });
  it("should call commit to the mutation function once", done => {
    const commit = sinon.spy();
    state.newTodo = "Learn some mocking";
    actions.addTodo({ commit, state }).then(() => {
      // console.log(commit)
      expect(commit.calledOnce).toBe(true);
      done();
    });
  });
  it("should first call ADD_TODO", done => {
    const commit = sinon.spy();
    state.newTodo = "Learn some mocking";
    actions.addTodo({ commit, state }).then(() => {
      // console.log(commit.firstCall.args[0])
      expect(commit.firstCall.args[0]).toBe("ADD_TODO");
      done();
    });
  });
});

describe("setNewTodo", () => {
  it("should call SET_NEW_TODO", () => {
    const commit = sinon.spy();
    actions.setNewTodo({ commit, todo: "learn stuff about mockin" });
    expect(commit.firstCall.args[0]).toBe("SET_NEW_TODO");
  });
});

describe("clearNewTodo", () => {
  it("should call CLEAR_NEW_TODO", () => {
    const commit = sinon.spy();
    actions.clearNewTodo({ commit });
    expect(commit.firstCall.args[0]).toBe("CLEAR_NEW_TODO");
  });
});

describe("clearTodos", () => {
  it("should call CLEAR_ALL_TODOS when all is true", () => {
    const commit = sinon.spy();
    state.todos = todos;
    actions.clearTodos({ commit, state }, true);
    expect(commit.firstCall.args[0]).toBe("CLEAR_ALL_TODOS");
  });

  it("should call CLEAR_ALL_DONE_TODOS when all is not passed", () => {
    const commit = sinon.spy();
    state.todos = todos;
    actions.clearTodos({ commit, state });
    expect(commit.firstCall.args[0]).toBe("CLEAR_ALL_DONE_TODOS");
  });
});

describe("updateTodo", () => {
  beforeEach(() => {
    state = {};
    let mock = new MockAdapter(axios);
    mock.onPut("http://localhost:9000/api/todos/1").reply(200, todos);
  });
  it("should call commit to the mutation function once", done => {
    const commit = sinon.spy();
    state.todos = todos;
    actions.updateTodo({ commit, state }, { id: 1 }).then(() => {
      expect(commit.calledOnce).toBe(true);
      done();
    });
  });
  it("should call MARK_TODO_COMPLETED", done => {
    const commit = sinon.spy();
    state.todos = todos;
    actions.updateTodo({ commit, state }, { id: 1 }).then(() => {
      // console.log(commit.firstCall.args[0])
      expect(commit.firstCall.args[0]).toBe("MARK_TODO_COMPLETED");
      done();
    });
  });
  it("should call MARK_TODO_IMPORTANT", done => {
    const commit = sinon.spy();
    state.todos = todos;
    actions
      .updateTodo({ commit, state }, { id: 1, important: true })
      .then(() => {
        // TODO - test goes here!

        done();
      });
  });
});
