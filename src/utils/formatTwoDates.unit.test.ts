import formatTwoDates from "./formatTwoDates";

describe("formatTwoDates", () => {
  it("should return a string formatted as two dates", () => {
    const date1 = new Date("2023-02-02T00:00:00")
    const date2 = new Date("2023-02-04T00:00:00")

    const result = formatTwoDates(date1, date2);
    const expected = '02 à 04 de fevereiro'
    expect(result).toEqual(expected)
  });
  it("should return a string formatted as two dates with months diferents ", () => {
    const date1 = new Date("2023-02-02T00:00:00")
    const date2 = new Date("2023-03-04T00:00:00")

    const result = formatTwoDates(date1, date2);
    const expected = '02 de fevereiro à 04 de março'
    expect(result).toEqual(expected)
  });

  it("should return an empty string if value is not provided", () => {
    const response = formatTwoDates();
    const expected = "";
    expect(response).toEqual(expected);
});
});
