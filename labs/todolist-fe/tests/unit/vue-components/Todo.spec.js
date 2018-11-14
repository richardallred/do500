/* eslint-disable */
import { shallow } from "@vue/test-utils";
import Todo from "@/views/Todo.vue";
import Header from "@/components/Header.vue";
import XofYItems from "@/components/XofYItems.vue";
import * as all from "../setup.js";

describe("Todo.vue", () => {
  it("should render the html layout like the snapshot (see /__snapshots__/Todo.spec.js.snap)", () => {
    const wrapper = shallow(Todo);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("render with content such as header", () => {
    const wrapper = shallow(Todo);
    expect(wrapper.find(Header)).toBeTruthy();
  });
  it("render with content such as XofYItems", () => {
    const wrapper = shallow(Todo);
    expect(wrapper.find(XofYItems)).toBeTruthy();
  });
  // NEW TEST GOES HERE
});
