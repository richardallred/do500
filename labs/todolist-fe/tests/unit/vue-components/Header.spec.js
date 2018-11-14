import { shallow } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("calls the loadTodos function from actionsjs when created", () => {
    const created = jest.fn();
    const wrapper = shallow(Header, {
      created
    });
    expect(wrapper).toBeTruthy();
    expect(created).toHaveBeenCalled();
  });
});
