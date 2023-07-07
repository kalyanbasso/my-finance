import formatCurrencyPtBr from "./formatCurrencyBRL";

describe("formatCurrencyPtBr", () => {
  it("should return a string formatted as BRL currency", () => {
    const value = 1000;
    const response = formatCurrencyPtBr(value);
    const expected = "R$ 1.000,00";
    expect(response).toEqual(expected);
  });
  it("should return a string formatted as BRL currency with 3 decimal digits", () => {
    const value = 1000.123;
    const response = formatCurrencyPtBr(value);
    const expected = "R$ 1.000,12";
    expect(response).toEqual(expected);
  });
});
