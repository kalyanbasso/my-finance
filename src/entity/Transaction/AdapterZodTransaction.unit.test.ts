import { AdapterZodTransaction } from "./AdapterZodTransaction";

describe("AdapterZodTransaction", () => {
    it("should be defined", () => {
        expect(AdapterZodTransaction).toBeDefined();
    })

    it("should return schema", () => {
        const schema = new AdapterZodTransaction();
        expect(schema.getSchema).toBeDefined();
    })
})