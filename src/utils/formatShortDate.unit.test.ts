import formatShortDate from "./formatShortDate";

describe("formatShortDate", () => {
    it("should return a string formatted as short date", () => {
        const value = new Date("2021-01-13T00:00:00");
        const response = formatShortDate(value);
        const expected = "13/01/2021";
        expect(response).toEqual(expected);
    });
    it("should return an empty string if value is not provided", () => {
        const response = formatShortDate();
        const expected = "";
        expect(response).toEqual(expected);
    });
})