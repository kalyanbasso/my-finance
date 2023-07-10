import formatCurrencyPtBr from "./formatCurrencyBRL";

describe("formatCurrencyPtBr", () => {
  it("should return a string formatted as BRL currency", () => {
    const value = 100000;
    const response = formatCurrencyPtBr(value);
    const expected = "R$ 1.000,00";
    expect(response).toEqual(expected);
  });
});
