/* eslint-disable */
import { shallow, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import TodoItem from "@/components/TodoItem.vue";
// import { expect } from 'chai'

import * as all from "../setup.js";

const localVue = createLocalVue();

localVue.use(Vuex);

const todoItem = {
  title: "Love Front End testing :)",
  completed: true
};

describe("TodoItem.vue", () => {
  it("has the expected html structure", () => {
    const wrapper = shallow(TodoItem, {
      propsData: { todoItem }
    });
    // expect(wrapper.element).toMatchSnapshot();
  });

  it("Renders title as 'Love Front End testing :)'", () => {
    const wrapper = shallow(TodoItem, {
      propsData: { todoItem }
    });
    expect(wrapper.vm.todoItem.title).toMatch("Love Front End testing :)");
  });

  it("Renders completed as true", () => {
    const wrapper = shallow(TodoItem, {
      propsData: { todoItem }
    });
    expect(wrapper.vm.todoItem.completed).toEqual(true);
  });
});

let importantTodo;
let methods;

describe("Important Flag button ", () => {
  beforeEach(() => {
    importantTodo = {
      title: "Love Front End testing :)",
      completed: true,
      important: true
    };
    methods = { markImportant: jest.fn() };
  });

  it("should render a button with important flag", () => {
    const wrapper = mount(TodoItem, {
      propsData: { todoItem: importantTodo }
    });
    // TODO - test goes here!
  });
  it("should set the colour to red when true", () => {
    const wrapper = mount(TodoItem, {
      propsData: { todoItem: importantTodo }
    });
    // TODO - test goes here!
  });
  it("should set the colour to not red when false", () => {
    importantTodo.important = false;
    const wrapper = mount(TodoItem, {
      propsData: { todoItem: importantTodo }
    });
    // TODO - test goes here!
  });
  it("call makImportant when clicked", () => {
    const wrapper = mount(TodoItem, {
      methods,
      propsData: { todoItem: importantTodo }
    });
    // TODO - test goes here!
  });
});
