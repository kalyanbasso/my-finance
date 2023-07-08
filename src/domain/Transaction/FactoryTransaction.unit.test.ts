import { FactoryTransaction } from "./FactoryTransaction";

describe('Factory Transaction', () => {
    it('should get Transaction', () => {
        const transaction = new FactoryTransaction().execute();
        expect(transaction).toBeDefined();
    })
})