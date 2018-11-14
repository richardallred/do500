import Router from "@/router.js";

describe("router", () => {
  it("should have two routes", () => {
    expect(Router.options.routes.length).toBe(3);
  });
});
