import { FactoryCards } from "./FactoryCards";

describe('Factory Cards', () => {
    it('should get Cards', () => {
        const cards = new FactoryCards().execute();
        expect(cards).toBeDefined();
    })
})