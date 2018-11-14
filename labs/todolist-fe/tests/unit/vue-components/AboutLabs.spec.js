/* eslint-disable */
import { shallow } from "@vue/test-utils";
import AboutLabs from "@/components/AboutLabs.vue";
import * as all from "../setup.js";

describe("AboutLabs.vue", () => {
  it("has the expected html structure", () => {
    const wrapper = shallow(AboutLabs);
    expect(wrapper.element).toMatchSnapshot();
  });
});
