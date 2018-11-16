/* eslint-disable */
import { shallow, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ListOfTodos from "@/components/ListOfTodos.vue";

import * as all from "../setup.js";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ListOfTodos.vue", () => {
  let store;
  const todos = [
    {
      title: "Learn awesome things about Labs",
      completed: false,
      important: false
    }
  ];
  const actions = {
    loadTodos: jest.fn()
  };
  const getters = {
    todos: jest.fn()
  };
  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      propsData: { todos },
      actions,
      getters
    });
  });

  it("calls the loadTodos function from actionsjs when created", () => {
    const wrapper = shallow(ListOfTodos, { store, localVue });
    expect(wrapper).toBeTruthy();
    expect(actions.loadTodos).not.toHaveBeenCalled();
  });

  it("maps getters with todos when computed", () => {
    const wrapper = shallow(ListOfTodos, { store, localVue });
    expect(wrapper).toBeTruthy();
    expect(getters.todos).toHaveBeenCalled();
  });

  it("has the expected html structure", () => {
    const wrapper = shallow(ListOfTodos, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });
});
