const { getter } = require(".");

describe("Getter", () => {
  it("should work with string paths", () => {
    expect(getter({ a: 42 }, "a")).toBe(42);
  });
  it("should work with array paths", () => {
    expect(getter({ a: 42 }, ["a"])).toBe(42);
    expect(
      getter({ a: { b: "hey", c: { d: "something" } } }, ["a", "c"])
    ).toEqual({ d: "something" });
  });
});
