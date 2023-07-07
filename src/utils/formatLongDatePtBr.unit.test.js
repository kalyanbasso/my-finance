import formatLongDate from "./formatLongDatePtBr";

describe("formatLongDatePtBr", () => {
  it("should return the correct date format", () => {
    const date = new Date("2020-01-01T00:00:00");
    const expected = "01 de janeiro";
    const result = formatLongDate(date);
    expect(result).toEqual(expected);
  });
  it("should return an empty string if value is not provided", () => {
    const result = formatLongDate();
    expect(result).toEqual("");
  })
});
